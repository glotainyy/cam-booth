const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const configParts = require('./webpack/config-parts');
const pkg = require('./package.json');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  client: path.join(__dirname, "src", "index.tsx"),
  style: [
    //style: path.join(__dirname, "static", "styles", "style.css"),
    //  path.join(__dirname, "node_modules", "purify-css"),
    //images: path.join(__dirname, "static", "images", "sprite-scan.svg"),
      path.join(__dirname, "static", "css", "style.css")
    ],
  //style: path.join(__dirname, "static", "styles", "style.css"),
  //images: path.join(__dirname, "static", "images", "sprite-scan.svg"),
  build: path.join(__dirname, "dist")
};

const common = {
  entry: {
    //styles: PATHS.style,
    client: PATHS.client
  },
  output: {
    path: PATHS.build,
    filename: 'js/cam-booth.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.tpl',
      output: {
        path: PATHS.build,
        filename: 'index.html'
      },
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true
    }      
    }),
    new webpack.DefinePlugin({
      '(!self.Buffer && !window.Buffer)': '1 == 2'}),
    new CopyWebpackPlugin([
        { from: 'static/css', to: 'css'}
    ]),
    new CopyWebpackPlugin([
      { from: 'static/images', to: 'images'}
  ]),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      },      
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader", 
            options: { singleton: true }
        },
        {
            loader: "css-loader",
            options: { modules: false }
        }
        ]
      }
    ]
  }
};

var config;

switch (process.env.npm_lifecycle_event) {
  case "build":
  case "stats":
    config = merge(
      common, {
        mode: "production",
        devtool: "source-map",
        output: {
          filename: "js/bundle.js",
          chunkFilename: "js/[chunkhash].js"
        }
      },
      configParts.clean(PATHS.build),
      configParts.setFreeVariable("process.env.NODE_ENV", "production"),
    );
    break;
  case "build-dev":
    config = merge(
      common, {
        devtool: "cheap-module-eval-source-map",
        output: {
          filename: "js/[name].js",
          chunkFilename: "js/[name].js"
        },
      },
      configParts.clean(PATHS.build),
      configParts.extractBundle([{
        name: "commons",
        entries: Object.keys(pkg.dependencies)
      }])
    );
    break;
  default:

    config = merge(
      common, {
        devtool: "inline-source-map",
        mode: 'development',
        output: {
          filename: "js/[name].js",
          chunkFilename: "js/[name].js"
        }
      },

      configParts.extractBundle({
        name: "commons",
        entries: Object.keys(pkg.dependencies)
      }),
      configParts.devServer({
        contentBase: PATHS.build,
        host: "localhost",
        port: 5000,
        watchContentBase: true,
        entry: PATHS.client
      })
    );
}
// Exécution du validateur en mode silencieux pour éviter du texte superflu
// vers des sorties json (et donc pour la commande 'stats')

console.log(config);

module.exports = config;

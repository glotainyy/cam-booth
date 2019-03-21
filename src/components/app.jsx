import React from 'react';
import * as ReactDom from 'react-dom';
import {CamBooth} from "./webcam"



export class App extends React.Component {

  /**
   * Le constructeur où on fixe les valeurs d'états suivantes :
   * @param {*} props 
   */
  constructor(props) {
    super(props);

  }

  /**
   * A l'initialisation du composant
   */
  componentDidMount() {
  
  }

  render() {
    return (
      <CamBooth/>
    )
  }


}

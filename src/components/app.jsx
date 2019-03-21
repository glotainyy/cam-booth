import React from 'react';
import * as ReactDom from 'react-dom';
import {CamBooth} from "./webcam"



export class App extends React.Component {

  /**
   * Le constructeur où on fixe les valeurs d'états suivantes :
   * - dataCrop : la taille du cadre de recadrage
   * - scannerSelected : l'id du scanner selectionné
   * - isScanning : indique si le scanner est en train de fonctionner
   * - isPreview : indique si le mode preview est enclenché
   * - fileName : le nom par défaut de l'image à télécharger
   * - svgPath : le chmein vers le svg représentant les icones
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

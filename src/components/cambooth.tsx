import * as React from 'react';
const Camera = require('react-html5-camera-photo');

import '../css/theme.css';
import 'react-html5-camera-photo/build/css/index.css';

type Props = {

};

type State = {

};

export class CamBooth extends React.Component<Props, State> {


  onTakePhoto(dataUri: string) {
    var link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "image");
    link.click();
  }

  onCameraError(error: any) {
    console.error('onCameraError', error);
  }

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={(dataUri: any) => { this.onTakePhoto(dataUri); }}
          idealResolution={{ width: 640, height: 480 }}
        />
      </div>
    )
  }
}

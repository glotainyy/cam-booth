import React from 'react';
import Camera from 'react-html5-camera-photo';

import '../css/theme.css';
import 'react-html5-camera-photo/build/css/index.css';

export class CamBooth extends React.Component {

  onTakePhoto(dataUri) {
    var link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "image");
    link.click();
  }

  onCameraError(error) {
    console.error('onCameraErrssor', error);
  }

  onCameraError(error) { this.onCameraError(error); }

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
          idealResolution={{ width: 640, height: 480 }}
        />
      </div>
    )
  }
}


import * as React from 'react';

interface IProps {
    compiler: string,
    framework: string,
    bundler: string
}

export class Cam extends React.Component<any, {}> {

    // webcamContainer: any;
    canvas: any;
    ctx: any;
    video: any;
    webcamStream: any;
    componentDidMount() {
        //--------------------
        // GET USER MEDIA CODE
        //--------------------
        navigator.getUserMedia = (navigator.getUserMedia ||
            (navigator as any).webkitGetUserMedia ||
            (navigator as any).mozGetUserMedia ||
            (navigator as any).msGetUserMedia);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.startWebcam()}>Start WebCam</button>
                <button onClick={() => this.stopWebcam()}>Stop WebCam</button>
                <button onClick={() => this.snapshot()}>Take Snapshot</button>
                <video width={400} height={400} id="video" controls={true} />
                <canvas id="myCanvas" width="400" height="350" ref={(e) => this.canvas = e}/>
            </div>

        )
    }
    startWebcam() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(

                // constraints
                {
                    video: true,
                    audio: false
                },

                // successCallback
                (localMediaStream) => {
                    this.video = document.querySelector('video');
                    this.video.src = window.URL.createObjectURL(localMediaStream);
                    this.webcamStream = localMediaStream;
                },

                // errorCallback
                (err) => {
                    console.log("The following error occured: " + err);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    }

    stopWebcam() {
        this.webcamStream.stop();
    }

    snapshot() {
        // Draws current image from the video element into the canvas
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    }
}
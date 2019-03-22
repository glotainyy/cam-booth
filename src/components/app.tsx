import * as React from 'react';
import { CamBooth } from "../components/cambooth";

import { Cam } from "../components/cam";



type Props = {

};

type State = {

};

export class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <Cam />
      </div>
    );    
  }
}


import React, { Component } from "react";
import './App.css';
import Timeline from "./Timeline";

class App extends Component {
  state = {
    zoom: []
  };


  componentDidMount() {

  }

  updateZoom = zoom => {
    this.setState({ zoom });
  };

  render() {
    const epochs = [
      { from: 0,    duration: 1000, end: 1000 },
      { from: 1000, duration: 1500, end: 2500 },
      { from: 2500, duration: 500, end: 3000 },
      { from: 3000, duration: 500, end: 3500 },
      { from: 3500, duration: 1500, end: 5000 }
    ]

    const eventLabelsData = [
      { time: 0, text: 'Point 1' },
      { time: 2500, text: 'Point 2' },
      { time: 3500, text: 'Point 3' },
    ]

    const timeLabelsData = [
      { time: 0, text: '5 Billion Years' },
      { time: 1000, text: '4 Billion Years' },
      { time: 2000, text: '3 Billion Years' },
      { time: 3000, text: '2 Billion Years' },
      { time: 4000, text: '1 Billion Years' },
      { time: 5000, text: 'Present' },
    ]

    return (
      <div className="App">
        <Timeline
          epochData={epochs}
          eventLabels = {eventLabelsData}
          timeLabels = {timeLabelsData}
        />

      </div>
    );
  }
}

export default App;

import React from "react";

import "./style.css";

import Weather from "./weather.jsx";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectLoactionOpen: false
    };
  }
  onLocationNameChange(e) {
    this.setState({
      locationName: e.target.value
    });
  }
  onSelectCity() {
    const {locationName} = this.state;
    const {eventEmitter} = this.props;
    eventEmitter.emit("updateWeather", locationName);
  }
  render() {
    return (
      <div className="top-container">
        <div className="title">
          <div className="form-container">
            <h3 style={{color: "black", marginLeft: "auto", marginRight: "auto"}}>Weather Forecasting Application</h3>
            <label htmlFor="location-name" style={{color: "black"}}>City:{" "}</label>
            <input id="location-name" type="text" placeholder="Enter city eg:Boston" onChange={this.onLocationNameChange.bind(this)} style={{border: "2px solid", padding: "4px"}}></input>
            <button className="btn btn-select-location" onClick={this.onSelectCity.bind(this)} style={{border: "2px solid"}}>
              Get Weather
            </button>
          </div>
        </div>
        <Weather {...this.props} />
      </div>
    );
  }
}

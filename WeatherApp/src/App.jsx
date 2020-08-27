import React, {Component} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/app.css";
import TopSection from "./components/hourly";
import {Table} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import axios from "axios";


const WEATHER_KEY = "b19a77f8c839bd43ac249e8dbf554f92";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Boston",
      firstDate: undefined,
      secondDate: undefined,
      thirdDate: undefined,
      fourthDate: undefined,
      fifthDate: undefined,
      firstDayMaxTemp: undefined,
      secondDayMaxTemp: undefined,
      thirdDayMaxTemp: undefined,
      fourthDayMaxTemp: undefined,
      fifthDayMaxTemp: undefined,
      firstDayMinTemp: undefined,
      secondDayMinTemp: undefined,
      thirdDayMinTemp: undefined,
      fourthDayMinTemp: undefined,
      fifthDayMinTemp: undefined,
      firstDayDescription: undefined,
      secondDayDescription: undefined,
      thirdDayDescription: undefined,
      fourthDayDescription: undefined,
      fifthDayDesc: undefined,
      firstDayDesc: undefined,
      secondDayDesc: undefined,
      thirdDayDesc: undefined,
      fourthDayDesc: undefined,
      fifthDayDescr: undefined,
      description: undefined,
      error: undefined,
      isLoading: true
    };
  }
  data = {};
  updateWeather() {
    const {cityName} = this.state;
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_KEY}&units=imperial&mode=json`;
    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.data = data;
        console.log("data is",this.data);
        let firstDay = data.list.slice(0, 8);
        let secondDay = data.list.slice(8, 16);
        let thirdDay = data.list.slice(16, 24);
        let fourthDay = data.list.slice(24, 32);
        let fifthDay = data.list.slice(32, 40);
        let firstDayMaxTemp = this.getMaxTemp(firstDay);
        let secondDayMaxTemp = this.getMaxTemp(secondDay);
        let thirdDayMaxTemp = this.getMaxTemp(thirdDay);
        let fourthDayMaxTemp = this.getMaxTemp(fourthDay);
        let fifthDayMaxTemp = this.getMaxTemp(fifthDay);
        let firstDayMinTemp = this.getMinTemp(firstDay);
        let secondDayMinTemp = this.getMinTemp(secondDay);
        let thirdDayMinTemp = this.getMinTemp(thirdDay);
        let fourthDayMinTemp = this.getMinTemp(fourthDay);
        let fifthDayMinTemp = this.getMinTemp(fifthDay);
        let firstDayDescription = "http://openweathermap.org/img/wn/" + firstDay[0].weather[0].icon+ "@2x.png";
        let secondDayDescription = "http://openweathermap.org/img/wn/" + secondDay[0].weather[0].icon + "@2x.png";
        let thirdDayDescription = "http://openweathermap.org/img/wn/" + thirdDay[0].weather[0].icon + "@2x.png";
        let fourthDayDescription = "http://openweathermap.org/img/wn/" + fourthDay[0].weather[0].icon + "@2x.png";
        let fifthDayDescription = "http://openweathermap.org/img/wn/" + fifthDay[0].weather[0].icon + "@2x.png";
        let firstDayDesc = firstDay[0].weather[0].main;
        let secondDayDesc = secondDay[0].weather[0].main;
        let thirdDayDesc = thirdDay[0].weather[0].main;
        let fourthDayDesc = fourthDay[0].weather[0].main;
        let fifthDayDescr = fifthDay[0].weather[0].main;
        this.setState({
          isLoading: false,
          firstDate: firstDay[0].dt_txt.substr(0, 10),
          secondDate: secondDay[0].dt_txt.substr(0, 10),
          thirdDate: thirdDay[0].dt_txt.substr(0, 10),
          fourthDate: fourthDay[0].dt_txt.substr(0, 10),
          fifthDate: fifthDay[0].dt_txt.substr(0, 10),
          firstDayMaxTemp: firstDayMaxTemp,
          secondDayMaxTemp: secondDayMaxTemp,
          thirdDayMaxTemp: thirdDayMaxTemp,
          fourthDayMaxTemp: fourthDayMaxTemp,
          fifthDayMaxTemp: fifthDayMaxTemp,
          firstDayMinTemp: firstDayMinTemp,
          secondDayMinTemp: secondDayMinTemp,
          thirdDayMinTemp: thirdDayMinTemp,
          fourthDayMinTemp: fourthDayMinTemp,
          fifthDayMinTemp: fifthDayMinTemp,
          firstDayDescription: firstDayDescription,
          secondDayDescription: secondDayDescription,
          thirdDayDescription: thirdDayDescription,
          fourthDayDescription: fourthDayDescription,
          fifthDayDescription: fifthDayDescription,
          firstDayDesc:firstDayDesc,
          secondDayDesc:secondDayDesc,
          thirdDayDesc:thirdDayDesc,
          fourthDayDesc:fourthDayDesc,
          fifthDayDescr:fifthDayDescr,
          error: "",
          forecastdays: data.forecast
        });
      })
      .catch(err => {
        if (err) console.error("Error Fetching Weather Data from API", err);
      });
  }
  componentDidMount() {
    const {eventEmitter} = this.props;
    this.updateWeather();
    eventEmitter.on("updateWeather", data => {
      this.setState({cityName: data}, () => this.updateWeather());
    });
  }
  getMaxTemp = arr => {
    let max = -100;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].main.temp_max > max) {
        max = arr[i].main.temp_max;
      }
    }
    return max;
  };
  getMinTemp = arr => {
    let min = 100;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].main.temp_min < min) {
        min = arr[i].main.temp_min;
      }
    }
    return min;
  };
  render() {
    const {
      isLoading,
      cityName,
      firstDate,
      secondDate,
      thirdDate,
      fourthDate,
      fifthDate,
      firstDayMaxTemp,
      secondDayMaxTemp,
      thirdDayMaxTemp,
      fourthDayMaxTemp,
      fifthDayMaxTemp,
      firstDayMinTemp,
      secondDayMinTemp,
      thirdDayMinTemp,
      fourthDayMinTemp,
      fifthDayMinTemp,
      firstDayDescription,
      secondDayDescription,
      thirdDayDescription,
      fourthDayDescription,
      fifthDayDescription,
      firstDayDesc,
      secondDayDesc,
      thirdDayDesc,
      fourthDayDesc,
      fifthDayDescr,
      error
    } = this.state;
    return (
      <div className="app-container">
        <div className="main-container">
          <Router>
            {isLoading && <h3>Weather Forecast is loading.....</h3>}
            {!isLoading && (
              <div className="top-section">
                <TopSection
                  location={cityName}
                  firstDate={firstDate}
                  secondDate={secondDate}
                  thirdDate={thirdDate}
                  fourthDate={fourthDate}
                  fifthDate={fifthDate}
                  firstDayMaxTemp={firstDayMaxTemp}
                  secondDayMaxTemp={secondDayMaxTemp}
                  thirdDayMaxTemp={thirdDayMaxTemp}
                  fourthDayMaxTemp={fourthDayMaxTemp}
                  fifthDayMaxTemp={fifthDayMaxTemp}
                  firstDayMinTemp={firstDayMinTemp}
                  secondDayMinTemp={secondDayMinTemp}
                  thirdDayMinTemp={thirdDayMinTemp}
                  fourthDayMinTemp={fourthDayMinTemp}
                  fifthDayMinTemp={fifthDayMinTemp}
                  firstDayDescription={firstDayDescription}
                  secondDayDescription={secondDayDescription}
                  thirdDayDescription={thirdDayDescription}
                  fourthDayDescription={fourthDayDescription}
                  fifthDayDescription={fifthDayDescription}
                  firstDayDesc={firstDayDesc}
                  secondDayDesc={secondDayDesc}
                  thirdDayDesc={thirdDayDesc}
                  fourthDayDesc={fourthDayDesc}
                  fifthDayDescr={fifthDayDescr}
                  error={error}
                  eventEmitter={this.props.eventEmitter}
                />
              </div>
            )}
            <Switch>
              <Route exact path="/hourlyForecast/:id" children={<Detail data={this.data} />} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
function Detail(props) {
  let {id} = useParams();
  let data = props;
  let arr = [];
  if (id === data.data.list[0].dt_txt.substr(0, 10)) {
    arr = data.data.list.slice(0, 8);
  } else if (id === data.data.list[8].dt_txt.substr(0, 10)) {
    arr = data.data.list.slice(8, 16);
  } else if (id === data.data.list[16].dt_txt.substr(0, 10)) {
    arr = data.data.list.slice(16, 24);
  } else if (id === data.data.list[24].dt_txt.substr(0, 10)) {
    arr = data.data.list.slice(24, 32);
  } else {
    arr = data.data.list.slice(32, 40);
  }
  return (
    <div className="bottom-container">
      <div className="bottom-section">
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>Time</th>
              <td>00:00</td>
              <td>03:00</td>
              <td>06:00</td>
              <td>09:00</td>
              <td>12:00</td>
              <td>15:00</td>
              <td>18:00</td>
              <td>21:00</td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <th style={{fontWeight:"bold", fontSize:"20px"}}>Temperature</th>
              <td>{arr[0].main.temp}</td>
              <td>{arr[1].main.temp}</td>
              <td>{arr[2].main.temp}</td>
              <td>{arr[3].main.temp}</td>
              <td>{arr[4].main.temp}</td>
              <td>{arr[5].main.temp}</td>
              <td>{arr[6].main.temp}</td>
              <td>{arr[7].main.temp}</td>
            </tr>
            <tr>
            <th style={{fontWeight:"bold", fontSize:"20px"}}>Description</th>
              <td>{arr[0].weather[0].description}</td>
              <td>{arr[1].weather[0].description}</td>
              <td>{arr[2].weather[0].description}</td>
              <td>{arr[3].weather[0].description}</td>
              <td>{arr[4].weather[0].description}</td>
              <td>{arr[5].weather[0].description}</td>
              <td>{arr[6].weather[0].description}</td>
              <td>{arr[7].weather[0].description}</td>
            </tr>
            <tr>
            <th style={{fontWeight:"bold", fontSize:"20px"}}>Condition</th>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[0].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[1].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[2].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[3].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[4].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[5].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[6].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            <td>
                <img src={"http://openweathermap.org/img/wn/" + arr[7].weather[0].icon + "@2x.png"} alt={"icon"} />
            </td>
            </tr>
          
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default App;

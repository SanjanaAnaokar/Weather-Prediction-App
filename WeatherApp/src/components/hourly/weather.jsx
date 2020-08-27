import React from "react";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class Weather extends React.Component {
  render() {
    const {
      location,
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
    } = this.props;
    return (
      <div className="weather-container">
        <div className="header" style={{color: "orange"}}>
          {location}
        </div>
        <div className="current-weather">
          {firstDate && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Dates</th>
                  {firstDate && <th>{firstDate}</th>}
                  {secondDate && <th>{secondDate}</th>}
                  {thirdDate && <th>{thirdDate}</th>}
                  {fourthDate && <th>{fourthDate}</th>}
                  {fifthDate && <th>{fifthDate}</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{fontWeight:"bold"}}>High(&#176;F)</td>
                  {firstDayMaxTemp && <td>{firstDayMaxTemp}</td>}
                  {secondDayMaxTemp && <td>{secondDayMaxTemp}</td>}
                  {thirdDayMaxTemp && <td>{thirdDayMaxTemp}</td>}
                  {fourthDayMaxTemp && <td>{fourthDayMaxTemp}</td>}
                  {fifthDayMaxTemp && <td>{fifthDayMaxTemp}</td>}
                </tr>
                <tr>
                  <td style={{fontWeight:"bold"}}>Low(&#176;F)</td>
                  {firstDayMinTemp && <td>{firstDayMinTemp}</td>}
                  {secondDayMinTemp && <td>{secondDayMinTemp}</td>}
                  {thirdDayMinTemp && <td>{thirdDayMinTemp}</td>}
                  {fourthDayMinTemp && <td>{fourthDayMinTemp}</td>}
                  {fifthDayMinTemp && <td>{fifthDayMinTemp}</td>}
                </tr>
                <tr>
                  <td style={{fontWeight:"bold"}}>Weather Condition</td>
                  {firstDayDescription && (
                    <td>
                      <img src={firstDayDescription} alt={"icon"} />
                    </td>
                  )}
                  {secondDayDescription && (
                    <td>
                      <img src={secondDayDescription} alt={"icon"} />
                    </td>
                  )}
                  {thirdDayDescription && (
                    <td>
                      <img src={thirdDayDescription} alt={"icon"} />
                    </td>
                  )}
                  {fourthDayDescription && (
                    <td>
                      <img src={fourthDayDescription} alt={"icon"} />
                    </td>
                  )}
                  {fifthDayDescription && (
                    <td>
                      <img src={fifthDayDescription} alt={"icon"} />
                    </td>
                  )}
                </tr>
                <tr>
                  <td style={{fontWeight:"bold"}}>Description</td>
                  {firstDayDesc && <td>{firstDayDesc}</td>}
                  {secondDayDesc && <td>{secondDayDesc}</td>}
                  {thirdDayDesc && <td>{thirdDayDesc}</td>}
                  {fourthDayDesc && <td>{fourthDayDesc}</td>}
                  {fifthDayDescr && <td>{fifthDayDescr}</td>}
                </tr>
                <tr>
                  <td style={{fontWeight:"bold"}}>Detailed Forecast</td>
                  <td>
                    <Link to={`/hourlyForecast/${firstDate}`}>Hourly Forecast</Link>
                  </td>
                  <td>
                    <Link to={`/hourlyForecast/${secondDate}`}>Hourly Forecast</Link>
                  </td>
                  <td>
                    <Link to={`/hourlyForecast/${thirdDate}`}>Hourly Forecast</Link>
                  </td>
                  <td>
                    <Link to={`/hourlyForecast/${fourthDate}`}>Hourly Forecast</Link>
                  </td>
                  <td>
                    <Link to={`/hourlyForecast/${fifthDate}`}>Hourly Forecast</Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

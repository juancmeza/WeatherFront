import React from "react";
import { Row, Col, Container} from "react-bootstrap"

import DayCard from './DayCard.js'


class WeeklyContainer extends React.Component {
  
  generateForecast = () => {
    let newForecast = [...this.props.daily];
    newForecast.shift();
    return newForecast.map((eachDay) => {
      let unixTime = eachDay.dt;
      let date = new Date(unixTime * 1000);

      return (
        <Col>
          <DayCard date={date.toLocaleDateString("en-US")}
                  description={eachDay.weather[0].description} 
                  high={Math.round(eachDay.temp.max)}
                  low={Math.round(eachDay.temp.min)}
                  imgUrl={eachDay.weather[0].icon}
          >
          </DayCard>
          <br></br>
        </Col>
      );
    });
  };
  
  render() {
    return (
      <div className="mx-auto">
          <Row>{this.generateForecast()}</Row>
        <br></br>
      </div>
    );
  }
}

export default WeeklyContainer;

import React from "react";
import { Card } from "semantic-ui-react";
import { Row, Col, Container} from "react-bootstrap"


class WeeklyContainer extends React.Component {
  generateForecast = () => {
    let newForecast = [...this.props.daily];
    newForecast.shift();
    return newForecast.map((eachDay) => {
      let unixTime = eachDay.dt;
      let date = new Date(unixTime * 1000);

      return (
        <Col>
          <div className='DayInWeek'>
              <h6>{date.toLocaleDateString("en-US")}</h6>
              <div className={"i" + eachDay.weather[0].icon}>
                  <p>{eachDay.weather[0].description}</p>
                  <p>High: {Math.round(eachDay.temp.max)}°F</p>
                  <p>Low: {Math.round(eachDay.temp.min)}°F</p>
            </div>
          </div>
        </Col>
      );
    });
  };
  render() {
    return (
      <div className="mx-auto">
        <Container>
          <Row>{this.generateForecast()}</Row>
        </Container>
        <br></br>
      </div>
    );
  }
}

export default WeeklyContainer;

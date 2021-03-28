import React from "react";
import { Card } from "semantic-ui-react";

class CurrentContainer extends React.Component {
  render() {
    return (
      <div>
        <Card className="mx-auto">
          <Card.Content>
            <div className="Current-Weather">
              <h3>
                Current Weather in: <br></br>
                {this.props.selected} <br></br>
                {this.props.current.weather[0].description}
              </h3>
              <p>Temp: {Math.round(this.props.current.temp)}°F</p>
              <p>Feels Like: {Math.round(this.props.current.feels_like)}°F</p>
              <p>Humidity: {this.props.current.humidity}%</p>
              <p>Wind: {Math.round(this.props.current.wind_speed)} mph</p>
            </div>
          </Card.Content>
        </Card>
        <br></br>
      </div>
    );
  }
}

export default CurrentContainer;

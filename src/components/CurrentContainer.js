import React from "react";
import { Card } from "semantic-ui-react";

class CurrentContainer extends React.Component {
  render() {
    return (
      <div>
        <Card className="mx-auto">
          <Card.Content>
            <div className="Current-Weather">
                <h2>Current Weather in: </h2>
                <h2>{this.props.selected} </h2>
                <h2>{this.props.current.weather[0].description} </h2>
              <h3>Temp: {Math.round(this.props.current.temp)}°F</h3>
              <h3>Feels Like: {Math.round(this.props.current.feels_like)}°F</h3>
              <h3>Humidity: {this.props.current.humidity}%</h3>
              <h3>Wind: {Math.round(this.props.current.wind_speed)} mph</h3>
            </div>
          </Card.Content>
        </Card>
        <br></br>
      </div>
    );
  }
}

export default CurrentContainer;

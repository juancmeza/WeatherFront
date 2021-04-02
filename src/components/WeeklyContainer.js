import React from "react";
import { Card } from "semantic-ui-react";
import { Row, Col, Container} from "react-bootstrap"
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class WeeklyContainer extends React.Component {
  generateForecast = () => {
    let newForecast = [...this.props.daily];
    newForecast.shift();
    return newForecast.map((eachDay) => {
      let unixTime = eachDay.dt;
      let date = new Date(unixTime * 1000);

      return (
        <TableCell>
          <div className='DayInWeek'>
              <h6>{date.toLocaleDateString("en-US")}</h6>
              <div className={"i" + eachDay.weather[0].icon}>
                  <p>{eachDay.weather[0].description}</p>
                  <p>High: {Math.round(eachDay.temp.max)}°F</p>
                  <p>Low: {Math.round(eachDay.temp.min)}°F</p>
              </div>
          </div>
        </TableCell>
      );
    });
  };
  
  render() {
    return (
      <div className="mx-auto">
        <Table>
          <TableRow>{this.generateForecast()}</TableRow>
        </Table>
        <br></br>
      </div>
    );
  }
}

export default WeeklyContainer;

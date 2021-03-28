import React from "react";

class UserLocations extends React.Component {
  componentDidMount() {
    this.renderLocations();
  }

  renderLocations = () => {
    return this.props.user_locations.map((location) => {
      return (
        <tr>
          <td>{location.city}</td>
          <td>
            <button onClick={() => this.props.selectLocation(location.city)}>
              Show Forecast
            </button>
          </td>
          <td>
            <button onClick={() => this.props.deleteUserLocation(location)}>
              Remove Location
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <h2 className="text-white">My Locations</h2>
        <div className="UserLocations">
          <table>
            <thead>
              <tr>
                <th className="text-white">City</th>
                <th className="text-white"></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-white">{this.renderLocations()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default UserLocations;


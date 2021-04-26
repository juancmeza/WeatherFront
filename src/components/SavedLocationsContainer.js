import React from "react";
import LocationCard from './LocationCard.js'

class SavedLocationsContainer extends React.Component {

  state = {
    savedLocationsData: [],
  }

  componentDidMount() {
    this.fetchUserLocations(this.props.user_locations);
  }


fetchUserLocations = (locations) => {
  locations.map((location) => {
      fetch(`http://localhost:3000/locations/?latitude=${location.latitude}&longitude=${location.longitude}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 400 && data.status !== 500 && data){
          data.lmao['location'] = location
          this.setState({
            savedLocationsData: [...this.state.savedLocationsData, data.lmao],
          })
        }
      })
    // console.log(data)
    // return <LocationCard data={data} location={location}></LocationCard>
    // debugger
  });
}
renderUserLocations = () => {
    return this.state.savedLocationsData.map(locationData => {
      return <LocationCard data={locationData} updateSelectedCity={this.props.updateSelectedCity}></LocationCard>

    })
  }
//   // return <LocationCard data={this.state.savedLocationData} location={this.state.savedLocation}></LocationCard>
// }

  render () {
    return (
      <div>
          {this.renderUserLocations()}
      </div>
    )
  }
}
export default SavedLocationsContainer;


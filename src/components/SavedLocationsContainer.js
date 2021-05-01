import React from "react";
import LocationCard from './LocationCard.js'

class SavedLocationsContainer extends React.Component {

  state = {
    savedLocationsData: [],
  }

  componentDidMount() {
    this.fetchUserLocations(this.props.user_locations);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.user_locations !== this.props.user_locations) {
      this.fetchUserLocations([this.props.user_locations.pop()]);
    }
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
  });
}
renderUserLocations = () => {
    return this.state.savedLocationsData.map(locationData => {
      return <LocationCard data={locationData} updateSelectedCity={this.props.updateSelectedCity}></LocationCard>

    })
  }

  render () {
    return (
      <div>
          {this.renderUserLocations()}
      </div>
    )
  }
}
export default SavedLocationsContainer;


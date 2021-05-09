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
    if (prevProps.user_locations.length < this.props.user_locations.length) {
      this.addNewLocationData();
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

  addNewLocationData = () => {
    const {current, daily, latitude, longitude, selected, id} = this.props
    
    const newLocation = {
      current: current,
      daily: daily,
      location: {city: selected, id: id, latitude: latitude, longitude: longitude}
    }

    this.setState({
      savedLocationsData: [...this.state.savedLocationsData, newLocation],
    })

  }

  removeFromSavedLocations = (location) => {
    this.props.deleteUserLocation(location)
    this.setState({
      savedLocationsData: [...this.state.savedLocationsData].filter(
        (loc) => loc.id !== location.id
      )
    })
  }

  renderUserLocations = (locations) => {
    return locations.map(locationData => {
      return <LocationCard data={locationData} updateSelectedCity={this.props.updateSelectedCity} removeFromSavedLocations={this.removeFromSavedLocations}></LocationCard>

    })
  }

  render () {
    return (
      <div className="Saved-locations">
          {this.renderUserLocations(this.state.savedLocationsData)}
      </div>
    )
  }
}
export default SavedLocationsContainer;


import React from "react";
import LocationCard from './LocationCard.js'

class SavedLocationsContainer extends React.Component {

  state = {
    savedLocationsData: [],
  }

  componentDidMount() {
    this.fetchUserLocations(this.props.user_locations);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_locations !== this.props.user_locations) {
      if (prevProps.user_locations.length < this.props.user_locations.length){
        this.addNewLocationData();
      }
      else if (prevProps.locationToDelete !== this.props.locationToDelete){
        
        this.removeFromSavedLocations(this.props.locationToDelete)
      }
    }
  }


  fetchUserLocations = (locations) => {
    locations.map((location) => {
        fetch(`https://quickforecast.herokuapp.com/locations/?latitude=${location.latitude}&longitude=${location.longitude}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 400 && data.status !== 500 && data){
            data.lmao['location'] = location
            this.setState({
              savedLocationsData: [...this.state.savedLocationsData, data.lmao],
            })
          }
        })
        return true
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
    this.setState({
      savedLocationsData: [...this.state.savedLocationsData].filter(
        loc => loc.location.id !== location.id
      )
    })
  }

  renderUserLocations = (locations) => {
    return locations.map(locationData => {
      return <LocationCard data={locationData} updateSelectedCity={this.props.updateSelectedCity} deleteUserLocation={this.props.deleteUserLocation}></LocationCard>

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


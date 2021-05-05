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
    const {current, daily, latitude, longitude, selected} = this.props
    
    const newLocation = {
      current: current,
      daily: daily,
      latitude: latitude,
      longitude: longitude,
      selected: selected,
    }

    this.setState({
      savedLocationsData: [...this.state.savedLocationsData, newLocation],
    })

  }

  renderUserLocations = () => {
    return this.state.savedLocationsData.map(locationData => {
      return <LocationCard data={locationData} updateSelectedCity={this.props.updateSelectedCity}></LocationCard>

    })
  }

  render () {
    return (
      <div className="Saved-locations">
          {this.renderUserLocations()}
      </div>
    )
  }
}
export default SavedLocationsContainer;


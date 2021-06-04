import React, { Component } from "react";
import WeeklyContainer from "./WeeklyContainer";
import Nav from "../Nav";
import "../App.css";
import { Row, Col, Button} from "react-bootstrap"
import CurrentCard from './CurrentCard.js'
import SavedLocationsContainer from "./SavedLocationsContainer.js";


class Home extends Component {
  state = {
    current: { weather: [{ description: "" }] },
    daily: [],
    name: "",
    location_id: 0,
    user_locations: [],
    selected: "San Francisco",
    latitude: 37.7749295,
    longitude: -122.4194155,
    savedLocationData: '',
    savedLocation: '',
    locationToDelete: {},
  };

  deleteUserLocation = (location) => {
    fetch(`https://quickforecast.herokuapp.com/user_locations/${location.id}`, {
      method: "DELETE",
    }).then(() =>
      this.setState({
        locationToDelete: location,
        user_locations: [...this.state.user_locations].filter(
          (loc) => loc.id !== location.id
        ),
      })
    );
  };


  fetchSelectedForecast = (latitude, longitude, name) => {
    fetch(`https://quickforecast.herokuapp.com/locations/?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 400 && data.status !== 500 && data){
          this.setState({ 
            current: data.lmao.current, 
            daily: data.lmao.daily, 
            selected: name,
            latitude: latitude,
            longitude: longitude,
           });
        }
      });
  };

  addToUserLocations = (city, latitude, longitude, id) => {
    let newUserLocation = {
      user_location: {
        city: city,
        latitude: latitude,
        longitude: longitude,
        user_id: id,
      }
    };

    fetch("https://quickforecast.herokuapp.com/user_locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserLocation),
    })
      .then((res) => res.json())
      .then((userloc) => {
        this.setState({
          user_locations: [...this.state.user_locations, userloc],
        });      
      });
  };

  updateSelectedCity = (current, daily, city, latitude, longitude) => {
    this.setState({
      current: current,
      daily: daily,
      selected: city,
      latitude: latitude,
      longitude: longitude,
    })
  }

  submitName = (e, name) => {
    e.preventDefault();
    this.fetchSelectedForecast(name);
    console.log(name);
  };

  componentDidMount() {

      this.fetchSelectedForecast(this.state.latitude, this.state.longitude, this.state.selected);
      this.setState({
        user_locations: this.props.user_locations
      });
  }


  render() {
    return (
      <div className = 'Home'>
        <div className='Fix-nav'>
          <Nav fetchSelectedForecast={this.fetchSelectedForecast} handleLogout={this.props.handleLogout}/>
        </div>
        <br></br>
        <div className='Top'>
          <Row>
              <Col>
              <div className='Current-column'>
                <CurrentCard current={this.state.current}
                              selected={this.state.selected}
                              latitude={this.state.latitude}
                              longitude={this.state.longitude}
                              user_id={this.props.user.id}
                              addToUserLocations={this.addToUserLocations}
                              // deleteUserLocation={this.deleteUserLocation}
                              user_locations={this.state.user_locations}
                >
                </CurrentCard>
                <br></br>
              </div>
              </Col>
                {this.state.user_locations.length > 0 ?
                <Col>
                  <div className="Saved-table">
                    <SavedLocationsContainer user_locations={this.state.user_locations} 
                                             updateSelectedCity={this.updateSelectedCity}
                                             current={this.state.current}
                                             daily={this.state.daily}
                                             latitude={this.state.latitude}
                                             longitude={this.state.longitude}
                                             selected={this.state.selected}
                                             deleteUserLocation={this.deleteUserLocation}
                                             locationToDelete={this.state.locationToDelete}      
                    >
                    </SavedLocationsContainer>
                  </div>
                </Col> : 
                null
                }
          </Row>
        </div>
        <div className="tbd">
            {<WeeklyContainer daily={this.state.daily} />}
        </div>
      </div>
    );
  }
}

export default Home;
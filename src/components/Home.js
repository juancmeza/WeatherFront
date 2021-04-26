import React, { Component } from "react";
import WeeklyContainer from "./WeeklyContainer";
import Nav from "../Nav";
import "../App.css";
import { Row, Col, Button} from "react-bootstrap"
import CurrentCard from './CurrentCard.js'
import LocationCard from './LocationCard.js'
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
  };

  deleteUserLocation = (location) => {
    fetch(`http://localhost:3000/user_locations/${location.id}`, {
      method: "DELETE",
    }).then(() =>
      this.setState({
        user_locations: [...this.state.user_locations].filter(
          (loc) => loc.id !== location.id
        ),
      })
    );
  };


  selectLocation = (e) => {
    this.setState({ selected: e.target.value });
    // return e.target.value;
  };

  selectLocation2 = (name) => {
    console.log(name);
    this.setState({
      selected: name,
    });
    this.fetchSelectedForecast(name);
  };

  fetchSelectedForecast = (latitude, longitude, name) => {
    fetch(`http://localhost:3000/locations/?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 400 && data.status !== 500 && data){
          this.setState({ current: data.lmao.current, daily: data.lmao.daily, selected: name });
        }
      });
  };

  updateSelectedCity = (current, daily, city) => {
    this.setState({
      current: current,
      daiy: daily,
      selected: city
    })
  }

  submitName = (e, name) => {
    e.preventDefault();
    this.fetchSelectedForecast(name);
    console.log(name);
  };

  addToUserLocation = (e, location) => {
    console.log(location);
    let newUserLocation = {
      default: false,
      user_id: this.props.user.id,
      location_id: location.id,
    };
    this.setState({
      user_locations: [...this.state.user_locations, location],
    });

    fetch("http://localhost:3000/user_locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserLocation),
    })
      .then((res) => res.json())
      .then((userloc) => {
        console.log(userloc);
      });
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
                >
                </CurrentCard>
                <br></br>
              </div>
              </Col>
                {this.props.user_locations.length > 0 ?
                <Col>
                  <div className="Saved-table">
                    <SavedLocationsContainer user_locations={this.props.user_locations} updateSelectedCity={this.updateSelectedCity}></SavedLocationsContainer>
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
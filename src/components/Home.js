import React, { Component } from "react";
import CurrentContainer from "./CurrentContainer";
import WeeklyContainer from "./WeeklyContainer";
import UserLocations from "./UserLocations";
import Nav from "../Nav";
import "../App.css";
import { Row, Col, Button} from "react-bootstrap"
import CurrentCard from './CurrentCard.js'
import SavedTable from './SavedTable.js'
import LocationCard from './LocationCard.js'


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
    // locations: [],
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


  showLocations = () => {
    return fetch(`http://localhost:3000/users/${this.props.userInfo.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ user_locations: data.locations });
        console.log(this.state);
      });
    // selectedLocations: {}
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

  submitName = (e, name) => {
    e.preventDefault();
    this.fetchSelectedForecast(name);
    console.log(name);
  };

  addToUserLocation = (e, location) => {
    console.log(location);
    let newUserLocation = {
      default: false,
      user_id: this.props.userInfo.id,
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
    // this.showLocations();
    this.fetchSelectedForecast(this.state.latitude, this.state.longitude, this.state.selected);
    // fetch(
    //   `http://localhost:3000/locations/?name=${this.state.selected}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // debugger
    //     if (data.status !== 500 && data){
    //     this.setState({ current: data.lmao.current, daily: data.lmao.daily });
    //     }
    //   });
  }
  render() {
    return (
      <div className = 'Home'>
        <div className='Fix-nav'>
          <Nav fetchSelectedForecast={this.fetchSelectedForecast} handleLogout={this.props.handleLogout}/>
        </div>
        {/* <h1 className="text-white"> WeatherNow </h1> */}
        <br></br>
        <div className='Top'>
          <Row>
              <Col>
                {/* <CurrentContainer
                  current={this.state.current}
                  selected={this.state.selected}
                /> */}
                <CurrentCard current={this.state.current}
                              selected={this.state.selected}
                >
                </CurrentCard>
                <br></br>
              </Col>
          {/* {this.state.user_locations.length > 0 ? 
          <Col>
            <UserLocations
            showLocations={this.showLocations}
            user_locations={this.state.user_locations}
            selectLocation={this.selectLocation2}
            stateData={this.state}
            deleteUserLocation={this.deleteUserLocation}
            />
          </Col> :
          null
          } */}
              <Col>
                {/* <SavedTable></SavedTable> */}
                <div className="Saved-table">
                  <LocationCard></LocationCard>
                  <LocationCard></LocationCard>
                  <LocationCard></LocationCard>
                  <LocationCard></LocationCard>
                </div>
              </Col>
          </Row>
        </div>
        <div className="tbd">
          {/* <TableContainer> */}
            {<WeeklyContainer daily={this.state.daily} />}
          {/* </TableContainer> */}
        </div>
      </div>
    );
  }
}

export default Home;
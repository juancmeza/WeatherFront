import React, { Component } from "react";
import CurrentContainer from "./CurrentContainer";
import WeeklyContainer from "./WeeklyContainer";
import UserLocations from "./UserLocations";
import Nav from "../Nav";
import "../App.css";
import { Row, Col, Button} from "react-bootstrap"

class Home extends Component {
  state = {
    current: { weather: [{ description: "" }] },
    daily: [],
    name: "",
    location_id: 0,
    user_locations: [],
    selected: "San Francisco",
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

  fetchSelectedForecast = (name) => {
    fetch(`http://localhost:3000/locations/?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ current: data.lmao.current, daily: data.lmao.daily, selected: name });
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
    fetch(
      `http://localhost:3000/locations/?name=${this.state.selected}`
    )
      .then((res) => res.json())
      .then((data) => {
        // debugger
        if (data.status !== 500 && data){
        this.setState({ current: data.lmao.current, daily: data.lmao.daily });
        }
      });
  }
  render() {
    return (
      <div className = 'Home'>
        <Nav fetchSelectedForecast={this.fetchSelectedForecast}/>
        <h1 className="text-white"> WeatherNow </h1>
        <div>
          <Row>
            <Col>
              <CurrentContainer
                current={this.state.current}
                selected={this.state.selected}
              />
          </Col>
          {this.state.user_locations.length > 0 ? 
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


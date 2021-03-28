import React, { Component } from "react";
import CurrentContainer from "./CurrentContainer";
import WeeklyContainer from "./WeeklyContainer";
import UserLocations from "./UserLocations";
import EditAccount from "./EditAccount";
import userEvent from "@testing-library/user-event";
import Nav from "../Nav";
import UserContainer from "./UserContainer";
import "../App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Home extends Component {
  state = {
    current: { weather: [{ description: "" }] },
    daily: [],
    name: "",
    location_id: 0,
    user_locations: [],
    selected: "San Francisco",
    locations: [],
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
    fetch(`http://localhost:3000/user_locations/render_request?name=${name}`)
      .then((res) => res.json())
      .then((name) => {
        this.setState({ current: name.lmao.current, daily: name.lmao.daily });
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
      `http://localhost:3000/locations/?name="San%20Francisco"`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data){
        this.setState({ current: data.lmao.current, daily: data.lmao.daily });
        // console.log(this.state);
        }
      });
  }
  render() {
    return (
      <div>
        <Nav /> <br />
        <h3 className="text-white"> Weather </h3>
        <div>
          {
            <CurrentContainer
              current={this.state.current}
              selected={this.state.selected}
            />
          }
        </div>
        <div className="Weekly">{<WeeklyContainer daily={this.state.daily} />}</div>
        <div>
          <UserLocations
            showLocations={this.showLocations}
            user_locations={this.state.user_locations}
            selectLocation={this.selectLocation2}
            stateData={this.state}
            deleteUserLocation={this.deleteUserLocation}
          />
        </div>
      </div>
    );
  }
}

export default Home;


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
import { ContactSupportSharp } from "@material-ui/icons";


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


  // showSavedLocations = () => {
  //   return fetch(`http://localhost:3000/users/${this.props.user.id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.user_locations){
  //         this.setState({ user_locations: data.user_locations });
  //         console.log(this.state);
  //       }
  //     });
  // };

  renderUserLocations = (locations) => {
      return locations.map(async (location) => {
        let cardData = new Promise((resolve, reject) => {
          let resp = fetch(`http://localhost:3000/locations/?latitude=${location.latitude}&longitude=${location.longitude}`).then((res) => res.json())

          if (resp.status !== 400 && resp.status !== 500 && resp){
            // this.setState({
            //   savedLocationData: data.lmao,
            //   savedLocation: location
            // })
            resolve (resp)
          } else{
            reject (null)
          }
        })

        const data = await cardData
        // console.log(data)
        return <LocationCard data={data} location={location}></LocationCard>
        // debugger
      });

      // return <LocationCard data={this.state.savedLocationData} location={this.state.savedLocation}></LocationCard>
  }
    // return Promise.all(promises)
    // console.log(promises)
  

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
    // this.showLocations();
    // this.mounted = true;

    // if (this.mounted){
      this.fetchSelectedForecast(this.state.latitude, this.state.longitude, this.state.selected);
      this.setState({
        user_locations: this.props.user_locations
      });
    // }

    // console.log('props', this.props.user_locations)
    // console.log('state', this.state.user_locations)
  }

  // componentWillUnmount() {
  //   this.mounted = false;
  // }

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
                {this.props.user_locations.length > 0 ?
                <Col>
                  <div className="Saved-table">
                    {this.renderUserLocations(this.props.user_locations)}
                  </div>
                </Col> : 
                null
                }
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
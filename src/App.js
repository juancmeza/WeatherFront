import React, { Component } from "react";
import UserContainer from "./components/UserContainer";
import "./App.css";
import Home from "./components/Home";
import EditAccount from "./components/EditAccount";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    user: {},
    user_locations: [],
    redirect: false,
    logged: false,
  };

  handleLogout = () => {
    sessionStorage.clear();
    this.setState({
      email: "",
      username: "",
      password: "",
      user: {},
      user_locations: [],
      redirect: true,
      logged: false,
    });
  };

  getUser = (userObject) => {
    sessionStorage.setItem("userId", userObject.id);
    this.setState({
      user: userObject,
      user_locations: userObject.user_locations,
      logged: true,
    });
  };

  componentDidMount() {
    let userSession = sessionStorage.getItem("userId");
    if (userSession) {
      fetch(`http://localhost:3000/users/${userSession}`)
        .then((res) => res.json())
        .then((user) =>
          this.setState({
            user: user, user_locations: user.user_locations, logged: true,
          })
        );
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <UserContainer getUser={this.getUser} />;
              }}
            />
            <Route
              exact
              path="/Home"
              render={() => {
                return this.state.logged ? <Home user={this.state.user} user_locations={this.state.user_locations} handleLogout={this.handleLogout} addToUserLocations={this.addToUserLocations}/> :
                  <UserContainer getUser={this.getUser} />;
              }}
            />
            <Route
              path="/Welcome"
              render={() => {
                return <UserContainer getUser={this.getUser} />;
              }}
            />
            <Route
              exact
              path="/Edit"
              render={() => {
                return (
                  <EditAccount
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                  />
                );
              }}
            />
          </Switch>
          {this.state.redirect ? <Redirect to="/Welcome" /> : null}
        </div>
      </Router>
    );
  }
}

export default App;



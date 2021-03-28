import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import LogIn from "./components/LogIn";
import UserContainer from "./components/UserContainer";
import EditAccount from "./components/EditAccount";
import Nav from "./Nav";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    user: {},
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
      redirect: true,
      logged: false,
    });
  };

  getUser = (userObject) => {
    sessionStorage.setItem("userId", userObject.id);
    this.setState({
      user: userObject,
    });
  };
  componentDidMount() {
    let userSession = sessionStorage.getItem("userId");
    if (userSession) {
      fetch(`http://localhost:3000/users/${userSession}`)
        .then((res) => res.json())
        .then((user) =>
          this.setState({
            user: user,
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
                return <Home userInfo={this.state.user} />;
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
                    userInfo={this.state.user}
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



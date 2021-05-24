import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    user: {},
    redirect: false,
    logged: false,
  };

  handleLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch("https://quickforecast.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((user) => {
        this.props.getUser(user)
        this.setState({
          user: user,
          // user_locations: user.user_locations,
          redirect: true,
          logged: true,
        });
      })
    .catch((message) => alert("Invalid username or password"));

  };

  render() {
    return (
      <div>
        <div >
          <div className='Sign-on-card'>
            <div className="card-body">
              <h3 className="text-white">Sign In</h3>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                  <label>
                    <input
                      className="form-control form-control-lg"
                      onChange={(e) => this.handleLogin(e)}
                      type="text"
                      placeholder="username"
                      id="username"
                      name="username"
                    />{" "}
                    <br />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      className="form-control form-control-lg"
                      onChange={(e) => this.handleLogin(e)}
                      type="password"
                      placeholder="password"
                      id="password"
                      name="password"
                    />{" "}
                    <br />
                  </label>
                </div>
                <button
                  className="btn btn-outline-light btn-block"
                  type="submit"
                >
                  Login
                </button>
              </form>
              <button
                className="btn btn-outline-light btn-block"
                onClick={this.props.toggleButton}
              >
                Sign Up
              </button>
              {this.state.logged ? <Redirect to="/Home" /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;

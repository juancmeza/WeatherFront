import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Nav from "../Nav";

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

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((user) => this.props.getUser(user))
      .then((user) => {
        this.setState({
          user: user,
          redirect: true,
          logged: true,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="col-lg-4">
          <div className="card bg-dark card-form">
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

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    redirect: false,
    loading: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    })

    let newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    fetch("https://quickforecast.herokuapp.com/users", {
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
          redirect: true,
        });
      })
      .then((message) => alert("Account Created!"));
  };
  render() {
    return (
      <div className="signupdiv">
        <div >
          <div className="Sign-on-card">
            <div className="card-body">
              <h3 className="text-white"> Sign Up </h3>

              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                  <label>
                    <input
                      className="form-control form-control-lg"
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      placeholder="email"
                      id="email"
                      name="email"
                    />{" "}
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      className="form-control form-control-lg"
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      placeholder="username"
                      id="username"
                      name="username"
                    />{" "}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      className="form-control form-control-lg"
                      onChange={(e) => this.handleChange(e)}
                      type="password"
                      placeholder="password"
                      id="password"
                      name="password"
                    />{" "}
                  </label>
                </div>
                <button
                  className="btn btn-outline-light btn-block"
                  type="submit"
                >
                  Create Account
                </button>
              </form>
              <br></br>
              <div>Already have an account?</div>
              <button
                className="btn btn-outline-light btn-block"
                onClick={this.props.toggleButton}
              >
                Sign in
              </button>
              {this.state.loading ?
                  this.state.redirect ? <Redirect to="/Home" /> : <div><br></br><CircularProgress></CircularProgress><h5>Waiting for Heroku server...</h5></div>
                  :
                  null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

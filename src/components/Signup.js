import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    fetch("http://localhost:3000/users", {
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
        });
      })
      .then((message) => alert("Account Created!"));
  };
  render() {
    return (
      <div className="signupdiv">
        <div className="col-lg-4">
          <div className="card bg-dark card-form">
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
                    <br />
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
                    <br />
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
                    <br />
                  </label>
                </div>
                <button
                  className="btn btn-outline-light btn-block"
                  type="submit"
                >
                  Create Account
                </button>
              </form>

              <button
                className="btn btn-outline-light btn-block"
                onClick={this.props.toggleButton}
              >
                Click here to sign in
              </button>
              {this.state.redirect ? <Redirect to="/Home" /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

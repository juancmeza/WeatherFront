import React, { Component } from "react";
import Nav from "../Nav";
import { Redirect } from "react-router-dom";

class EditAccount extends Component {
  state = {
    email: this.props.userInfo.email,
    username: this.props.userInfo.username,
    password: this.props.userInfo.password,
    login: !this.props.logged,
    redirect: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let updatedUser = this.state;
    fetch(`http://localhost:3000/users/${this.props.userInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then(console.log("UPDATED"))
      .then((message) => alert("Account Updated!"));
  };
  handleDelete = () => {
    fetch(`http://localhost:3000/users/${this.props.userInfo.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((redir) =>
        this.setState({
          redirect: true,
        })
      )
      .then((message) => alert("Account Deleted! :( )"));
  };
  render() {
    return (
      <div>
        <Nav />
        <div className="a">
          <div className="col-lg-4">
            <div className="card bg-dark card-form">
              <div className="card-body">
                <h3 className="text-white"> Update Account </h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <div className="form-group">
                    <label className="text-white">
                      {" "}
                      Email Address:
                      <input
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        defaultValue={this.props.userInfo.email}
                        id="email"
                        name="email"
                      />{" "}
                      <br />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="text-white">
                      {" "}
                      Username:
                      <input
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        defaultValue={this.props.userInfo.username}
                        id="username"
                        name="username"
                      />{" "}
                      <br />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="text-white">
                      {" "}
                      Password:
                      <input
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        defaultValue={this.props.userInfo.password}
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
                    Update Account
                  </button>
                </form>
                <button
                  className="btn btn-outline-light btn-block"
                  onClick={() => this.handleDelete()}
                >
                  {" "}
                  Delete Account{" "}
                </button>
                <button
                  className="btn btn-outline-light btn-block"
                  onClick={() => this.props.handleLogout()}
                >
                  {" "}
                  Log Out{" "}
                </button>
                {this.state.redirect ? <Redirect to="/Welcome" /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditAccount;

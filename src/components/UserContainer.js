import React, {Component} from 'react'
import Signup from './Signup'
import LogIn from './LogIn'

class UserContainer extends Component {

  state = {
    loginSwitch: false
  }

  showLogIn = () => {
    this.setState(prevState => {
      return{
        loginSwitch: !prevState.loginSwitch
      }
    })
  }


  render(){
    return (
      <div>
        {this.state.loginSwitch ? <LogIn toggleButton={this.showLogIn} getUser={this.props.getUser} loggedIn={this.props.loggedIn}/> : <Signup toggleButton={this.showLogIn} getUser={this.props.getUser}/>}
      </div>
    );
  }
}

export default UserContainer;

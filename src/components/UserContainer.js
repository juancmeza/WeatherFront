import React, {Component} from 'react'
import Signup from './Signup'
import LogIn from './LogIn'
import {Col, Row} from 'react-bootstrap'
import WbSunnyIcon from '@material-ui/icons/WbSunny';


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
      <div className='Sign-on'>
        <br></br>
        <div className='App-title'>
          <div className='App-logo2'>
            <WbSunnyIcon fontSize='large'/>
          </div>
          <h1>QuickForecast</h1>
          <br></br>
        </div>
        <Row>
          <Col></Col>
          <Col></Col>
            <Col>
                {this.state.loginSwitch ? 
                <LogIn toggleButton={this.showLogIn} getUser={this.props.getUser} loggedIn={this.props.loggedIn}/> : 
                <Signup toggleButton={this.showLogIn} getUser={this.props.getUser}/>}
            </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default UserContainer;

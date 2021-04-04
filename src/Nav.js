import React, {Component} from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import Search from "./components/Search";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

class Nav extends Component {
  render() {
    return(
      <nav className="navbar">
        <div className='App-logo'>
          <WbSunnyIcon fontSize='large'/>
        </div>
        <h1 className="text-white">Weather</h1>
        <Search fetchSelectedForecast={this.props.fetchSelectedForecast}/>
        <div className ="NavStuff">
          <div className='Logout' title='Log out'>
            <ExitToAppRoundedIcon onClick={this.props.handleLogout} variant="outline-light">Log out</ExitToAppRoundedIcon>
          </div>
        </div>
      </nav>
    )
  }
}
export default Nav;

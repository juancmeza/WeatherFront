import React, {Component} from 'react'
import './App.css';
import Search from "./components/Search";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

class Nav extends Component {
  render() {
    return(
      <nav className="navbar">
        <div className='App-logo'>
          <WbSunnyIcon fontSize='large'/>
        </div>
        <h1 className="Full-screen">QuickForecast</h1>
        <div className='Search-bar'>
          <Search fetchSelectedForecast={this.props.fetchSelectedForecast}/>
        </div>
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

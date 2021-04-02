import React, {Component} from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import Search from "./components/Search";
import WbSunnyIcon from '@material-ui/icons/WbSunny';

class Nav extends Component {
  render() {
    return(
      <nav className="navbar">
        <div className='App-logo'>
          <WbSunnyIcon fontSize='large'/>
        </div>
        <h1 className="text-white"> Weathever </h1>
        <Search fetchSelectedForecast={this.props.fetchSelectedForecast}/>
        <ul className ="NavStuff">
          <Link to="/Edit">
            <li className = "text-white nav-text"> Edit Account </li>
          </Link>
        </ul>
      </nav>
    )
  }
}
export default Nav;

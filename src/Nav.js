import React, {Component} from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import Search from "./components/Search";

class Nav extends Component {
  render() {
    return(
      <nav className="navbar">
        <h1 className="text-white"> WeatherNow </h1>
        <Search />
        <ul className ="NavStuff">
          <Link to="/Home">
            <li className="text-white nav-text"> Home </li>
          </Link>
          <Link to="/Edit">
            <li className = "text-white nav-text"> Edit Account </li>
          </Link>
        </ul>
      </nav>
    )
  }
}
export default Nav;

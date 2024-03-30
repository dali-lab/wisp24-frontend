import React from 'react';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Route, NavLink, Switch,
} from 'react-router-dom';
import Feed from '../../containers/feed/feed';
import Homepage from '../../containers/homepage/Homepage';

const navbar = () => {
  return (
    <div className="navbar">
      <div>username</div>
      <div className="navbar-right">
          <NavLink to="/home">Home</NavLink>
          
          <NavLink to ="/feed">Feed</NavLink>
         <p id="navbar-friends">friends</p>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = (toggleSidebar) => {
  return (
    <div className="navbar">
      <div>
        <p className="navbar-left">username</p>
        <button type="submit" onClick={toggleSidebar}>Toggle Profile</button>
      </div>
      <div className="navbar-right">
        <NavLink to="/home" className="navbar-right-links">Home</NavLink>
        <NavLink to="/feed" className="navbar-right-links">Feed</NavLink>
        <NavLink to="/friends" className="navbar-right-links">Friends</NavLink>
      </div>
    </div>
  );
};

export default Navbar;

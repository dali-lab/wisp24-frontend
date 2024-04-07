import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <p className="navbar-left">username</p>
      </div>
      <div className="navbar-right">
        <NavLink to="/home" className="navbar-right-links">Home</NavLink>
        <NavLink to="/feed" className="navbar-right-links">Feed</NavLink>
        <p className="navbar-right-links">friends</p>
      </div>
    </div>
  );
};

export default Navbar;

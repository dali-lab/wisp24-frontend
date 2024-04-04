import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div>username</div>
      <div className="navbar-right">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/feed">Feed</NavLink>
        <NavLink to="/friend">Friends</NavLink>
      </div>
    </div>
  );
};

export default Navbar;

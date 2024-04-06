import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* <button onClick={toggleSidebar}>Toggle Profile</button> */}
      <p>Profile</p>
      <div className="navbar-right">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/feed">Feed</NavLink>
        <NavLink to="/friends">Friends</NavLink>
        <p id="navbar-friends">friends</p>
      </div>
    </div>
  );
};

export default Navbar;

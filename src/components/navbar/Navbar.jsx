import React from 'react';
import './Navbar.css';

const navbar = () => {
  return (
    <div className="navbar">
      <div>username</div>
      <div className="navbar-right">
        <p id="navbar-feed">feed</p>
        <p id="navbar-friends">friends</p>
      </div>
    </div>
  );
};

export default navbar;

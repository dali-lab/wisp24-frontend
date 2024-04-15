import React from 'react';
import './Sidebar.css';
import Profile from './Profile';

const Sidebar = ({ isOpen, toggleSidebar, userData }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Profile profileData={userData} open={isOpen} handleClose={toggleSidebar} />
      <button type="button" onClick={toggleSidebar}>Close Sidebar</button>
    </div>
  );
};

export default Sidebar;

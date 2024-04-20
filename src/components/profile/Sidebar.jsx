import React from 'react';
import './Sidebar.css';
import Profile from './Profile';

const Sidebar = ({ isOpen, toggleSidebar, userData }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Profile profileData={userData} open={isOpen} handleClose={toggleSidebar} />
    </div>
  );
};

export default Sidebar;

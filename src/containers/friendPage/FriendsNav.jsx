import React from 'react';
import { NavLink } from 'react-router-dom';
import './FriendsNav.css';

const FriendsNav = () => {
  return (
    <div className="fnav">
      <NavLink to="/friends" activeClassName="active">Friends</NavLink>
      <NavLink to="/following" activeClassName="active">Following</NavLink>
      <NavLink to="/requests" activeClassName="active">Requests</NavLink>
      <NavLink to="/adduser" activeClassName="active">Add User</NavLink>
      <NavLink to="/profile" activeClassName="active">Profile Example</NavLink>
    </div>
  );
};

export default FriendsNav;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './FriendsNav.css';  

import FriendsPage from './FriendsPage';
import FollowingPage from './FollowingPage';
import RequestsPage from './RequestsPage';
import AddUser from './AddUser';
import ViewProfile from './ViewProfile';

const FriendsNav = () => {
  return (
    <div className="fnav">
      {/* 
      <Router>
            <Switch>
                <Route exact path="/friends" component={FriendsPage} />
                <Route exact path="/following" component={FollowingPage} />
                <Route exact path="/adduser" component={AddUser} />
                <Route exact path="/requests" component={RequestsPage} />
                <Route exact path="/profile" component={ViewProfile} />
            </Switch>
    </Router> 
    */}
      <NavLink to="/following" activeClassName="active">Following</NavLink>
      <NavLink to="/requests" activeClassName="active">Requests</NavLink>
      <NavLink to="/adduser" activeClassName="active">Add User</NavLink>
      <NavLink to="/friends" activeClassName="active">Friends</NavLink>
      <NavLink to="/profile" activeClassName="active">Profile</NavLink>
    </div>
  );
};

export default FriendsNav;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';  
import FriendsPage from './FriendsPage';
import FollowingPage from './FollowingPage';
import RequestsPage from './RequestsPage';
import ViewProfile from './ViewProfile';
import AddUser from './AddUser';

const FriendsNav = () => {
  return (
    <div className="navigation">
        <Router>
            <Switch>
                <Route exact path="/friends" component={SignInPanel} />
                <Route exact path="/following" component={SignUpPanel} />
                <Route exact path="/adduser" component={Feed} />
                <Route exact path="/friends" component={Test} />
                <Route exact path="/profile" component={Homepage} />
            </Switch>
        </Router>
      <NavLink to="/following" activeClassName="active">Following</NavLink>
      <NavLink to="/requests" activeClassName="active">Requests</NavLink>
      <NavLink to="/adduser" activeClassName="active">Add User</NavLink>
      <NavLink to="/friends" activeClassName="active">Friends</NavLink>
      <NavLink to="/profile" activeClassName="active">Profile</NavLink>
    </div>
  );
};

export default FriendsNav;

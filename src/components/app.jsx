import React from 'react';
import {
  BrowserRouter as Router,
  Route, NavLink, Switch,
} from 'react-router-dom';

import requireAuth from '../hocs/requireAuth';

import AdminPanel from '../containers/adminPanel';
import SearchBar from '../containers/search/searchBar';
import SearchPane from '../containers/search/searchPane';
import SignUpPanel from '../containers/authentication/signUpPanel';
import SignInPanel from '../containers/authentication/signInPanel';
import Test from '../containers/authentication/signOutPanel';
import Homepage from '../containers/homepage/Homepage';
import Feed from '../containers/feed/feed';
import Navbar from './navbar/Navbar';
import Plan23 from './plan2/Plan23';

const Welcome = () => (
  <div>
    <NavLink to="/signin">Sign In</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
    <NavLink to="/feed">Feed</NavLink>
    <SearchBar />
    <SearchPane />
  </div>
);

const FallBack = () => <div>Uh oh... URL Not Found! Please contact the system administrator.</div>;

const App = () => (
  <Router>
    <Route exact path="/signup" component={SignUpPanel} />
    <div className="root-div">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signin" component={SignInPanel} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/plan23" component={Plan23} />
        <Route path="/admin" component={requireAuth(AdminPanel, SignInPanel)} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>

);

export default App;

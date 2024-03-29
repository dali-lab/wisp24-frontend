import React from 'react';
import { NavLink } from 'react-router-dom';

const Test = ({ signOutUser }) => (
  <div>
    <NavLink to="/" onClick={() => signOutUser()}>Sign Out</NavLink>
  </div>
);

export default Test;

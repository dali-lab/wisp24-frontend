import React, { useState } from 'react';
import Friend from '../../components/friend/Friend';
import './AddUserPage.css';
import FriendsNav from './FriendsNav';

const AddUserPage = ({ usersList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  let filteredUsers = [];
  if (usersList != null) {
    filteredUsers = usersList.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return (
    <div className="users-page">
      <FriendsNav />
      <h1>All Users</h1>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="users-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((friendData) => (
            <Friend key={friendData.id} friendData={friendData} />
          ))
        ) : (
          <p>No users match your search.</p>
        )}
      </div>
    </div>
  );
};

export default AddUserPage;

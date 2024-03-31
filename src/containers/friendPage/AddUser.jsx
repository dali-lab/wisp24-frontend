import React, { useState } from 'react';
import Friend from './Friend';
import './AddUserPage.css';

const AddUserPage = ({ usersList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usersList.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-page">
      <h1>All Users</h1>
      {/* Search input */}
      <input 
        type="text" 
        placeholder="Search requests..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="users-container">
        {filteredUsers.length > 0 ? (
            filteredRequests.map(friendData => (
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

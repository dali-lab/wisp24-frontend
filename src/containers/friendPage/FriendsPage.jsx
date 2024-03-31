import React, { useState } from 'react';
import Friend from './Friend';
import './FriendsPage.css';

const FriendsPage = ({ friendsList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friendsList.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="friends-page">
      <h1>Friends</h1>
      {/* Search input */}
      <input 
        type="text" 
        placeholder="Search friends..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="friends-container">
        {filteredFriends.length > 0 ? (
          filteredFriends.map(friendData => (
            <Friend key={friendData.id} friendData={friendData} />
          ))
        ) : (
          <p>No friends match your search.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Friend from './Friend';
import './FriendsPage.css';
import FriendsNav from './FriendsNav';

const FriendsPage = ({ friendsList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friendsList.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="friends-page">
      <FriendsNav/>
      <h1>Friends</h1>
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
            <Link key={friendData.name} to={`/profile/${friendData.name}`}>
              <Friend friendData={friendData} />
            </Link>
          ))
        ) : (
          <p>No friends match your search.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;

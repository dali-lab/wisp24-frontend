import React, { useState } from 'react';
import Friend from './Friend';
import './FollowingPage.css';
import FriendsNav from './FriendsNav';
import Navbar from '../../components/navbar/navbar.jsx';

const FollowingPage = ({ followingList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFollowing = followingList.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="following-page">
      <Navbar/>
      <h1>Following</h1>
      <FriendsNav/>
      {/* Search input */}
      <input 
        type="text" 
        placeholder="Search following..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="followings-container">
        {filteredFollowing.length > 0 ? (
            filteredFollowing.map(friendData => (
            <Friend key={friendData.id} friendData={friendData} />
          ))
        ) : (
          <p>No following match your search.</p>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;

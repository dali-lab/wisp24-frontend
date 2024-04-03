import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './FollowingPage.css';
import FriendsNav from './FriendsNav';

const FollowingPage = ({ followingList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  let filteredFollowing = [];
  if (followingList != null) {
    filteredFollowing = followingList.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  return (
    <div className="friends-page">
      <FriendsNav />
      <h1>Following</h1>
      <input
        type="text"
        placeholder="Search following..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="following-container">
        {filteredFollowing.length > 0 ? (
          filteredFollowing.map((friendData) => (
            <Link key={friendData.name} to={`/profile/${friendData.name}`}>
              <Friend friendData={friendData} />
            </Link>
          ))
        ) : (
          <p>No following match your search.</p>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './RequestsPage.css';
import FriendsNav from './FriendsNav';

const RequestsPage = ({ requestsList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  let filteredRequests = [];
  if (requestsList != null) {
    filteredRequests = requestsList.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
        {filteredRequests.length > 0 ? (
          filteredRequests.map((friendData) => (
            <Link key={friendData.name} to={`/profile/${friendData.name}`}>
              <Friend friendData={friendData} />
            </Link>
          ))
        ) : (
          <p>No requests match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;

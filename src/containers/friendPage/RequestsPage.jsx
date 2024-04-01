import React, { useState } from 'react';
import Friend from './Friend';
import './RequestsPage.css';
import FriendsNav from './FriendsNav';
import Navbar from '../../components/navbar/navbar.jsx';

const RequestsPage = ({ requestsList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requestsList.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="requests-page">
      <Navbar/>
      <h1>Requests</h1>
      <FriendsNav/>
      {/* Search input */}
      <input 
        type="text" 
        placeholder="Search requests..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="requests-container">
        {filteredRequests.length > 0 ? (
            filteredRequests.map(friendData => (
            <Friend key={friendData.id} friendData={friendData} />
          ))
        ) : (
          <p>No requests match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;

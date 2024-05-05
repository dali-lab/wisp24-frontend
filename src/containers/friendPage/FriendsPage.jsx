/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './FriendsPage.css';
import FriendsNav from './FriendsNav';
import { getUserData } from '../../services/datastore.js';

const FriendsPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserData(userId);
        if (data && data.friends) {
          const friendIds = Object.keys(data.friends);
          const friendsDetails = await Promise.all(friendIds.map((friendId) => getUserData(friendId)));
          setFriendsData(friendsDetails.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
      setLoading(false);
    };

    fetchFriends();
  }, [userId]);

  const renderFriendsList = () => {
    if (loading) return <p>Loading friends...</p>;

    const filteredFriends = friendsData.filter((friend) => friend.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const [searchTerm, setSearchTerm] = useState('');

    if (filteredFriends.length > 0) {
      return filteredFriends.map((friendData) => (
        <Link key={friendData.id} to={`/profile/${friendData.id}`}>
          <Friend friendData={friendData} />
        </Link>
      ));
    } else {
      return <p>No friends match your search.</p>;
    }
  };

  return (
    <div className="friends-page">
      <FriendsNav />

      <div className="container">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="friends-container">
          {renderFriendsList()}
        </div>
      <input
        type="text"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="friends-container">
        {/* {filteredFriends.length > 0 ? (
          filteredFriends.map((friendData) => (
            <Link key={friendData.id} to={`/profile/${friendData.name}`}>
              <Friend friendData={friendData} />
            </Link>
          ))
        ) : (
          <p>No friends match your search.</p>
        )} */}
        <Link
          to={{
            pathname: `/profile/${sampleFriendData.id}`,
            state: { friendData: sampleFriendData }
          }}
        >
          <Friend friendData={sampleFriendData} />
        </Link>
      </div>
    </div>
  );
};

export default FriendsPage;

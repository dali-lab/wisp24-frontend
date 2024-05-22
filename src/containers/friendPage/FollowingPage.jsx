import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './FollowingPage.css';
import FriendsNav from './FriendsNav';
import { getUserData, removeFollower } from '../../services/datastore.js';

const FollowingPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followersData, setFollowersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getUserData(userId);
        if (data && data.followers) {
          const followerIds = Object.keys(data.followers);
          const followersDetails = await Promise.all(followerIds.map((followerId) => getUserData(followerId)));
          setFollowersData(followersDetails.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
      setLoading(false);
    };

    fetchFollowers();
  }, [userId]);

  const handleUnfollow = async (followerId) => {
    try {
      await removeFollower(userId, followerId);
      setFollowersData((prev) => prev.filter((user) => user.id !== followerId));
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  const renderFollowersList = () => {
    if (loading) return <p>Loading followers...</p>;

    const filteredFollowers = followersData.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredFollowers.length > 0) {
      return filteredFollowers.map((person) => (
        <div key={person.id}>
          <Link to={`/profile/${person.id}`}>
            <Friend friendData={person} />
          </Link>
          <button type="button" onClick={() => handleUnfollow(person.id)}>Remove Follower</button>
        </div>
      ));
    } else {
      return <p>No followers match your search.</p>;
    }
  };

  return (
    <div className="friends-page">
      <FriendsNav />
      <h1>Followers</h1>
      <input
        type="text"
        placeholder="Search followers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="followers-container">
        {renderFollowersList()}
      </div>
    </div>
  );
};

export default FollowingPage;

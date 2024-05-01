import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './FollowingPage.css';
import FriendsNav from './FriendsNav';
import { getUserData, removeFollowing } from '../../services/datastore.js';

const FollowingPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followingData, setFollowingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getUserData(userId);
        if (data && data.following) {
          const followingIds = Object.keys(data.following);
          const followingDetails = await Promise.all(followingIds.map((followingId) => getUserData(followingId)));
          setFollowingData(followingDetails.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching following:', error);
      }
      setLoading(false);
    };

    fetchFollowing();
  }, [userId]);

  const handleUnfollow = async (followingId) => {
    try {
      await removeFollowing(userId, followingId);
      setFollowingData((prev) => prev.filter((user) => user.id !== followingId));
    } catch (error) {
      console.error('Error unfollowing:', error);
    }
  };

  const renderFollowingList = () => {
    if (loading) return <p>Loading following...</p>;

    const filteredFollowing = followingData.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredFollowing.length > 0) {
      return filteredFollowing.map((person) => (
        <div key={person.id}>
          <Link to={`/profile/${person.id}`}>
            <Friend friendData={person} />
          </Link>
          <button type="button" onClick={() => handleUnfollow(person.id)}>Unfollow</button>
        </div>
      ));
    } else {
      return <p>No following match your search.</p>;
    }
  };

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
        {renderFollowingList()}
      </div>
    </div>
  );
};

export default FollowingPage;

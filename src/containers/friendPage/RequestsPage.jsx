import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './RequestsPage.css';
import FriendsNav from './FriendsNav';
import { getUserData, addFollowing, removeFollower } from '../../services/datastore.js';

const RequestsPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getUserData(userId);
        if (data && data.followers) {
          const followerIds = Object.keys(data.followers);
          const followingIds = data.following ? Object.keys(data.following) : [];
          const nonMutualFollowers = followerIds.filter((followerId) => !followingIds.includes(followerId));
          const requestsDetails = await Promise.all(nonMutualFollowers.map((followerId) => getUserData(followerId)));
          setRequestsData(requestsDetails.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
      setLoading(false);
    };

    fetchRequests();
  }, [userId]);

  const handleAcceptRequest = async (followerId) => {
    try {
      await addFollowing(userId, followerId);
      await removeFollower(userId, followerId);
      setRequestsData((prevRequests) => prevRequests.filter((request) => request.id !== followerId));
    } catch (error) {
      console.error('Error handling follow request:', error);
    }
  };

  const renderRequestList = () => {
    if (loading) return <p>Loading requests...</p>;

    const filteredRequests = requestsData.filter((request) => request.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredRequests.length > 0) {
      return filteredRequests.map((requestData) => (
        <div key={requestData.id}>
          <Link to={`/profile/${requestData.id}`}>
            <Friend friendData={requestData} />
          </Link>
          <button type="button" onClick={() => handleAcceptRequest(requestData.id)}>Follow Back</button>
        </div>
      ));
    } else {
      return <p>No requests match your search.</p>;
    }
  };

  return (
    <div className="friends-page">
      <FriendsNav />
      <h1>Requests</h1>
      <input
        type="text"
        placeholder="Search requests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="following-container">
        {renderRequestList()}
      </div>
    </div>
  );
};

export default RequestsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './RequestsPage.css';
import FriendsNav from './FriendsNav';
import { getUserData, addFriend, removeFriendRequest } from '../../services/datastore.js';

const RequestsPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getUserData(userId);
        if (data && data.requests && data.requests.incoming) {
          const requestIds = Object.keys(data.requests.incoming);
          const requestsDetails = await Promise.all(requestIds.map((requestId) => getUserData(requestId)));
          setRequestsData(requestsDetails.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
      setLoading(false);
    };

    fetchRequests();
  }, [userId]);

  const handleAcceptRequest = async (fromUserId) => {
    try {
      await addFriend(userId, fromUserId);
      await removeFriendRequest(fromUserId, userId);
    } catch (error) {
      console.error('Error handling friend request:', error);
    }
  };

  const handleRejectRequest = async (fromUserId) => {
    try {
      await removeFriendRequest(fromUserId, userId);
    } catch (error) {
      console.error('Error rejecting friend request:', error);
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
          <button type="button" onClick={() => handleAcceptRequest(requestData.id)}>Accept</button>
          <button type="button" onClick={() => handleRejectRequest(requestData.id)}>Reject</button>
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

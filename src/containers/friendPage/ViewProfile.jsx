import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Friend from '../../components/friend/Friend';
import Plan from '../../components/plan/Plan';
import Navbar from '../../components/navbar/Navbar.jsx';
import './ViewProfile.css';

const ViewProfile = () => {
  const history = useHistory();
  const location = useLocation();
  // const { id } = useParams();

  const friendData = location.state?.friendData || { /* default friend data */ };
  const [upvotes, setUpvotes] = useState(friendData.upvotes || 0);

  const handleBack = () => {
    history.goBack();
  };

  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
  };

  const handleDownvote = () => {
    setUpvotes((prevUpvotes) => Math.max(prevUpvotes - 1, 0));
  };

  const handleShare = () => {
  };

  const handleDuplicate = () => {
  };

  return (
    <div className="view-profile-container">
      <button type="button" onClick={handleBack}>Back</button>
      <Friend friendData={friendData} />
      {/* Ensure you pass the planData or handle its absence in the Plan component */}
      <Plan planData={friendData.planData} />
      <div className="interaction-controls">
        <button type="button" onClick={handleUpvote}>Upvote</button>
        <span className="upvotes-count">{upvotes}</span>
        <button type="button" onClick={handleDownvote}>Downvote</button>
        <button type="button" onClick={handleShare}>Share</button>
        <button type="button" onClick={handleDuplicate}>Duplicate</button>
      </div>
    </div>
  );
};

export default ViewProfile;

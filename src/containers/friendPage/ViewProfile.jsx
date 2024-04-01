import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Friend from '../../components/friend/Friend';
import Plan from '../../components/plan/Plan';
import Navbar from '../../components/navbar/Navbar.jsx';
import './ViewProfile.css';

const ViewProfile = ({ friendData }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // prev page
  };
  const [upvotes, setUpvotes] = useState(friendData.upvotes || 0);

  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
    // database update logic here
  };

  const handleDownvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes - 1);
    // database update logic here
  };

  const handleShare = () => {
    // share logic here
  };

  const handleDuplicate = () => {
    // duplicate logic here
  };

  return (
    <div className="view-profile-container">
      <Navbar />
      <button type="button" onClick={handleBack}>Back</button>
      <Friend friendData={friendData} />
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

import React, { useState } from 'react';
import Friend from './Friend';
import Plan from '../../components/plan/Plan';
import './ViewProfile.css';

const ViewProfile = ({ friendData }) => {
    const [upvotes, setUpvotes] = useState(friendData.upvotes || 0);

  const handleUpvote = () => {
    setUpvotes(prevUpvotes => prevUpvotes + 1);
    //database
  };

  const handleDownvote = () => {
    setUpvotes(prevUpvotes => prevUpvotes - 1);
    //database
  };

  const handleShare = () => {
    //get link
  };

  const handleDuplicate = () => {
    //make new plan on user profile
  };

  return (
    <div className="view-profile-container">
      <Friend {...friendData} />
      <Plan planData={friendData.planData} />
      <div className="interaction-controls">
        <button onClick={onUpvote}>Upvote</button>
        <span className="upvotes-count">{upvotes}</span>
        <button onClick={onDownvote}>Downvote</button>
        <button onClick={onShare}>Share</button>
        <button onClick={onDuplicate}>Duplicate</button>
      </div>
    </div>
  );
};

export default ViewProfile;

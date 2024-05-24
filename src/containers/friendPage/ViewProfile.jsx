import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Friend from '../../components/friend/Friend';
import Plan from '../../components/plan/Plan';
import './ViewProfile.css';

const ViewProfile = () => {
  const history = useHistory();
  const location = useLocation();
  // const { id } = useParams();

  const friendData = location.state?.friendData || { /* default friend data */ };
  const [upvotes, setUpvotes] = useState(friendData.upvotes || 0);

  useEffect(() => {
    console.log('hello is this working');
  }, []);

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
    <div className="individual-container view-profile-container">
      <button type="button" onClick={handleBack} className="back-button">Back</button>
      <div className="user-information-container">
        <Friend friendData={friendData} />
        <Plan planData={friendData.planData} className="Dplan-container" />
      </div>
      <div className="interaction-controls likes">
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

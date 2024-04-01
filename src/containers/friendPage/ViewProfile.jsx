import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Friend from './Friend';
import Plan from '../../components/plan/Plan';
import Navbar from '../../components/navbar/navbar.jsx';
import './ViewProfile.css';

import { NavLink } from 'react-router-dom';
import FriendsNav from './FriendsNav';

const ViewProfile = ({ friendData }) => {
  const { friendName } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // prev page
  };
  const [upvotes, setUpvotes] = useState(friendData.upvotes || 0);

  const handleUpvote = () => {
    setUpvotes(prevUpvotes => prevUpvotes + 1);
    //database update logic here
  };

  const handleDownvote = () => {
    setUpvotes(prevUpvotes => prevUpvotes - 1);
    //database update logic here
  };

  const handleShare = () => {
    //share logic here
  };

  const handleDuplicate = () => {
    //duplicate logic here
  };

  return (
    <div className="view-profile-container">
      <Navbar/>
      <button onClick={handleBack}>Back</button>
      <Friend {...friendData} />
      <Plan planData={friendData.planData} />
      <div className="interaction-controls">
        <button onClick={handleUpvote}>Upvote</button>
        <span className="upvotes-count">{upvotes}</span>
        <button onClick={handleDownvote}>Downvote</button>
        <button onClick={handleShare}>Share</button>
        <button onClick={handleDuplicate}>Duplicate</button>
      </div>
    </div>
  );
};

export default ViewProfile;

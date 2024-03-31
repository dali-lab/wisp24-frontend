import React from 'react';
import Plan from '../../components/plan/Plan';
import './Friend.css';

// The Friend component now expects a single prop: friendData
const Friend = ({ friendData }) => {
  const { name, major, minor, other, biography, followStatus, planData } = friendData;

  const renderFollowStatus = () => {
    switch (followStatus) {
      case 'friends':
        return 'You are friends';
      case 'requested':
        return 'Friend request sent';
      case 'following':
        return 'You are following';
      default:
        return 'Follow';
    }
  };

  return (
    <div className="friend-container">
      <div className="friend-header">
        <h1>{name}</h1>
        <div className="friend-tags">
          <span className="tag major">{major}</span>
          <span className="tag minor">{minor}</span>
          <span className="tag other">{other}</span>
        </div>
        <p className="friend-bio">{biography}</p>
        <div className="friend-status">
          <span className="follow-status">{renderFollowStatus()}</span>
        </div>
      </div>
      <Plan planData={planData} />
    </div>
  );
};

export default Friend;

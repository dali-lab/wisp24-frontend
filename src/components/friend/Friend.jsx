import React from 'react';
import Plan from '../plan/Plan';
import './Friend.css';

const Friend = ({ friendData }) => {
  const {
    name, major, minor, others, bio, followStatus, planid
  } = friendData;

  // eslint-disable-next-line no-unused-vars
  const renderPlan = () => {
    if (planid) {
      return <Plan planid={planid} />;
    }
    return null;
  };

  const renderFollowStatus = () => {
    switch (followStatus) {
      case 'friends':
        return 'Friend';
      case 'requested':
        return 'Requested';
      case 'following':
        return 'Following';
      default:
        return 'Follow';
    }
  };

  const renderOtherTags = () => {
    return others ? others.map((other, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index} className="tag other">{other}</span>
    )) : null;
  };

  return (
    <div className="friends-container-wrapper">
      <div className="friend-container">
        <div className="friends-left-side">
          <img src=" " alt="" id="friend-profile-img" />
          <p>Following</p>
        </div>
        <div className="friend-header">
          <div className="friends-right-side">
            <h1 className="username">{name}</h1>
            <div className="friend-tags">
              <span className="tag major">{major}</span>
              <span className="tag minor">{minor}</span>
              {renderOtherTags()}
            </div>
            <p className="friend-bio">{bio}</p>
            <div className="friend-status">
              <span className="follow-status">{renderFollowStatus()}</span>
            </div>
          </div>
        </div>
        {renderPlan()}
      </div>
    </div>
  );
};

export default Friend;

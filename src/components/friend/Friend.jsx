import React from 'react';
import Plan from '../plan/Plan';
import './Friend.css';

const Friend = ({ friendData }) => {
  const {
    name, major, minor, others, biography, followStatus, planData
  } = friendData;

  // eslint-disable-next-line no-unused-vars
  const renderPlan = () => {
    if (planData && Object.keys(planData).length > 0) {
      return <Plan planData={planData} />;
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
    return others.map((other) => (
      <span key={other.name} className="tag other">{other}</span>
    ));
  };

  return (
    <div className="friend-container">
      <div className="friend-header">
        <h1>{name}</h1>
        <div className="friend-tags">
          <span className="tag major">{major}</span>
          <span className="tag minor">{minor}</span>
          {renderOtherTags()}
          {/* { others.map(other => console.log(other))} */}
          {others ? console.log(others) : null}
        </div>
        <p className="friend-bio">{biography}</p>
        <div className="friend-status">
          <span className="follow-status">{renderFollowStatus()}</span>
        </div>
      </div>
      {/* <Plan planData={planData} /> */}
    </div>
  );
};

export default Friend;

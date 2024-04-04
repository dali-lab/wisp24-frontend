import React from 'react';
import Plan from '../plan/Plan';
import './Friend.css';

const Friend = ({ friendData }) => {
  const {
    name, major, minor, others, biography, followStatus, planData
  } = friendData;

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

  const renderOtherTags = () => {
    return others.map(other => (
      <span key={other.name} className="tag other">{other}</span>
    ));
  };

  return (
    <div className="friend-container">
      <div className="friend-header">
        <h1>{name}</h1>
        {/* <img src="place-holder.png"/> */}
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
      <Plan planData={planData} />
    </div>
    // <>
    // <p>{name}</p>
    // <p>{major}</p>
    // <p>{minor}</p>
    // <p>{others}</p>
    // <p>{biography}</p>
    // <p>{followStatus}</p>
    // <Plan planData={planData} />

    // </>
  );
};

export default Friend;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import { getAllDrafts, getAllFeedUsers } from '../../services/datastore';
import './feed.css';
import Post from './post';
import Filter from './feedFilter';
import Sort from './sort';

const Feed = () => {
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllFeedUsers((getPost) => {
      if (getPost) {
        const postArray = Object.keys(getPost).map((key) => ( // creates a object for each user information
          {
            id: key,
            ...getPost[key],
          }
        ));
        setUsers(postArray);
      }
    });
  }, []);

  // these handle functions below will setUsers with new updated array
  // how to do user identifcation on who is liking or disliking
  const handleLike = (id) => {
    setUsers((oldUser) => oldUser.map((user) => (user.id === id ? { ...user, likes: user.likes + 1 } : user)));
  };
  const handleDislike = (id) => {
    setUsers((oldUser) => oldUser.map((user) => (user.id === id ? { ...user, likes: user.likes - 1 } : user)));
  };
  const handleFollow = (id) => {
    setUsers((oldUser) => oldUser.map((user) => (user.id === id ? { ...user, follow: !user.follow } : user)));
  };
  return (
    <div className="feed-root">
      {/* buttons */}
      <Sort />
      {/* send information by user, once user data structure is completed */}
      <div className="post-container">
        <Post
          users={users}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleFollow={handleFollow}
        />
      </div>
      <Filter
        users={users}
      />
    </div>
  );
};
export default Feed;

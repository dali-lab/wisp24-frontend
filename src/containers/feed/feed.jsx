import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import './feed.css';
import Post from './post';
import Filter from './feedFilter';
import Sort from './sort';

const Feed = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'joyce',
      likes: 0,
      follow: false,
      caption: 'click follow and add me as friend!',
      profile: '/assets/profile.png',
      tags: ['computer science', '2027', 'wispee'],
    },
    {
      id: 2,
      name: 'john smith',
      likes: 0,
      follow: false,
      caption: 'i have a very basic name',
      profile: '/assets/profile.png',
      tags: ['math', '2024', 'government'],
    },
    {
      id: 3,
      name: 'You',
      likes: 10000,
      follow: false,
      caption: 'this is your profile',
      profile: '/assets/profile.png',
      tags: ['computer science', '2027', 'wispee'],
    }
  ]);

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

import React, { useState, useEffect } from 'react';
import Friend from '../../components/friend/Friend';
import './AddUserPage.css';
import FriendsNav from './FriendsNav';
import { fetchAllUsers } from '../../services/datastore.js';

const AddUserPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllUsers()
      .then((users) => {
        setUsersData(users);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users.');
        setLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p>Loading users...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (usersData.length > 0) {
      return usersData.map((friendData) => (
        <Friend key={friendData.id} friendData={friendData} />
      ));
    }
    return <p>No users found.</p>;
  };

  return (
    <div className="users-page">
      <FriendsNav />
      <h1>All Users</h1>
      <div className="users-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default AddUserPage;

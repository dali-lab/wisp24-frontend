import React, { useState, useEffect } from 'react';
import Friend from '../../components/friend/Friend';
import './AddUserPage.css';
import FriendsNav from './FriendsNav';
import { fetchAllUsers } from '../../services/datastore.js';

const AddUserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllUsers().then((users) => {
      setUsersData(users);
      setLoading(false);
    }).catch((err) => {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users.');
      setLoading(false);
    });
  }, []);

  const filteredUsers = usersData.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderContent = () => {
    if (loading) {
      return <p>Loading users...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (filteredUsers.length > 0) {
      return filteredUsers.map((friendData) => (
        <Friend key={friendData.id} friendData={friendData} />
      ));
    }
    return <p>No users match your search.</p>;
  };

  return (
    <div className="users-page">
      <FriendsNav />
      <h1>All Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="users-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default AddUserPage;

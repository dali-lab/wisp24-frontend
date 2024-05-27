/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Friend from '../../components/friend/Friend.jsx';
import './FriendsPage.css';
import FriendsNav from './FriendsNav';
import { getUserData } from '../../services/datastore.js';

const FriendsPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     try {
  //       const data = await getUserData(userId);
  //       if (data && data.following && data.followers) {
  //         const followingIds = Object.keys(data.following);
  //         const followerIds = Object.keys(data.followers);
  //         const mutualFriendIds = followingIds.filter((id) => followerIds.includes(id));
  //         const friendsDetails = await Promise.all(mutualFriendIds.map((friendId) => getUserData(friendId)));
  //         setFriendsData(friendsDetails.filter(Boolean));
  //       }
  //     } catch (error) {
  //       console.error('Error fetching friends:', error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchFriends();
  // }, [userId]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Simulate fetching data from a datastore
        const data = [
          {
            id: '1',
            name: 'John Doe',
            major: 'Computer Science',
            minor: 'Digital Arts',
            others: ['2027'],
            bio: 'Loves coding and digital art.',
            followStatus: 'friends',
            planid: null,
          },
          {
            id: '2',
            name: 'Jane Smith',
            major: 'Biology',
            minor: 'Chemistry',
            others: ['2027'],
            bio: 'Passionate about biology and chemistry.',
            followStatus: 'friends',
            planid: null,
          },
          {
            id: '3',
            name: 'Michael Johnson',
            major: 'Studio Art',
            minor: 'English',
            others: ['2027'],
            bio: 'Artist and writer.',
            followStatus: 'friends',
            planid: null,
          },
          {
            id: '4',
            name: 'Emily Davis',
            major: 'Math',
            minor: 'Economics',
            others: ['2026'],
            bio: 'Enjoys solving complex problems.',
            followStatus: 'friends',
            planid: null,
          },
        ];

        setFriendsData(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
      setLoading(false);
    };

    fetchFriends();
  }, [userId]);

  const renderFriendsList = () => {
    if (loading) return <p>Loading friends...</p>;

    const filteredFriends = friendsData.filter((friend) => friend.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredFriends.length > 0) {
      return filteredFriends.map((friendData) => (
        <Link key={friendData.id} to={`/profile/${friendData.id}`}>
          <Friend friendData={friendData} />
        </Link>
      ));
    } else {
      return <p>No friends match your search.</p>;
    }
  };

  return (
    <div className="friends-page">
      <FriendsNav />
      <div className="container">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="friends-container">
          {renderFriendsList()}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

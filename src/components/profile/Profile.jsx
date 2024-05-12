import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getUserData, updateUserData } from '../../services/datastore';

const Profile = ({ userId, open, handleClose }) => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((data) => {
          setProfile(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!userId) {
      console.error('No userId provided for saving profile');
      return;
    }

    try {
      await updateUserData(userId, profile);
      console.log('Profile updated successfully!');
      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container" style={{ display: open ? 'block' : 'none' }}>
      <input
        type="text"
        value={profile.name || ''}
        onChange={handleInputChange}
        name="name"
        placeholder="Name"
      />
      <input
        type="text"
        value={profile.major || ''}
        onChange={handleInputChange}
        name="major"
        placeholder="Major"
      />
      <input
        type="text"
        value={profile.minor || ''}
        onChange={handleInputChange}
        name="minor"
        placeholder="Minor"
      />
      <textarea
        value={profile.biography || ''}
        onChange={handleInputChange}
        name="biography"
        placeholder="Biography"
      />
      <button type="button" onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default Profile;

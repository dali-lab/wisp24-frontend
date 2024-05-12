import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getUserData, updateUserData } from '../../services/datastore'; // Adjust the path as necessary

const Profile = ({ userId, open, handleClose }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (userId) {
      getUserData(userId).then(setProfile).catch(console.error);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    updateUserData(userId, profile)
      .then(() => {
        console.log('Profile updated successfully!');
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        console.log('Failed to update profile.');
      });
  };

  const handleAddTag = () => {
    const newTag = profile.newTag?.trim();
    if (newTag && !profile.others?.includes(newTag)) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        others: [...(prevProfile.others || []), newTag],
        newTag: ''
      }));
    }
  };

  const handleDeleteTag = (tagIndex) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      others: prevProfile.others.filter((_, index) => index !== tagIndex)
    }));
  };

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
      {profile.others?.map((tag, index) => (
        <span key={tag} className="tag other">
          {tag} <button type="button" onClick={() => handleDeleteTag(index)}>Delete</button>
        </span>
      ))}
      <input
        type="text"
        value={profile.newTag || ''}
        onChange={handleInputChange}
        name="newTag"
        placeholder="Enter new tag"
      />
      <button type="button" onClick={handleAddTag}>Add New Tag</button>
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

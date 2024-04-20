/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ profileData, open, handleClose }) => {
  const [profile, setProfile] = useState(profileData || {});
  const [newTag, setNewTag] = useState('');

  const handleNameChange = (newName) => {
    setProfile((prevProfile) => ({ ...prevProfile, name: newName }));
  };

  const handleMajorChange = (newMajor) => {
    setProfile((prevProfile) => ({ ...prevProfile, major: newMajor }));
  };

  const handleMinorChange = (newMinor) => {
    setProfile((prevProfile) => ({ ...prevProfile, minor: newMinor }));
  };

  const handleBioChange = (newBio) => {
    setProfile((prevProfile) => ({ ...prevProfile, biography: newBio }));
  };

  const handleDeleteTag = (tagIndex) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      others: prevProfile.others.filter((_, index) => index !== tagIndex),
    }));
  };

  const renderOtherTags = () => {
    return profile.others?.map((other, index) => (
      <span key={index} className="tag other">
        {other} <button type="button" onClick={() => handleDeleteTag(index)}>Delete</button>
      </span>
    ));
  };

  const handleAddTag = () => {
    const tagToAdd = newTag.trim();
    if (tagToAdd && !profile.others?.includes(tagToAdd)) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        others: [...(prevProfile.others || []), tagToAdd],
      }));
      setNewTag('');
    }
  };

  return (
    <div className="profile-container" style={{ display: open ? 'block' : 'none' }}>
      <div className="profile-container">
        <div className="profile-header">
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Name"
          />
          <div className="profile-tags">
            <input
              type="text"
              value={profile.major}
              onChange={(e) => handleMajorChange(e.target.value)}
              placeholder="Major"
            />
            <input
              type="text"
              value={profile.minor}
              onChange={(e) => handleMinorChange(e.target.value)}
              placeholder="Minor"
            />
            {renderOtherTags()}
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter new tag"
            />
            <button type="button" onClick={handleAddTag}>Add New Tag</button>
          </div>
          <textarea
            value={profile.biography}
            onChange={(e) => handleBioChange(e.target.value)}
            placeholder="Biography"
          />
        </div>
      </div>
    </div>
  );
};
export default Profile;

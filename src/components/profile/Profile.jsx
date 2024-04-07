import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ profileData }) => {
  const [newTagText, setNewTagText] = useState('');

  const [profile, setProfile] = useState(profileData);

  const handleNameChange = (newName) => {
    setProfile((prevProfile) => ({ ...prevProfile, name: newName }));
  };

  const handleMajorChange = (newMajor) => {
    setProfile((prevProfile) => ({ ...prevProfile, major: newMajor }));
  };

  const handleMinorChange = (newMinor) => {
    setProfile((prevProfile) => ({ ...prevProfile, minor: newMinor }));
  };

  const handleAddTag = (newTag) => {
    setProfile((prevProfile) => ({ ...prevProfile, others: [...prevProfile.others, newTag] }));
  };

  const handleDeleteTag = (tagIndex) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      others: prevProfile.others.filter((_, index) => index !== tagIndex)
    }));
  };

  const handleBioChange = (newBio) => {
    setProfile((prevProfile) => ({ ...prevProfile, biography: newBio }));
  };

  const renderOtherTags = () => {
    return profile.others.map((other, index) => (
      <span key={index} className="tag other">
        {other} <button onClick={() => handleDeleteTag(index)}>Delete</button>
      </span>
    ));
  };

  return (
    <div className="friend-container">
      <div className="friend-header">
        <input 
          type="text"
          value={profile.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Name"
        />
        <div className="friend-tags">
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
          <button onClick={() => handleAddTag('New Tag')}>Add New Tag</button>
        </div>
        <textarea 
          value={profile.biography}
          onChange={(e) => handleBioChange(e.target.value)}
          placeholder="Biography"
        />
      </div>
    </div>
  );
};

export default Profile;

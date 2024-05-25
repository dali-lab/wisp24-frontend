/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { ChromePicker } from 'react-color';
import { getUserData, updateUserData } from '../../services/datastore'; // Adjust the path as necessary

const Profile = ({ userId, open, handleClose }) => {
  const [profile, setProfile] = useState({});
  const [color0, setColor0] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [editColorIdx, setEditColorIdx] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editUsername, setEditUsername] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserData(userId).then(setProfile).catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    document.documentElement.style.setProperty('--color0', color0);
    document.documentElement.style.setProperty('--color1', color1);
    document.documentElement.style.setProperty('--color2', color2);
  }, [color0, color1, color2]);

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

  const handleEditColorIdx = (idx) => {
    setEditColorIdx(idx);
  };

  const handleDeleteTag = (tagIndex) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      others: prevProfile.others.filter((_, index) => index !== tagIndex)
    }));
  };
  const handleUsername = () => {
    // update username on the data base
    setEditUsername(false);
  };

  return (
    <div className="profile-container" style={{ display: open ? 'block' : 'none' }}>
      <div className="top-user-wrapper">
        <img src="/assets/profile2.png" alt="profile_img" id="user-profile" />
        <p>First Name Last Name</p>
        {editUsername
          ? (
            <div className="individual-input">
              <input
                type="text"
                value={profile.name || ''}
                onChange={handleInputChange}
                name="username"
                placeholder="username"
              />
              <button type="button" onClick={handleUsername}><img src="/assets/check.png" alt="save-edit" id="profile-edit-btn" /></button>
            </div>
          )

          : (
            <div className="username-display">
              <p>@Username</p>
              <button type="button" onClick={() => setEditUsername(true)}><img src="/assets/edit.png" alt="make-edit" id="profile-edit-btn" /></button>
            </div>
          )}

      </div>
      <div className="input-containers">
        <div className="individual-input">
          <p>major: </p>
          <input
            type="text"
            value={profile.major || ''}
            onChange={handleInputChange}
            name="major"
            placeholder="Major"
            id="tags-input-box"
          />
        </div>
        <div className="individual-input">
          <p>minor: </p>
          <input
            type="text"
            value={profile.minor || ''}
            onChange={handleInputChange}
            name="minor"
            placeholder="Minor"
            id="tags-input-box"
          />
        </div>
        {profile.others?.map((tag, index) => (
          <span key={tag} className="tag other">
            {tag} <button type="button" onClick={() => handleDeleteTag(index)}>Delete</button>
          </span>
        ))}
        <div className="individual-input">
          <p>other: </p>
          <input
            type="text"
            value={profile.newTag || ''}
            onChange={handleInputChange}
            name="newTag"
            placeholder="Enter new tag"
            id="tags-input-box"
          />
        </div>
      </div>
      {/* <button type="button" onClick={handleAddTag}>Add New Tag</button> */}
      <div className="bio-container">
        <p>Biography</p>
        <textarea
          value={profile.biography || ''}
          onChange={handleInputChange}
          name="biography"
          placeholder="Biography"
          id="biography-input-box"
        />
      </div>
      <div className="color-picker-container">
        {editColorIdx !== 0 ? (
          <div className="color-all" type="button" onClick={() => handleEditColorIdx(0)}><div className="color-sample0">color1</div>
          </div>
        ) : <ChromePicker color={color0} onChange={(color) => setColor0(color.hex)} />}
        {editColorIdx !== 1 ? (
          <div className="color-all" type="button" onClick={() => handleEditColorIdx(1)}><div className="color-sample1">color2</div>
          </div>
        ) : <ChromePicker color={color1} onChange={(color) => setColor1(color.hex)} />}
        {editColorIdx !== 2 ? (
          <div className="color-all" type="button" onClick={() => handleEditColorIdx(2)}><div className="color-sample2">color3</div>
          </div>
        ) : <ChromePicker color={color2} onChange={(color) => setColor2(color.hex)} />}
      </div>
      <button type="button" onClick={handleSaveProfile}>Save Profile</button>
      <div>
        <button type="button">sign out</button>
      </div>
    </div>
  );
};

export default Profile;

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

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then(setProfile)
        .catch(console.error);
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

  const handleEditColorIdx = (idx) => {
    setEditColorIdx(idx);
  };

  const handleDeleteTag = (tagIndex) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      others: prevProfile.others.filter((_, index) => index !== tagIndex)
    }));
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
      <div className="color-picker-container">
        {editColorIdx !== 0 ? (
          <div
            className="color-all"
            role="button"
            tabIndex="0"
            type="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditColorIdx(0);
              }
            }}
            onClick={() => handleEditColorIdx(0)}
          ><div className="color-sample0">color1</div>
          </div>
        ) : <ChromePicker color={color0} onChange={(color) => setColor0(color.hex)} />}
        {editColorIdx !== 1 ? (
          <div role="button"
            tabIndex="0"
            type="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditColorIdx(0);
              }
            }}
            className="color-all"
            onClick={() => handleEditColorIdx(1)}
          ><div className="color-sample1">color2</div>
          </div>
        ) : <ChromePicker color={color1} onChange={(color) => setColor1(color.hex)} />}
        {editColorIdx !== 2 ? (
          <div className="color-all"
            role="button"
            tabIndex="0"
            type="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditColorIdx(0);
              }
            }}
            onClick={() => handleEditColorIdx(2)}
          ><div className="color-sample2">color3</div>
          </div>
        ) : <ChromePicker color={color2} onChange={(color) => setColor2(color.hex)} />}
      </div>
    </div>
  );
};

export default Profile;

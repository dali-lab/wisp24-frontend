import React, { useState, useRef } from 'react';
import './Homepage.css';

const ProgressTracker = () => {
  const [track, setTrack] = useState([]);
  const [editingState, setEditingState] = useState(false);
  const inputValue = useRef();

  const handleEditClick = () => {
    setEditingState(!editingState);
  };

  const handleSubmit = () => {
    if (!editingState) return;
    const inputValueTrimmed = inputValue.current.value.trim();
    if (inputValueTrimmed !== '') {
      setEditingState(!editingState);
    }
    if (track.length < 3) {
      setTrack((prevTrack) => [...prevTrack, inputValueTrimmed]);
      setEditingState(!editingState);
      inputValue.current.value = '';
    }
  };

  // const TrackInput = () => {
  //   if (editingState) {
  //     return (
  //       <div className="major-editing-container">
  //         <input type="text" ref={inputValue} />
  //         <button type="button" onClick={handleSubmit}>Save</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <button className="major-edit-toggle" type="button" onClick={handleEditClick}>Choose Major/Minor</button>
  //     );
  //   }
  // };

  const DropdownMenu = () => {
    const [major, setMajor] = useState('');
    const handleClickMajor = (event) => {
      setMajor(event.target.value);
    };

    return (
      <div className="major-edit-toggle ">
        <select id="dropdown" value={major} onChange={handleClickMajor}>
          <option value="">Choose your major</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    );
  };

  const Tracker = () => {
    const tracks = track.map((trackItem) => {
      return (
        <div key={trackItem}>
          {trackItem}
        </div>
      );
    });
    return tracks;
  };

  return (
    <div className="progressTracker-container">
      <DropdownMenu />
      <Tracker />
    </div>
  );
};

export default ProgressTracker;

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { SliderPicker, BlockPicker, ChromePicker } from 'react-color';
import './Homepage.css';

const ProgressTracker = () => {
  const [track, setTrack] = useState([]);
  const [editingState, setEditingState] = useState(false);
  const inputValue = useRef();
  const [track0, setTrack0] = useState('');
  const [track1, setTrack1] = useState('');
  const [track2, setTrack2] = useState('');
  const [editColorIdx, setEditColorIdx] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--track0', track0);
    document.documentElement.style.setProperty('--track1', track1);
    document.documentElement.style.setProperty('--track2', track2);
  }, [track0, track1, track2]);

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

  const handleEditColorIdx = (idx) => {
    setEditColorIdx(idx);
  };

  const TrackInput = () => {
    if (editingState) {
      return (
        <div className="major-editing-container">
          <input type="text" ref={inputValue} />
          <button type="button" onClick={handleSubmit}>Save</button>
        </div>
      );
    } else {
      return (
        <button className="major-edit-toggle" type="button" onClick={handleEditClick}>Choose Major/Minor</button>
      );
    }
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

  const ColorPicker = () => {
    return (
      <div className="color-picker-container2">
        {editColorIdx !== 0 ? (
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleEditColorIdx(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditColorIdx(0);
              }
            }}
            className="color-all2 track0"
          >
            <div className="track-sample0">color1</div>
          </div>
        ) : (
          <div className="color-all2  track0"><ChromePicker className="track-color-picker" color={track0} onChange={(color) => setTrack0(color.hex)} />
            <button
              type="button"
              tabIndex="0"
              className="track-button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEditColorIdx(0);
                }
              }}
              onClick={() => handleEditColorIdx(null)}
            >x
            </button>
          </div>
        )}
        {editColorIdx !== 1 ? (
          <div role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditColorIdx(0);
              }
            }}
            className="color-all2 track1"
            type="button"
            onClick={() => handleEditColorIdx(1)}
          ><div className="track-sample1">color2</div>
          </div>
        ) : (
          <div className="color-all2 track1"><ChromePicker className="track-color-picker" color={track1} onChange={(color) => setTrack1(color.hex)} />
            <button type="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEditColorIdx(0);
                }
              }}
              className="track-button"
              onClick={() => handleEditColorIdx(null)}
            >x
            </button>
          </div>
        )}
        {editColorIdx !== 2 ? (
          <div role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditColorIdx(2);
              }
            }}
            className="color-all2 track2"
            type="button"
            onClick={() => handleEditColorIdx(2)}
          ><div className="track-sample2">color3</div>
          </div>
        ) : (
          <div className="color-all2 track2"><ChromePicker className="track-color-picker" color={track2} onChange={(color) => setTrack2(color.hex)} />
            <button type="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEditColorIdx(0);
                }
              }}
              className="track-button"
              onClick={() => handleEditColorIdx(null)}
            >x
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="progressTracker-container">
      <ColorPicker />
      <TrackInput />
      <Tracker />
    </div>
  );
};

export default ProgressTracker;

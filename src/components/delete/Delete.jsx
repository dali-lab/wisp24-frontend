import React from 'react';
import './Delete.css';

const Delete = (props) => {
  const deleteDraft = () => {
    props.deleteDraft();
    props.togglePopup();
  };

  const togglePopup = () => {
    props.togglePopup();
  };

  return (
    <div className="delete-popup">
      <button id="delete-popup-close" onClick={togglePopup} type="button">X</button>
      <div>Do you really want to delete this term?</div>
      <div className="delete-popup-btn">
        <button id="draft-delete-yes" onClick={deleteDraft} type="button">yes</button>
        <button id="draft-delete-no" onClick={togglePopup} type="button">no</button>
      </div>
    </div>
  );
};

export default Delete;

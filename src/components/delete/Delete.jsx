import React from 'react';

const Delete = (props) => {
  const deleteDraft = () => {
    props.deleteDraft();
    props.togglePopup();
  };

  const togglePopup = () => {
    props.togglePopup();
  };

  return (
    <div>
      <button onClick={togglePopup} type="button">X</button>
      <div>Do you really want to delete this term?</div>
      <div>
        <button onClick={deleteDraft} type="button">yes</button>
        <button onClick={togglePopup} type="button">no</button>
      </div>
    </div>
  );
};

export default Delete;

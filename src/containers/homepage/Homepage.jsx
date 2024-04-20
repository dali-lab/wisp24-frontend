import React, { useEffect, useState, useRef } from 'react';
import Plan from '../../components/plan/Plan.jsx';
import PotentialClass from './PotentialClass.jsx';
import AddTerms from './AddTerms.jsx';
import './Homepage.css'
import ProgressTracker from './ProgressTracker.jsx';

const Homepage = () => {
  const [mainDrafts, setMainDrafts] = useState([
    {
      draftTitle: 'maindraft1',
    }
  ]);
  const inputRef = useRef();
  const [editingIndex, setEditingIndex] = useState("");
  const [mainDraftIndex, setMainDraftIndex] = useState(0);
  const [editStatus, setEditStatus] = useState(true);
  const addDraft = (event) => {
    event.preventDefault();
    setMainDrafts([...mainDrafts, { draftTitle: `maindraft${mainDrafts.length + 1}`, isMain: false }]);
  };

  const selectMainDraft = (index) => {
    setMainDraftIndex(index);
  }

  const deleteDraft = (index) => {
    if (mainDrafts.length > 1) {
      if (editingIndex === index) {
        setEditingIndex("")
      }
      const updatedDrafts = mainDrafts.filter((draft, i) => i !== index);
      setMainDrafts(updatedDrafts)
    }
  }

  const editDraft = (index) => {
    setEditingIndex(index);
  }

  const startEdit = (index) => {
    setEditingIndex(index)
  }

  const titleChangeSubmit = (index) => {
    if (inputRef.current.value.length === 0) {return}
    const updatedDrafts = mainDrafts.map((mainDraft, i) => {
      if (index == i) {
        return {draftTitle: inputRef.current.value}
      } else {
        return mainDraft
      }
    })
    setMainDrafts(updatedDrafts);
    console.log(updatedDrafts);
    setEditingIndex("");
  }

  const MainDraftTab = () => {
    return (
      <div className="tab-container">
        {mainDrafts.map((mainDraft, index) => {
          return (
            <div onClick={() => selectMainDraft(index)} className={`tab-list ${index === mainDraftIndex ? "selectedDraft" : "nonselectedDraft"}`} key={index}>
              <div>{editingIndex === index ? <input type="text" ref={inputRef}></input> : mainDraft.draftTitle}</div>
              {editingIndex === index ? <button onClick={() => titleChangeSubmit(index)}>Submit</button> : <button onClick={() => startEdit(index)}>Edit</button>}
              <button onClick={() => deleteDraft(index)}>Delete</button>
            </div>
          );
        })}
        <button className="add-tab-button" onClick={addDraft}>Add Draft</button>
      </div>
    );
  };

  return (
    <div className="homepage-main-container">
      <div className="homepage-left-container">
        <MainDraftTab />
        <div className="plan-container">
          <ProgressTracker />
          <Plan editStatus={editStatus}/>
        </div>
      </div>
      <div className="homepage-right-container">
        <PotentialClass />
        <AddTerms />
      </div>
    </div>
  );
};

export default Homepage;

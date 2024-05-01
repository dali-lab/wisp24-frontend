import React, { useEffect, useState, useRef } from 'react';
import Plan23 from '../../components/plan2/plan23.jsx';
import PotentialClass from './PotentialClass.jsx';
import AddTerms from './AddTerms.jsx';
import './Homepage.css';
import ProgressTracker from './ProgressTracker.jsx';
import {
  getAllDrafts, addNewDraft, delDraft, updateDraft, updateDraftTerm
} from '../../services/datastore.js';

const Homepage = () => {
  const [mainDrafts, setMainDrafts] = useState(null);
  const inputRef = useRef();
  const [editingIndex, setEditingIndex] = useState('');
  const [mainDraftIndex, setMainDraftIndex] = useState(0);

  useEffect(() => {
    getAllDrafts((draftsList) => {
      if (!draftsList) {
        setMainDrafts([]);
        console.log('hey1');
      } else {
        const draftsArray = Object.keys(draftsList).map((key) => ( // return the array of the cart items
          {
            id: key,
            ...draftsList[key]
          }
        ));
        setMainDrafts(draftsArray);
      }
    });
  }, [getAllDrafts]);
  console.log(mainDrafts);

  const addDraft = () => {
    /* event.preventDefault();
    setMainDrafts([...mainDrafts, { draftTitle: `maindraft${mainDrafts.length + 1}`}]); */
    addNewDraft(`maindraft${mainDrafts.length + 1}`, []);
  };

  const selectMainDraft = (id) => {
    setMainDraftIndex(id);
  };

  const deleteDraft = (id) => {
    delDraft(id);
  };

  const editDraft = (index) => {
    setEditingIndex(index);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
  };

  const titleChangeSubmit = (id) => {
    if (inputRef.current.value.length === 0) { return; }
    /* const updatedDrafts = mainDrafts.map((mainDraft, i) => {
      if (index == i) {
        return { draftTitle: inputRef.current.value };
      } else {
        return mainDraft;
      }
    });
    setMainDrafts(updatedDrafts);
    console.log(updatedDrafts); */
    updateDraft(id, inputRef.current.value);
    setEditingIndex('');
  };

  const MainDraftTab = () => {
    console.log(mainDrafts);
    return (
      <div className="tab-container">
        {mainDrafts && Array.isArray(mainDrafts) && mainDrafts.map((mainDraft) => {
          return (
            <div role="button"
              tabIndex={0}
              onClick={() => selectMainDraft(mainDraft.id)}
              className={`tab-list ${mainDraft.id === mainDraftIndex ? 'selectedDraft'
                : 'nonselectedDraft'}`}
              key={mainDraft.id}
            >
              <div>{editingIndex === mainDraft.id ? <input type="text" ref={inputRef} /> : mainDraft.name}</div>
              {editingIndex === mainDraft.id ? <button type="button" onClick={() => titleChangeSubmit(mainDraft.id)}>Submit</button>
                : <button type="button" onClick={() => startEdit(mainDraft.id)}>Edit</button>}
              <button type="button" onClick={() => deleteDraft(mainDraft.id)}>Delete</button>
            </div>
          );
        })}
        <button type="button" className="add-tab-button" onClick={addDraft}>Add Draft</button>
      </div>
    );
  };

  return (
    <div className="homepage-main-container">
      <div className="homepage-left-container">
        <MainDraftTab />
        <div className="plan-container">
          <ProgressTracker />
          <Plan23 />
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

import React, { useEffect, useState, useRef } from 'react';
import Plan2 from '../../components/plan2/Plan2.jsx';
import PotentialClass from './PotentialClass.jsx';
import AddTerms from './AddTerms.jsx';
import Delete from '../../components/delete/Delete.jsx';
import './Homepage.css';
// import ProgressTracker from './ProgressTracker.jsx';
import {
  getAllDrafts, addNewDraft, delDraft, updateDraft, updateUserData
} from '../../services/datastore.js';

const Homepage = ({ userID }) => {
  const [mainDrafts, setMainDrafts] = useState(null);
  const inputRef = useRef();
  const [editingIndex, setEditingIndex] = useState('');
  const [mainDraftIndex, setMainDraftIndex] = useState(0);
  const [popup, setPopup] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState('');

  useEffect(() => {
    getAllDrafts((draftsList) => {
      if (!draftsList) {
        setMainDrafts([]);
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

  useEffect(() => {
    if (mainDrafts) {
      if (mainDraftIndex === 0) {
        if (mainDrafts[0] && mainDrafts[0].id) {
          setMainDraftIndex(mainDrafts[0].id);
        }
      }
    }
  }, [mainDrafts]);

  const addDraft = () => {
    if (mainDrafts.length < 4) {
      addNewDraft(`maindraft${mainDrafts.length + 1}`);
    } else {
      alert('maximum number of drafts');
    }
  };

  const selectMainDraft = (id) => {
    setMainDraftIndex(id);
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const deleteDraft = () => {
    if (deletingIndex === mainDraftIndex) {
      const otherDraftIndex = (mainDraftIndex === 0) ? 1 : 0; // For example, select the first draft as an alternative
      setMainDraftIndex(otherDraftIndex);
    }
    delDraft(deletingIndex);
  };

  const goToDelete = (id) => {
    togglePopup();
    setDeletingIndex(id);
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
              <div className="tab-name">{editingIndex === mainDraft.id ? <input type="text" ref={inputRef} /> : mainDraft.name}</div>
              {editingIndex === mainDraft.id ? <button type="button" onClick={() => titleChangeSubmit(mainDraft.id)}>Submit</button>
                : <button type="button" onClick={() => startEdit(mainDraft.id)}>Edit</button>}
              <button type="button" onClick={() => goToDelete(mainDraft.id)}>Delete</button>
            </div>
          );
        })}
        <button type="button" className="add-tab-button" onClick={addDraft}>Add Draft</button>
      </div>
    );
  };

  const DropdownMenu = () => {
    console.log(userID);
    const [inputMajor, setMajor] = useState('');

    const handleClickMajor = (event) => {
      const newMajor = event.target.value;
      setMajor(event.target.value);
      updateUserData(userID, {
        name: 'Ellie', year: 2027, major: newMajor, minor: 'comp sci', netid: 1, bio: 'hello', planid: 1
      });
      updateUserData(userID, inputMajor);
    };

    return (
      <div className="major-edit-toggle">
        <select id="dropdown" value={inputMajor} onChange={handleClickMajor}>
          <option value="">Choose your major</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    );
  };

  return (
    <div className="homepage-main-container">
      {popup && <Delete togglePopup={togglePopup} deleteDraft={deleteDraft} />}
      <div className="homepage-left-container">
        <MainDraftTab />
        <div className="plan-container2">
          <DropdownMenu />
          {/* <ProgressTracker /> */}
          <Plan2 mainDrafts={mainDrafts} mainDraftIndex={mainDraftIndex} />
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

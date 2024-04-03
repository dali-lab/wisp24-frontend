import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';
import Plan from '../../components/plan/Plan.jsx';
import PotentialClass from './PotentialClass.jsx';
import AddTerms from './AddTerms.jsx';
import './Homepage.css'

const Homepage = () => {
  const [mainDrafts, setMainDrafts] = useState([
    {
      draftTitle: 'maindraft1',
      isMain: true,
    }
  ]);
  const inputRef = useRef();
  const [editingIndex, setEditingIndex] = useState("");

  const addDraft = (event) => {
    event.preventDefault();
    setMainDrafts([...mainDrafts, { draftTitle: `maindraft${mainDrafts.length + 1}`, isMain: false }]);
  };

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
    console.log(updatedDrafts)
    setEditingIndex("")
  }

  const MainDraftTab = () => {
    return (
      <div className="tab-container">
        {mainDrafts.map((mainDraft, index) => {
          return (
            <div key={index}>
              <div>{editingIndex === index ? <input type="text" ref={inputRef}></input> : mainDraft.draftTitle}</div>
              {editingIndex === index ? <button onClick={() => titleChangeSubmit(index)}>Submit</button> : <button onClick={() => startEdit(index)}>Edit</button>}
              <button onClick={() => deleteDraft(index)}>Delete</button>
            </div>
          );
        })}
        <button onClick={addDraft}>Add Draft</button>
      </div>
    );
  };

  return (
    <div>

      <MainDraftTab />
      <Plan />
      <PotentialClass />
      <AddTerms />
    </div>
  );
};

export default Homepage;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import EditingDraft from './EditingTerm.jsx';
import './Homepage.css';
import {
  updateTerm, getAllTerm, addTerm, deleteTerm
} from '../../services/datastore.js';

const AddTerms = () => {
  const [selectedDraft, setSelectedDraft] = useState('');
  const [drafts, setDrafts] = useState([
    {
      id: 0,
      draftName: 'draft1',
      classList: ['class1', 'class2'],
    }
  ]);

  // fetches user terms from data base
  useEffect(() => {
    getAllTerm((getTerms) => {
      if (getTerms) {
        const terms = Object.keys(getTerms).map((key) => ({ // returns the object: drafts
          id: key, // draft id
          ...getTerms[key]
        }));
        setDrafts(terms);
      } else {
        setDrafts([]);
      }
    });
  }, []);
  console.log(drafts);

  const handleClick = (event) => {
    event.preventDefault();
    setSelectedDraft(-1); // initialize new draft
  };

  const handleSelectedDraft = (index) => {
    setSelectedDraft(index);
    console.log('ID of selected draft:', index);
  };

  const changeTermName = (newName) => {
    const updatedDrafts = drafts.map((draft, index) => {
      if (selectedDraft === index) {
        return (
          { ...draft, draftName: newName }
        );
      } else {
        return draft;
      }
    });
    setDrafts(updatedDrafts);
  };

  const termSubmit = (index, input) => {
    console.log('inputs:', input);
    if (index !== -1) {
      const term = drafts[index];
      updateTerm(term.id, {
        ...term,
        ...input
      });
    } else {
      const i = drafts.length + 1;
      addTerm(i, {
        ...input // copy input
      });
    }
  };
  const deleteDraft = (event, index) => {
    event.stopPropagation();
    deleteTerm(index);
  };

  // const termSubmit = (index, input) => {
  //   let updatedDrafts;
  //   // updateDraft(index, input);
  //   if (index !== -1) {
  //     updatedDrafts = drafts.map((draftItem, i) => {
  //       if (i === index) {
  //         return input;
  //       } else {
  //         // addTerm(NULL,input, index);
  //         console.log(input);
  //         return draftItem;
  //       }
  //     });
  //   } else {
  //     updatedDrafts = [...drafts, input];
  //   }
  //   setDrafts(updatedDrafts);
  // };

  const AllDrafts = () => {
    const alldrafts = drafts.map((draft, index) => {
      return (
        <div className="term-draft" tabIndex={0} role="button" key={draft.newName}>
          <div className="term-draft-content-container">
            <div className="term-draft-content-container-name-specific" tabIndex={0} role="button" onClick={() => handleSelectedDraft(index)}>
              <div className="term-draft-button-container"><button type="button" onClick={(event) => deleteDraft(event, draft.id)}>Delete</button></div>
              <div className="term-draft-name">{draft.draftName}</div>
            </div>
            <div className="term-draft-class-container" tabIndex={0} role="button" onClick={() => handleSelectedDraft(index)}>
              {draft.classList && draft.classList.map((draftItem) => {
                return (
                  <div key={draftItem} className="term-draft-class-wrapper"><div className="term-draft-class">{draftItem}</div></div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
    return alldrafts;
  };

  return (
    <div className="add-terms">
      <div className="term-draft-content-container-name">Add Terms</div>
      <div className="term-draft-container">
        {selectedDraft !== '' ? <EditingDraft handleSelectedDraft={handleSelectedDraft} drafts={drafts} selectedDraft={selectedDraft} termSubmit={termSubmit} changeTermName={changeTermName} />
          : (
            <>
              <div role="button" tabIndex={0} onClick={handleClick} className="term-draft-button"><p>Add Draft</p></div>
              <AllDrafts />
            </>
          )}
      </div>
    </div>
  );
};

export default AddTerms;

import React, { useState } from 'react';
import EditingDraft from './EditingTerm.jsx';
import './Homepage.css';

const AddTerms = () => {
  const [selectedDraft, setSelectedDraft] = useState('');
  const [drafts, setDrafts] = useState([
    {
      draftName: 'draft1',
      classList: ['class1', 'class2'],
    }
  ]);

  // useEffect(()=>{

  // })
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
    let updatedDrafts;
    if (index !== -1) {
      updatedDrafts = drafts.map((draftItem, i) => {
        if (i === index) {
          return input;
        } else {
          return draftItem;
        }
      });
    } else {
      updatedDrafts = [...drafts, input];
    }
    setDrafts(updatedDrafts);
  };

  const AllDrafts = () => {
    const alldrafts = drafts.map((draft, index) => {
      return (
        <div className="term-draft" tabIndex={0} role="button" key={draft.draftName}>
          <div className="term-draft-content-container">
            <div className="term-draft-content-container-name-specific" tabIndex={0} role="button" onClick={() => handleSelectedDraft(index)}>
              <div className="term-draft-button-container"><button type="submit">Delete</button></div>
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

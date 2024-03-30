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

  const handleClick = (event) => {
    event.preventDefault();
    setSelectedDraft(-1);
  };

  const handleSelectedDraft = (index) => {
    setSelectedDraft(index);
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
        <div className="term-draft" tabIndex={0} role="button" key={draft.draftName} onClick={() => handleSelectedDraft(index)}>
          <p>{draft.draftName}</p>
          <div>
            {draft.classList && draft.classList.map((draftItem) => {
              return (
                <p key={draftItem}>{draftItem}</p>
              );
            })}
          </div>
        </div>
      );
    });
    return (
      <div>{alldrafts}</div>
    );
  };

  return (
    <div className="add-terms">
      <p>Add Terms</p>
      <button type="button" onClick={handleClick}>Add Draft</button>
      {selectedDraft !== '' ? <EditingDraft handleSelectedDraft={handleSelectedDraft} drafts={drafts} selectedDraft={selectedDraft} termSubmit={termSubmit} changeTermName={changeTermName} />
        : <AllDrafts />}
    </div>
  );
};

export default AddTerms;

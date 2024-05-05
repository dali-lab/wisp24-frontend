/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import EditingDraft from './EditingTerm.jsx';
import './Homepage.css';
import {
  updateTermName, getAllTerm, addTerm, deleteTerm,
  updateCourse,
  addNewCourse
} from '../../services/datastore.js';

const AddTerms = () => {
  const [selectedDraft, setSelectedDraft] = useState('');
  const [terms, setTerms] = useState([]); // list of terms
  const [newId, setNewId] = useState(); // Add new term with details from termData
  console.log('term', terms);

  // fetches user terms from data base
  useEffect(() => {
    getAllTerm((getTerms) => {
      if (getTerms) {
        console.log(getTerms);
        const termsList = Object.keys(getTerms).map((termKey) => {
          const termData = getTerms[termKey];
          const coursesData = Object.keys(termData.courses).map((coursesID) => ({ // map through objects held by course
            id: coursesID,
            ...termData.courses[coursesID]
          }));
          return { // will term to the term course data
            id: termKey,
            termName: termData.termName,
            courses: coursesData // list of courses
          };
        });
        console.log('termlist:', termsList);
        setTerms(termsList);
      } else {
        setTerms([]);
      }
    });
  }, []);
  console.log(terms);

  const handleClick = (event) => { // for new terms
    event.preventDefault();
    setSelectedDraft(-1);
  };

  const handleSelectedDraft = (termID) => { // for existing terms
    setSelectedDraft(termID);
    console.log('ID of selected Term', termID);
  };

  const changeTermName = (newName) => {
    const updatedDrafts = terms.map((draft, index) => {
      if (selectedDraft.termName === draft.name) {
        return (
          { ...draft, draftName: newName }
        );
      } else {
        return draft;
      }
    });
    setTerms(updatedDrafts);
    updateTermName(selectedDraft.id, newName);
  };

  const termSubmit = (index, termData) => { // index curr string, need pass in id
    console.log('termDatas:', termData);
    if (termData.id !== '') {
      const term = terms[index];
      updateTermName(term.id, termData.termName); // Assuming `input.draftName` contains the new name
      updateCourse(term.id, term.courses);
    } else {
      addTerm(termData, (termId) => {
        if (termId) {
          const key = termId.id;
          setNewId(key);
          console.log(key);
        }
      }).then(
        console.log('new termid:', newId)
        ((termData.courses).forEach((course) => {
          addNewCourse(newId, course);
          console.log('new termid:', newId);
        }))
      );
    }
  };

  const deleteDraft = (event, termID) => {
    event.stopPropagation();
    deleteTerm(termID);
  };

  const AllDrafts = () => {
    const alldrafts = terms.map((term, index) => {
      return (
        <div className="term-draft" tabIndex={0} role="button" key={term.termName}>
          <div className="term-draft-content-container">
            <div className="term-draft-content-container-name-specific" tabIndex={0} role="button" onClick={() => handleSelectedDraft(term.id)}>
              <div className="term-draft-button-container"><button type="button" onClick={(event) => deleteDraft(event, term.id)}>Delete</button></div>
              <div className="term-draft-name">{term.termName}</div>
            </div>
            <div className="term-draft-class-container" tabIndex={0} role="button" onClick={() => handleSelectedDraft(index)}>
              {term.courses && term.courses.map((course) => {
                return (
                  <div key={course.id} className="term-draft-class-wrapper">
                    <div className="term-draft-class">{course.name}</div>
                  </div>
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
        {selectedDraft !== '' ? <EditingDraft handleSelectedDraft={handleSelectedDraft} drafts={terms} selectedDraft={selectedDraft} termSubmit={termSubmit} changeTermName={changeTermName} />
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

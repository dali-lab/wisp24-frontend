/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditingDraft from './EditingTerm.jsx';
import './Homepage.css';
import {
  updateTermName, getAllTerm, addTermToDraft, deleteTerm,
  updateCourse, addTerm,
  addNewCourse
} from '../../services/datastore.js';

const AddTerms = () => {
  const [selectedDraft, setSelectedDraft] = useState('');
  const [terms, setTerms] = useState([]); // list of terms

  const deleteDraft = (event, termID) => {
    event.stopPropagation();
    deleteTerm(termID);
  };

  const handleSelectedDraft = (termID) => { // for existing terms
    setSelectedDraft(termID);
    console.log('ID of selected Term', termID);
  };

  // fetches user terms from data base
  useEffect(() => {
    getAllTerm((getTerms) => {
      if (getTerms) {
        const termsList = Object.keys(getTerms).map((termKey) => {
          const termData = getTerms[termKey];
          const coursesData = termData.courses ? Object.keys(termData.courses).map((courseID) => ({
            id: courseID,
            ...termData.courses[courseID]
          })) : [];
          return {
            id: termKey,
            termName: termData.termName,
            courses: coursesData // list of courses
          };
        });
        setTerms(termsList);
      } else {
        setTerms([]);
      }
    });
  }, []);

  const Draft = ({ term, onDelete }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'TERM', // Define the drag type
      item: {
        type: 'TERM', termId: term.id, term, inPlan: false
      }, // Pass the term data in the item
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    console.log('Rendering Draft:', term);

    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="term-draft"
      >
        <div className="term-name-wrapper">{term.termName}</div>
        <div className="term-draft-class-container" tabIndex={0} role="button" onClick={() => handleSelectedDraft(term.id)}>
          {term.courses && Object.entries(term.courses).map(([courseId, course]) => (
            <div key={courseId} className="term-draft-class-wrapper">
              <div className="term-draft-class">{course.name.label}</div>
            </div>
          ))}
        </div>
        <div className="button-holder-add-term">
          <button type="button" onClick={(event) => deleteDraft(event, term.id)}>Delete</button>
        </div>
      </div>
    );
  };

  const handleClick = (event) => { // for new terms
    event.preventDefault();
    addTerm({
      termName: '',
      courses: {},
    }, (termId) => {
      if (termId) {
        console.log('termid:', termId);
        setSelectedDraft(termId);
        console.log('selected draft id', selectedDraft);
      }
    });
  };

  // const changeTermName = (newName) => {
  //   const updatedDrafts = terms.map((draft, index) => {
  //     if (selectedDraft.termName === draft.name) {
  //       return (
  //         { ...draft, draftName: newName };
  //       );
  //     } else {
  //       return draft;
  //     }
  //   });
  //   setTerms(updatedDrafts);
  //   updateTermName(selectedDraft.id, newName);
  // };

  const changeTermName = (newName) => {
    const updatedDrafts = terms.map((draft) => {
      if (selectedDraft === draft.id) {
        return { ...draft, termName: newName };
      } else {
        return draft;
      }
    });
    setTerms(updatedDrafts);
    updateTermName(selectedDraft, newName);
  };

  const termSubmit = (selected, termData) => {
    console.log('termDatas:', termData);
    console.log('selected termsubmit:', selected);

    const updatedDrafts = terms.map((draft) => {
      if (selected === draft.id) {
        return {
          ...draft,
          termName: termData.termName,
          courses: termData.courses
        };
      }
      return draft;
    });
    setTerms(updatedDrafts);
    // updateTermName(selectedDraft, termData.termName);
    setSelectedDraft('');
  };

  const AllDrafts = () => (
    <div>
      {terms.map((individualTerm) => (
        <Draft onClick={() => setSelectedDraft(individualTerm.id)} key={individualTerm.id} term={individualTerm} onDelete={(event) => deleteDraft(event, individualTerm.id)} />
      ))}
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="add-terms">
        <div className="term-draft-content-container-name">Add Terms</div>
        <div className="term-draft-container">
          {selectedDraft !== '' ? (
            <EditingDraft
              handleSelectedDraft={handleSelectedDraft}
              drafts={terms}
              selectedDraft={selectedDraft}
              termSubmit={termSubmit}
              changeTermName={changeTermName}
            />
          ) : (
            <>
              <div role="button" tabIndex={0} onClick={handleClick} className="term-draft-button"><p>Add Draft</p></div>
              <AllDrafts />
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default AddTerms;

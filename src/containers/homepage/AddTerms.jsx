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
import CourseComponent from '../../components/courseComponent/index.jsx';

const AddTerms = () => {
  const [selectedDraft, setSelectedDraft] = useState('');
  const [terms, setTerms] = useState([]); // list of terms
  const [newId, setNewId] = useState(); // Add new term with details from termData

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
          const coursesData = termData.courses ? Object.keys(termData.courses).map((coursesID) => ({ // map through objects held by course
            id: coursesID,
            ...termData.courses[coursesID]
          })) : [];
          return { // will term to the term course data
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

    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="term-draft"
      >
        <div>{term.termName}</div>
        <div className="term-draft-class-container" tabIndex={0} role="button" onClick={() => handleSelectedDraft(term.id)}>
          {term.courses && term.courses.map((course) => {
            return (
              <div key={course.id} className="term-draft-class-wrapper">
                <div className="term-draft-class">{course.name}</div>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={(event) => deleteDraft(event, term.id)}>Delete</button>
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
        console.log('selected draft id'.selectedDraft);
      }
    });
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

  const termSubmit = (selected, termData) => { // index curr string, need pass in id
    console.log('termDatas:', termData);
    console.log('selected termsubmit:', selected);
    setSelectedDraft('');
    // if (termData.id !== " ") {
    //   // const term = terms[index];
    //   updateTermName(termData.id, termData.termName);
    //   updateCourse(termData.id, termData.courses);
    // } else {
    //   addTerm(termData, (termId) => {
    //     if (termId) {
    //       const key = termId.id;
    //       setNewId(key);
    //       console.log(termId);
    //     }
    //   }).then(
    //     console.log('new termid:', newId),
    //     ((termData.courses).forEach((course) => {
    //       addNewCourse(newId, course);
    //       console.log('new termid:', newId);
    //     }))
    //   );
    // }
  };

  const AllDrafts = () => {
    return (
      <div>
        {terms.map((individualTerm) => (
          <Draft onClick={() => setSelectedDraft(individualTerm.id)} key={individualTerm.id} term={individualTerm} onDelete={(event) => deleteDraft(event, individualTerm.id)} />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};

export default AddTerms;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  getAllCourses, addNewCourse, deleteCourse, updateCourse, getTerm, getCourseByTerm,
  addTerm
} from '../../services/datastore';

const EditingDraft = (props) => {
  const { selectedDraft, drafts } = props;
  // const [input, setInput] = useState({
  //   draftName: '',
  //   classList: [],
  // });
  const [input, setInput] = useState({});
  const [termData, setTermData] = useState({
    termName: '',
    id: '',
    courses: [],
  });
  const [inputData, setInputData] = useState({
    draftName: '',
    classTitle: '',
  });
  console.log('input data:', inputData);
  console.log('selected draft:', selectedDraft);
  const setSelectedDraft = () => {
    props.handleSelectedDraft('');
  };
  useEffect(() => {
    if (selectedDraft === -1) {
      // const key = addTerm(termData);
      // props.handleSelectedDraft(key);
      // console.log(selectedDraft);
    } else {
      getTerm(selectedDraft, (term) => {
        if (term) {
          getCourseByTerm(selectedDraft, (getCourse) => {
            if (getCourse) {
              const courseData = Object.keys(getCourse).map((courseID) => ({
                id: courseID,
                ...getCourse[courseID]
              }
              ));
              console.log(courseData);
              setTermData({
                id: term.id,
                termName: term.termName,
                courses: courseData
              });
            }
          });
        }
      });
    }
  }, []);

  console.log('courses:', termData);

  const [nameEditingState, setNameEditingState] = useState(false);
  const handleTermChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => {
      return { ...prevData, [name]: value }; // copies previous input
    });
  };

  const changeNameToggle = () => {
    setNameEditingState(!nameEditingState);
  };

  const changeNameToggleSubmit = () => {
    // updateDraftName((prevState) => ({ ...prevState }), inputData.draftName);

    setTermData((prevState) => ({
      ...prevState,
      termName: inputData.draftName,
    }));

    setInputData((prevState) => ({
      ...prevState,
      draftName: '', // Reset the input field after saving the class
    }));
    setNameEditingState(!nameEditingState);
  };

  const termSubmit = () => {
    props.termSubmit(selectedDraft, termData);
    setSelectedDraft('');
  };

  const saveClass = () => {
    const newClassTitle = inputData.classTitle.trim(); // Trim any leading/trailing whitespace
    if (newClassTitle) {
      setTermData((prevState) => ({
        ...prevState,
        courses: [...prevState.courses, newClassTitle],
      }));
      // addNewCourse(selectedDraft, newClassTitle);
      setInputData((prevState) => ({
        ...prevState,
        classTitle: '', // Reset the input field after saving the class
      }));
    }
  };

  const deleteClass = (id) => {
    // const updatedClassList = input.classList.filter((classItem, i) => i !== index);
    // setInput((prevState) => ({
    //   ...prevState,
    //   classList: updatedClassList,
    // }));
    deleteCourse(selectedDraft, id);
  };

  let content;
  if (nameEditingState) { // if true
    content = (
      <div>
        <input type="text" onChange={handleTermChange} name="draftName" value={inputData.draftName} />
        {nameEditingState ? <button type="button" onClick={changeNameToggleSubmit}>Save Name</button> : <button type="button" onClick={changeNameToggle}>Change Name</button>}
      </div>
    );
  } else if (selectedDraft === -1) {
    if (termData.termName === '') {
      content = <p onClick={changeNameToggle}>Add Title</p>;
    } else {
      content = <p>{termData.draftName}</p>;
    }
  } else {
    content = <p onClick={changeNameToggle}>{termData.Name}</p>;
  }
  console.log('content:', input);
  return (
    <div className="editing-term">
      <div>{content}</div>
      <div>{termData.courses && termData.courses.map((classItem, index) => {
        return (
          <div key={classItem}>
            <div>{classItem.name}</div>
            <button type="button" onClick={() => deleteClass(classItem.id)}>Delete Class</button>
          </div>
        );
      })}
      </div>

      <input type="text" onChange={handleTermChange} name="classTitle" value={inputData.classTitle} />
      <button type="button" onClick={saveClass}>Add Class</button>
      <button type="button" onClick={termSubmit}>Save Change</button>
    </div>
  );
};

export default EditingDraft;

/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  getAllCourses, addNewCourseInTerm, deleteCourse, updateCourse, getTerm, getCourseByTerm,
  addTerm,
  updateTermName
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
    getTerm(selectedDraft, (term) => {
      if (term) {
        console.log('coursedata:', term);
        let courseData;
        getCourseByTerm(selectedDraft, (getCourse) => {
          if (getCourse) {
            courseData = getCourse ? Object.keys(getCourse).map((courseID) => ({
              id: courseID,
              ...getCourse[courseID]
            })) : [];
          }
          if (courseData === undefined) {
            courseData = [];
          }
          setTermData({
            id: term.id,
            termName: term.termName,
            courses: courseData,
          });
        });
      }
    });
  }, []);

  console.log('term data outside useeffect:', termData);

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
    updateTermName(selectedDraft, inputData.draftName);
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
      addNewCourseInTerm(selectedDraft, newClassTitle);
      console.log('here ', newClassTitle);
      setInputData((prevState) => ({
        ...prevState,
        classTitle: '', // Reset the input field after saving the class
      }));
    }
  };
  const deleteClass = (id) => {
    deleteCourse(selectedDraft, id);
  };

  console.log('current name editing stat', nameEditingState);
  let content;
  if (nameEditingState) { // if true
    content = (
      <div>
        <input type="text" onChange={handleTermChange} name="draftName" value={inputData.draftName} />
        {nameEditingState ? <button type="button" onClick={changeNameToggleSubmit}>Save Name</button> : <button type="button" onClick={changeNameToggle}>Change Name</button>}
      </div>
    );
  } else if (termData.termName === "") {
    content = <p onClick={changeNameToggle}>Add Title</p>;
  } else {
    content = <p onClick={changeNameToggle}>{termData.termName}</p>;
  }
  console.log('content:', termData);
  return (
    <div className="editing-term">
      <div>{content}</div>
      <div>{termData.courses && termData.courses.map((classItem, index) => {
        return (
          <div key={classItem}>
            <div>{classItem.name}</div>
            {console.log('class item id', classItem)}
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

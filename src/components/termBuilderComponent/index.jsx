import React, { useState, useEffect } from 'react';
import TermComponent from '../termComponent';

const TermBuilderComponent = (props) => {
  const [termID, setTermID] = useState(0);
  const [listOfTermIDs, setListOfTermIDs] = useState([]);
  const [termName, setTermName] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [listOfTerms, setListofTerms] = useState([]);


  //when you click the "create term or save term" button
  const createNewTerm = () => {
    const newTerm = {
        termName: newTerm.termName,
        termID: this.state.counter,
        courses: newTerm.courses
      };

    this.setState(prevState => ({
        counter: prevState.counter +2
    }));

    return newTerm;
  }

  //when typing course name this keeps course name updated
  const courseNameFunction = (event) => {
    setCourseName(event.target.value);
  }

  //when you click the button to add the course this adds to the list of courses
  const addNewCourse = () => {
    courses.append(courseName);
  }

  const termNameFunction = (event) => {
    setTermName (event.target.value);
  }

  const delTerm = (id) => {
    setListOfTermIDs(listOfTermIDs.filter((i) => i.termID !== id));
  };

  let allTerms = '';
  if (listOfTermIDs.length !== 0) {
    allTerms = Object.entries(listOfTermIDs).map(([id,term]) => {
      return (
        <TermComponent
            termName = {term.termName}
            courses = {courses} //not sure what to do for these, how to get the ones associated w eachother
            termID = (id)
            key = {id}
            del = {term.del}
        />
      );
    });
  }

    return (
        <div className="text">
            <p className="title">Create a Term:</p>
            <input type="text" value={termName} onChange={termNameFunction} />
            {/* <button type="submit" onClick={newTerm}>Create Term </button> */}
            <input type="text" value={courses} onChange={courseNameFunction} />
            <button type="submit" onClick={addNewCourse}>Add Course</button>

            <div class="termbuilder">
            {allTerms}
            </div>
        </div>
    );
};
export default TermBuilderComponent;

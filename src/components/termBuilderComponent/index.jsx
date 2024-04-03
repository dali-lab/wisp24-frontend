import React, { useState, useEffect } from 'react';
import TermComponent from '../termComponent';

const TermBuilderComponent = (props) => {
  const [termID, setTermID] = useState(0);
  const [listOfTermIDs, setListOfTermIDs] = useState([]);
  const [termName, setTermName] = useState("");
  const [listOfTerms, setListofTerms] = useState([]);
  const [counter, setCounter] = useState(0);


  //when you click the "create term or save term" button
  //confused here can i make a static variable?
  const createNewTerm = () => {
    const newTerm = {
        termName: newTerm.termName, //is this right
        termID: counter,
        courses: newTerm.courses
      };

    setCounter(counter+1);
    return newTerm;
  }

  //typing term name
  const termNameFunction = (event) => {
    setTermName (event.target.value);
  }

  //click delete term button
  const delTerm = (id) => {
    setListOfTermIDs(listOfTermIDs.filter((i) => i.termID !== id));
  };

  let allTerms = '';
  if (listOfTermIDs.length !== 0) {
    allTerms = Object.entries(listOfTerms).map(([id,term]) => {
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
            <button type="submit" onClick={createNewTerm}>Create Term</button>
            {/* <button type="submit" onClick={newTerm}>Create Term </button> */}
            {/* <input type="text" value={courses} onChange={courseNameFunction} /> */}
            {/* <button type="submit" onClick={addNewCourse}>Add Course</button> */}

            <div class="termbuilder">
            {allTerms}
            </div>
        </div>
    );
};
export default TermBuilderComponent;

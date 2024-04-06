import React, { useState, useEffect } from 'react';
import TermComponent from '../termComponent';
import './index.css';

const TermBuilderComponent = () => {
  const [termName, setTermName] = useState('');
  const [listOfTermNames, setListOfTermNames] = useState([]);

  // save new term button, adds to term name list
  const saveNewTerm = () => {
    setListOfTermNames([...listOfTermNames, termName]);
  };

  const termNameFunction = (event) => {
    setTermName(event.target.value);
  };

  const delTerm = (name) => {
    const newList = listOfTermNames.filter((n) => n !== name);
    setListOfTermNames(newList);
    // setListOfTermNames(listOfTermNames.filter((i) => i.termName !== name));
  };

  // const [termID, setTermID] = useState(0);
  // const [listOfTermIDs, setListOfTermIDs] = useState([]);
  // const [termName, setTermName] = useState('');
  // // const [listOfTerms, setListofTerms] = useState([]);
  // // const [counter, setCounter] = useState(0);

  // // when you click the "create term or save term" button
  // // confused here can i make a static variable?
  // const createNewTerm = () => {
  //   temp = listOfTermIDs.append(termID);
  //   setListOfTermIDs(temp);
  // const newTerm = {
  //     termName: newTerm.termName, //is this right
  //     termID: counter,
  //     courses: newTerm.courses
  //     editTerm:false;
  //     del: false;
  //   //   };

  //   // setCounter(counter+1);
  //   return newTerm;
  // };

  // // typing term name
  // const termNameFunction = (event) => {
  //   setTermName(event.target.value);
  // };

  // // click delete term button
  // const delTerm = (id) => {
  //   setListOfTermIDs(listOfTermIDs.filter((i) => i.termID !== id));
  // };

  let allTerms = '';
  if (listOfTermNames.length !== 0) {
    allTerms = Object.entries(listOfTermNames).map(([id, term]) => {
      return (
        <TermComponent
          termName={term}
          courses={[]}
          termID={id}
          key={id}
          del={delTerm} // pass a callback function
          edit={false} // pass a callback function eventually
        />
      );
    });
  }

  // useEffect(() => {
  //   setListOfTermNames(allTerms);
  // });

  return (
    <div>
      <div className="termbuilder">
        <p className="title">Term Builder</p>
        <input type="text" value={termName} placeholder="Term Title" onChange={termNameFunction} />
        <button type="submit" onClick={saveNewTerm}>Save New Term</button>
        <p/>
        {/* <TermComponent /> */}
        {allTerms}
      </div>
    </div>

  );
};
export default TermBuilderComponent;

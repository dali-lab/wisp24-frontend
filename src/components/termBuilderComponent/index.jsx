import React, { useState } from 'react';
import TermComponent from '../termComponent';
import './index.css';

const TermBuilderComponent = () => {
  const [termName, setTermName] = useState('');
  const [listOfTermNames, setListOfTermNames] = useState([]);
  const [onTerm, setOnTerm] = useState(true);

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

  const setOnOff = () => {
    setOnTerm(!onTerm);
  };

  let allTerms = '';
  if (listOfTermNames.length !== 0) {
    allTerms = Object.entries(listOfTermNames).map(([id, term]) => {
      // console.log(`helllllllo ${term.courses}`);
      return (
        <TermComponent
          termName={term}
          courses={term.courses}
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
      {onTerm
        ? (
          <div className="termbuilder">
            <button onClick={setOnOff} type="button">switch</button>
            <p className="title">Term Builder</p>
            <input type="text" value={termName} placeholder="Term Title" onChange={termNameFunction} />
            <button type="submit" onClick={saveNewTerm}>Save New Term</button>
            {/* <TermComponent /> */}
            {allTerms}
          </div>
        )
        : (
          <div>
            <button onClick={setOnOff} type="button">switch</button>
            <textarea />
          </div>
        )}
    </div>

  );
};
export default TermBuilderComponent;

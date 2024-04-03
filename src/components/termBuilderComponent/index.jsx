import React from 'react';
import TermComponent from '../termComponent';
import './index.css';

const TermBuilderComponent = () => {
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

  // let allTerms = '';
  // if (listOfTermIDs.length !== 0) {
  //   allTerms = Object.entries(listOfTerms).map(([id,term]) => {
  //     return (
  //       <TermComponent
  //           termName = {term.termName}
  //           courses = {courses} //not sure what to do for these, how to get the ones associated w eachother
  //           termID = (id)
  //           key = {id}
  //           del = {term.del}
  //       />
  //     );
  //   });
  // }

  return (

    <div className="text">
      <p className="title">Term Builder</p>
      <TermComponent />
    </div>
  );
};
export default TermBuilderComponent;

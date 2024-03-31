import React, { useState, useEffect} from 'react';
import termComponent from '../termComponent';


// course component
const courseComponent = (props) => {
    const [name, setName] = useState([]);
    const [distrib, setDistrib] = useState ([]);
    const [delete, setDelete] = useState(false);
    const [listOfCourses, setListOfCourses] = useState (["CS1", "CS10"]);


    const newCourseNameFunction = (event) => {
      if (event.target.value in listOfCourses) {
        setName (event.target.value);
      }
      else {
        setName (null);
      }
    }

    const deleteCourse = (event) => {
      props.delete(props.id);
    }

    return (
      <div> 
      <input type="text" value={name} onChange={newCourseNameFunction} />
      <button onClick = {deleteCourse}> delete </button>
       </div>
    )

  <div>blah blah</div>

}
export default courseComponent;

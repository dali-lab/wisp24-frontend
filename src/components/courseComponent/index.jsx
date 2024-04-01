/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import TermComponent from '../TermComponent';

// course component
const CourseComponent = (props) => {
  const [name, setName] = useState([]);
  const [distrib, setDistrib] = useState([]);
  const [del, setDel] = useState(false);
  const [listOfCourses, setListOfCourses] = useState(['CS1', 'CS10']);

  const newCourseNameFunction = (event) => {
    if (event.target.value in listOfCourses) {
      setName(event.target.value);
    } else {
      setName(null);
    }
  };

  const delCourse = (event) => {
    props.del(props.id);
  };

  return (
    <div>
      <p>hello this is course component</p>
      <input type="text" value={name} onChange={newCourseNameFunction} />
      <button type="submit" onClick={delCourse}> delete </button>
    </div>
  );
};
export default CourseComponent;
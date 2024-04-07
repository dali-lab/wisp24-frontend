/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import TermComponent from '../TermComponent';
import './index.css';

// course component
const CourseComponent = (props) => {
  const [name, setName] = useState(props.courseName);
  const [distrib, setDistrib] = useState('CI');
  const [del, setDel] = useState(props.del);
  const [id, setID] = useState(props.id);

  // const newCourseNameFunction = (event) => {
  //   if (event.target.value in listOfCourses) {
  //     setName(event.target.value);
  //   } else {
  //     setName(null);
  //   }
  // };

  // const delCourse = (event) => {
  //   props.del(props.id);
  // };

  return (
    <div className="course">
      <p>{id}: {name} ({distrib})</p>
    </div>
  );
};
export default CourseComponent;

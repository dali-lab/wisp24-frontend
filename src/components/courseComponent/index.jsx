/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import TermComponent from '../TermComponent';
import './index.css';

// course component
const CourseComponent = (props) => {
  const [name, setName] = useState([]);
  const [distrib, setDistrib] = useState([]);
  const [del, setDel] = useState(false);
  const [listOfCourses, setListOfCourses] = useState(['CS1', 'CS10']);

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
      <p>{props.newCourseName}</p>
      <p>{props.id}</p>
    </div>
  );
};
export default CourseComponent;

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

  useEffect(() => {
    setID(props.id);
  }, [props.id]);

  const delCourse = (index) => {
    props.delCourse(index);
  };

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
    <div className="course-content-div">
      <div><p>{id}: {name} ({distrib})</p></div>
      <div className="course-individual-delete"><button type="button" onClick={() => delCourse(id)}>X</button></div>
    </div>
  );
};
export default CourseComponent;

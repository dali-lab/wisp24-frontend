/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CourseComponent from '../courseComponent';

const TermComponent = () => {
  const [termName, setTermName] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseID, setCourseID] = useState(0);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDistrib, setNewCourseDistrib] = useState('');

  const newTerm = (event) => {
    setTermName(event.target.value);
  };

  const newCourseNameFunction = (event) => {
    setNewCourseName(event.target.value);
  };

  const newCourseDistribFunction = (event) => {
    setNewCourseDistrib(event.target.value);
  };

  const delCourse = (id) => {
    setCourses(courses.filter((i) => i.id !== id));
  };

  let allCourses = '';
  if (courses.length === 0) {
    allCourses = Object.entries(courses).map(([id, course]) => {
      return (
        <CourseComponent
          newCourseName={course.name}
          newCourseDistrib={course.distrib}
          id={courseID}
          key={courseID}
          del={delCourse}
        />
      );
    });
  }

  return (
    <div className="text">
      <p className="title">New Term:</p>
      <input type="text" value={termName} onChange={newTerm} />
      <p>enter course name:</p>
      <input type="text" value={newCourseName} onChange={newCourseNameFunction} />

    </div>
  );
};
export default TermComponent;

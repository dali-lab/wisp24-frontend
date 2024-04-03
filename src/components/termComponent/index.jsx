/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CourseComponent from '../courseComponent';

const TermComponent = () => {
  const [termName, setTermName] = useState('');
  const [termID, setTermID] = useState(0);
  const [courses, setCourses] = useState([]);
  // const [courseID, setCourseID] = useState(0);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDistrib, setNewCourseDistrib] = useState('');
  const [del, setDel] = useState(false);

  // when typing course name this keeps course name updated
  const courseNameFunction = (event) => {
    setCourseName(event.target.value);
  };

  // when you click the button to add the course this adds to the list of courses
  const addNewCourse = () => {
    courses.append(courseName);
  };

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
  if (courses.length !== 0) {
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

  if (createdTerm === '') {
    return (
      <div className="text">
        <p className="title">Create a Term:</p>
        <input type="text" value={termName} onChange={newTerm} />
        <button type="submit" onClick={newTerm}>Create Term </button>
      </div>
    );
  }

  // THIS IS IF THE TERM HAS BEEN CREATED
  else {
    return (
      <div className="text">
        <p className="title">New Term:</p>
        <input type="text" value={termName} onChange={newTerm} />
        <button type="submit" onClick={newTerm}>Create Term </button>

        <div className="term">
          <p> {termName} </p>
          <input type="text" value={newCourseName} onChange={newCourseNameFunction} />
          <button type="submit" onClick={newCourseNameFunction}> Add Course </button>
        </div>
      </div>

    );
  }
};
export default TermComponent;

/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CourseComponent from '../courseComponent';
import './index.css';

const TermComponent = (props) => {
  const [termName, setTermName] = useState(props.termName); // take from termbuilder class
  const [newTermName, setNewTermName] = useState('');
  const [termID, setTermID] = useState(props.termID);
  // const [newCourseDistrib, setNewCourseDistrib] = useState('');
  // const [del, setDel] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  // const [editTerm, setEditTerm] = useState(true);

  // keeps newTermName updated when typing
  // const newTermNameFunction = (event) => {
  //   setNewTermName (event.target.value);
  // }

  // //when you click the save name button
  // const termNameFunction = () => {
  //   setTermName (newTermName);
  // }

  // // when typing course name this keeps course name updated
  // const newCourseNameFunction = (event) => {
  //   setNewCourseName(event.target.value);
  // };

  // when you click the button to add the course this adds to the list of courses
  // const addNewCourse = () => {
  //   setCourseName(newCourseName);
  //   courses.append(courseName);
  // };

  // when you press the button that says save term
  // const saveTerm = () => {
  //   // setCourses([courses]); //is this necessary or redundant?
  //   // setTermName(termName);
  //   setEditTerm(false);
  // }

  // when you press an edit button
  // const editTermFunction = () => {
  //   setEditTerm(true);
  // }

  // const newCourseDistribFunction = (event) => {
  //   setNewCourseDistrib(event.target.value);
  // };

  // const delCourse = (id) => {
  //   setCourses(courses.filter((i) => i.id !== id));
  // };
  // can i make it delete based on the coursename???

  // let allCourses = '';
  // if (courses.length !== 0) {
  //   allCourses = Object.entries(courses).map(([id, course]) => { //how do i give courses an ID
  //     return (
  //       <CourseComponent
  //         newCourseName={course.name}
  //         newCourseDistrib={course.distrib}
  //         id={courseID}
  //         key={courseID}
  //         del={delCourse}
  //       />
  //     );
  //   });
  // }

  // if editing term!

  return (

    <div className="term">

      <p>24S</p>

      <CourseComponent
        newCourseName="CS10"
        id={0}
      />
      <CourseComponent
        newCourseName="PSYC1"
        id={1}
      />
      <CourseComponent
        newCourseName="ANTH3"
        id={2}
      />
    </div>
  );
};
export default TermComponent;

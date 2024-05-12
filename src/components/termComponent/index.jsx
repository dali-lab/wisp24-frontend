/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import CourseComponent from '../courseComponent';
import './index.css';

const TermComponent = (props) => {
  const { courses: initialCourses = [] } = props;
  const [termName, setTermName] = useState(''); // take from termbuilder class
  // const [newTermName, setNewTermName] = useState('');
  const [termID, setTermID] = useState('');
  // const [newCourseDistrib, setNewCourseDistrib] = useState('');
  // const [del, setDel] = useState(false);
  const [courses, setCourses] = useState(initialCourses);
  const [courseName, setCourseName] = useState('');
  const [editStatus, setEdit] = useState(props.editStatus);
  const [onTerm, setOnTerm] = useState(true);
  const [offEdit, setOffEdit] = useState(false);
  const [offTermComment, setOffTermComment] = useState('');

  const textRef = useRef();

  useEffect(() => {
    setCourses(props.courses);
    setTermID(props.termID);
    setTermName(props.termName);
  }, []);

  const courseNameFunction = (event) => {
    setCourseName(event.target.value);
  };

  const offTermSubmit = () => {
    setOffTermComment(textRef.current.value);
    setOffEdit(!offEdit);
  };

  const delCourse = (courseIndex) => {
    props.delCourse(termID, courseIndex);
  };

  // add course button
  const addCourse = (index) => {
    props.addCourse(props.termID, courseName);
    setCourseName('');
  };

  const toggleOnOff = () => {
    setOnTerm(!onTerm);
  };

  const editToggle = () => {
    setOffEdit(!offEdit);
  };

  // const [courseName, setCourseName] = useState('');
  // const [newCourseName, setNewCourseName] = useState('');
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

  let allCourses = '';
  if (courses && typeof courses === 'object') { // Check if courses is an object
    allCourses = Object.entries(courses).map(([id, course]) => {
      return (
        <CourseComponent
          courseName={course}
          courseDistrib={course.distrib}
          id={id}
          key={id}
          delCourse={delCourse}
          del={false}
        />
      );
    });
  }
  // if editing term!

  return (

    <>
      {onTerm
        ? (
          <div className="term" style={{ border: props.isOver ? '3px solid orange' : '' }}>
            <button onClick={toggleOnOff} type="button">switch</button>
            <div className="course-container">{allCourses}</div>
            <div className="term-component-input">
              {editStatus ? (
                <div>
                  <input type="text" value={courseName} placeholder="Course Name" onChange={courseNameFunction} />
                  <button type="submit" onClick={() => addCourse(termID)}>Add</button>
                </div>
              ) : <div />}
            </div>
          </div>
        )
        : (
          <div className="term" style={{ border: props.isOver ? '3px solid orange' : '' }}>
            {offEdit
              ? (
                <>
                  <button onClick={toggleOnOff} type="button">switch</button>
                  <textarea ref={textRef} />
                  <button onClick={offTermSubmit} type="button">submit</button>
                </>
              )
              : (
                <div>
                  <button onClick={toggleOnOff} type="button">switch</button>
                  <p>{offTermComment}</p>
                  <button type="button" onClick={editToggle}>edit</button>
                </div>
              )}
          </div>
        )}
    </>
  );
};
export default TermComponent;

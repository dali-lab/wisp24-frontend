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
  const inPlan = true;

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

  const delCourse = (courseId) => {
    props.delCourse(props.termID, courseId);
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

  let allCourses = '';
  if (courses && typeof courses === 'object') { // Check if courses is an object
    allCourses = Object.entries(courses).map(([id, course]) => {
      return (
        <CourseComponent
          course={course}
          location={inPlan}
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
                <div className="add-class-block">
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

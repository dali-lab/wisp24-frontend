/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
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
  const [termKey, setTermKey] = useState('');
  const inPlan = true;

  const textRef = useRef();
  console.log(props);

  useEffect(() => {
    setCourses(props.courses);
    setTermID(props.termID);
    setTermName(props.termName);
    setTermKey(props.termKey);
    setOnTerm(props.onTerm);
    setOffTermComment(props.comment);
  }, [props]);

  const courseNameFunction = (event) => {
    setCourseName(event.target.value);
  };

  const offTermSubmit = (index) => {
    setOffTermComment(textRef.current.value);
    props.addComment(index, textRef.current.value);
    setOffEdit(!offEdit);
  };

  const delCourse = (courseId) => {
    props.delCourse(props.termID, courseId);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    drop: (item, monitor) => {
      // Handle drop event here
      const draggedIndex = item.id;
      const targetIndex = props.termID;
      console.log('Dropped item:', item);
      // props.addCourse(props.termID, item.course.name);
      console.log(`termID: ${props.termID}, termKey: ${item.initialTerm}, courseName: ${item.course.name}`);
      props.dndDelete(props.termID, item.initialTerm, item.course.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // add course button
  const addCourse = (index) => {
    props.addCourse(props.termID, courseName);
    setCourseName('');
  };

  const toggleOnOff = (index) => {
    props.toggleOnOff2(index);
    console.log(props.comment);
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
          termKey={termKey}
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
            <button onClick={() => toggleOnOff(termID)} type="button">switch</button>
            <div className="course-container" ref={drop}>{allCourses}</div>
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
                  <button onClick={() => toggleOnOff(termID)} type="button">switch</button>
                  <textarea ref={textRef} />
                  <button onClick={() => offTermSubmit(termID)} type="button">submit</button>
                </>
              )
              : (
                <div>
                  <button onClick={() => toggleOnOff(termID)} type="button">switch</button>
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

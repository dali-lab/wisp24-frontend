/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteCourse } from '../../services/datastore.js';
import './index.css';
// course component
const CourseComponent = (props) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = ['var(--track0)', 'var(--track1)', 'var(--track2)'];

  const [{ isDragging }, drag] = useDrag({
    type: 'COURSE', // Define the drag type as 'COURSE'
    item: { type: 'COURSE', course: props.course, initialTerm: props.termKey }, // Pass the courseId in the drag item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const delCourse = () => {
    if (props.location) {
      props.delCourse(props.course.id);
      console.log(props.course.id);
    } else {
      console.log(props.id);
      props.delete(props.id);
    }
  };
  return (
    <div
      className="course-content-div"
      ref={drag}
      type="button"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: colors[currentColorIndex],
      }}
      onClick={handleClick}
    >
      <div className="course-description-container"><p className="course-description">{props.course?.crn}: {props.course?.name} ({props.course?.distrib})</p></div>
      <div className="course-individual-delete"><button type="button" onClick={delCourse}>x</button></div>
    </div>
  );
};
export default CourseComponent;

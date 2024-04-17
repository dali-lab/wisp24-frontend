/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, forwardRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TermComponent from '../termComponent';

const Plan22 = () => {
  const [listOfTermNames, setListOfTermNames] = useState([
    { id: 1, termName: 'term1', courses: ['course1', 'course2'] },
    { id: 2, termName: 'term2', courses: ['course1'] },
  ]);

  const addCourse = (index, courseName) => {
    const updatedCourseList = listOfTermNames.map((term, i) => {
      if (index === i) {
        const updatedCourses = [...term.courses, courseName];
        return { ...term, courses: updatedCourses };
      } else {
        return term;
      }
    });
    setListOfTermNames(updatedCourseList);
  };

  const delCourse = (index, courseIndex) => {
    const updatedCourseList = listOfTermNames.map((term, i) => {
      if (index === i) {
        const updatedCourses = term.courses.filter((course, idx) => idx !== Number(courseIndex));
        return { ...term, courses: updatedCourses };
      } else {
        return term;
      }
    });
    setListOfTermNames([...updatedCourseList]);
  };

  const moveTerm = (dragIndex, dropIndex) => {
    const draggedTerm = listOfTermNames[dragIndex];
    const updatedTerms = [...listOfTermNames];

    // Remove the dragged term from its original position
    updatedTerms.splice(dragIndex, 1);

    // Insert the dragged term into the drop index position
    updatedTerms.splice(dropIndex, 0, draggedTerm);

    // Update courses of the receiving term
    const updatedCourses = [...updatedTerms[dropIndex].courses, ...draggedTerm.courses];
    updatedTerms[dropIndex] = { ...updatedTerms[dropIndex], courses: updatedCourses };

    setListOfTermNames(updatedTerms);
  };

  const DraggableTerm = forwardRef(({
    term, index, courses
  }, ref) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'TERM',
      item: { term, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'TERM',
      drop: (item) => {
        const dragIndex = item.index;
        moveTerm(dragIndex, index);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    drag(ref);
    drop(ref);

    return (
      <div ref={ref} className="draggable-term" style={{ opacity: isDragging ? 0.5 : 1, background: isOver ? 'lightblue' : 'transparent' }}>
        <TermComponent
          courses={courses}
          termID={index}
          addCourse={addCourse}
          delCourse={delCourse}
          edit={false}
        />
      </div>
    );
  });

  DraggableTerm.displayName = 'DraggableTerm';

  return (
    <div className="table-container">
      <DndProvider backend={HTML5Backend}>
        <div className="drag-drop-container">
          {listOfTermNames.map((term, index) => (
            <DraggableTerm key={term.id} term={term} index={index} courses={term.courses} />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default Plan22;

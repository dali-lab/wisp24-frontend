/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TermComponent from '../termComponent';
import './Plan23.css';

const Plan23 = () => {
  const [listOfTermNames, setListOfTermNames] = useState([
    { id: 0, termName: 'term1', courses: ['course1', 'course2'] }, // edit: have this start at 0 for consistency
    { id: 1, termName: 'term2', courses: ['course3'] },
    { id: 2, termName: 'term3', courses: ['course4'] },
    { id: 3, termName: 'term4', courses: ['course5', 'course6'] },
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

  const TermCard = (props) => {
    const id = props.termID;
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
      type: 'TERM',
      item: { id }, // ADD THIS!!
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div ref={drag}>
          <TermComponent
            termName={props.termName || ''}
            courses={props.courses}
            termID={props.termID} // changed from index to termID
            addCourse={props.addCourse}
            delCourse={props.delCourse}
            edit={props.edit}
          />
        </div>
      </div>
    );
  };

  const TermContainer = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'TERM',
      drop: (item, monitor) => {
        const draggedIndex = item.id; // THIS WAS NULL BEFORE!! Now references item: {id} in useDrag hook
        const targetIndex = props.termID;

        console.log('dragged index: ', draggedIndex, ' | target index: ', targetIndex);

        // Swap the terms in the list
        const updatedTermNames = [...listOfTermNames];
        const draggedTerm = updatedTermNames[draggedIndex];
        updatedTermNames[draggedIndex] = updatedTermNames[targetIndex];
        updatedTermNames[targetIndex] = draggedTerm;

        setListOfTermNames(updatedTermNames);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }));
    return (
      <div
        ref={drop}
        style={{ backgroundColor: isOver ? 'red' : 'white' }}
      >
        <TermCard
          termName={props.termName || ''}
          courses={props.courses}
          termID={props.termID} // changed from index to termID
          addCourse={props.addCourse}
          delCourse={props.delCourse}
          edit={props.edit}
        />
      </div>
    );
  };

  return (

    <div className="table-container">
      <DndProvider backend={HTML5Backend}>
        <table>
          <thead>
            <tr>
              <th> </th>
              <th><div className="season">spring</div></th>
              <th><div className="season">winter</div></th>
              <th><div className="season">spring</div></th>
              <th><div className="season">summer</div></th>
            </tr>
          </thead>
          <tbody>
            <tr className="term-rows">
              <td><div className="term-holder year-column">1st</div></td>
              <td>
                <TermContainer
                  termName={listOfTermNames[0].termName}
                  courses={listOfTermNames[0].courses}
                  termID={0}
                  key={0}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td>
                <TermContainer
                  termName={listOfTermNames[1].termName}
                  courses={listOfTermNames[1].courses}
                  termID={1}
                  key={1}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td>
                <TermContainer
                  termName={listOfTermNames[2].termName}
                  courses={listOfTermNames[2].courses}
                  termID={2}
                  key={2}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td>
                <TermContainer
                  termName={listOfTermNames[3].termName}
                  courses={listOfTermNames[3].courses}
                  termID={3}
                  key={3}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </DndProvider>
    </div>

  );
};

export default Plan23;

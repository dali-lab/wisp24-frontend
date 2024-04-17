import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TermComponent from '../termComponent';
import './Plan23.css';

const Plan23 = () => {
  const [listOfTermNames, setListOfTermNames] = useState([
    { id: 1, termName: 'term1', courses: ['course1', 'course2'] },
    { id: 2, termName: 'term2', courses: ['course1'] },
    { id: 3, termName: 'term3', courses: ['course1'] },
    { id: 4, termName: 'term4', courses: ['course1'] },
    { id: 5, termName: 'term5', courses: ['course1'] },
    { id: 6, termName: 'term6', courses: ['course1'] },
    { id: 7, termName: 'term7', courses: ['course1'] },
    { id: 8, termName: 'term8', courses: ['course1'] },
    { id: 9, termName: 'term9', courses: ['course1'] },
    { id: 10, termName: 'term10', courses: ['course1'] },
    { id: 11, termName: 'term11', courses: ['course1'] },
    { id: 12, termName: 'term12', courses: ['course1'] },
    { id: 13, termName: 'term13', courses: ['course1'] },
    { id: 14, termName: 'term14', courses: ['course1'] },
    { id: 15, termName: 'term15', courses: ['course1'] },
    { id: 16, termName: 'term16', courses: ['course1'] },
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
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
      type: 'TERM',
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
            termID={props.index}
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
        const draggedIndex = item.termID;
        const targetIndex = props.termID;

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
          termID={props.index}
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
              <td> <TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">2nd</div></td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">3rd</div></td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">4th</div></td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                termName={listOfTermNames[0].termName}
                courses={listOfTermNames[0].courses}
                termID={0}
                key={0}
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

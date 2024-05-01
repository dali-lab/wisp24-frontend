import React, { useState, forwardRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TermComponent from '../termComponent';
import './Plan23.css';

const Plan23 = () => {
  const [listOfTermNames, setListOfTermNames] = useState([
    { id: 0, termName: 'term0', courses: ['course1', 'course2'] },
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
        style={{ backgroundColor: isOver ? 'orange' : '' }}
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
                  courses={listOfTermNames[0].courses}
                  termID={0}
                  key={listOfTermNames[0].id}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td>
                <TermContainer
                  courses={listOfTermNames[1].courses}
                  termID={1}
                  key={listOfTermNames[1].id}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td> <TermContainer
                courses={listOfTermNames[2].courses}
                termID={2}
                key={listOfTermNames[2].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[3].courses}
                termID={3}
                key={listOfTermNames[3].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">2nd</div></td>
              <td><TermContainer
                courses={listOfTermNames[4].courses}
                termID={4}
                key={listOfTermNames[3].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[5].courses}
                termID={5}
                key={listOfTermNames[5].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[6].courses}
                termID={6}
                key={listOfTermNames[6].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[7].courses}
                termID={7}
                key={listOfTermNames[7].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">3rd</div></td>
              <td><TermContainer
                courses={listOfTermNames[8].courses}
                termID={8}
                key={listOfTermNames[8].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[9].courses}
                termID={9}
                key={listOfTermNames[9].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[10].courses}
                termID={10}
                key={listOfTermNames[10].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[11].courses}
                termID={11}
                key={listOfTermNames[11].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">4th</div></td>
              <td><TermContainer
                courses={listOfTermNames[12].courses}
                termID={12}
                key={listOfTermNames[12].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[13].courses}
                termID={13}
                key={listOfTermNames[13].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[14].courses}
                termID={14}
                key={listOfTermNames[14].id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[15].courses}
                termID={15}
                key={listOfTermNames[15].id}
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

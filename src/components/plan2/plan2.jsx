/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, forwardRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TermComponent from '../termComponent';
import { updateDraftTerm } from '../../services/datastore.js';
import './Plan2.css';

// <Plan2 mainDrafts={mainDrafts} mainDraftIndex={mainDraftIndex} />
const Plan23 = (props) => {
  const [listOfTermNames, setListOfTermNames] = useState([]);

  useEffect(() => {
    if (props.mainDrafts && props.mainDraftIndex) {
      const draftWithMatchingID = props.mainDrafts.find((draft) => draft.id === props.mainDraftIndex);
      setListOfTermNames(draftWithMatchingID.list);
    } else {
      setListOfTermNames([]);
    }
  }, [props.mainDrafts, props.mainDraftIndex]);

  const addCourse = (index, courseName) => {
    const newCourse = {
      crn: 'COSC##',
      distrib: 'TLA',
      name: courseName,
    };
    const updatedCourseList = listOfTermNames.map((term, i) => {
      if (index === i) {
        const updatedCourses = [...term.courses, newCourse];
        return { ...term, courses: updatedCourses };
      } else {
        return term;
      }
    });
    setListOfTermNames(updatedCourseList);

    // Update the draft in the backend
    updateDraftTerm(props.mainDraftIndex, updatedCourseList);
  };

  const [editStatus, setEditStatus] = useState(true);

  const delCourse = (index, courseId) => {
    const updatedCourseList = listOfTermNames.map((term, i) => {
      if (index === i) {
        const updatedCourses = term.courses.filter((course) => course.id !== courseId);
        console.log(updatedCourses);
        return { ...term, courses: updatedCourses };
      } else {
        return term;
      }
    });
    setListOfTermNames([...updatedCourseList]);

    // Update the draft in the backend
    updateDraftTerm(props.mainDraftIndex, updatedCourseList);
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
            editStatus={props.editStatus}
            termName={props.termName || ''}
            courses={props.courses}
            termID={props.termID} // changed from index to termID
            addCourse={props.addCourse}
            delCourse={props.delCourse}
            edit={props.edit}
            isOver={props.isOver}
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
        className="term-container"
        style={{ backgroundcolor: props.isOver ? 'rgba(0,0,0,1)' : '' }}
      >
        <TermCard
          editStatus={props.editStatus}
          termName={props.termName || ''}
          courses={props.courses}
          termID={props.termID} // changed from index to termID
          addCourse={props.addCourse}
          delCourse={props.delCourse}
          edit={props.edit}
          isOver={isOver}
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
                  courses={listOfTermNames[0]?.courses}
                  editStatus={editStatus}
                  termID={0}
                  key={listOfTermNames[0]?.id}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td>
                <TermContainer
                  courses={listOfTermNames[1]?.courses}
                  termID={1}
                  editStatus={editStatus}
                  key={listOfTermNames[1]?.id}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  edit={false}
                />
              </td>
              <td> <TermContainer
                courses={listOfTermNames[2]?.courses}
                termID={2}
                editStatus={editStatus}
                key={listOfTermNames[2]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[3]?.courses}
                termID={3}
                editStatus={editStatus}
                key={listOfTermNames[3]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">2nd</div></td>
              <td><TermContainer
                courses={listOfTermNames[4]?.courses}
                termID={4}
                editStatus={editStatus}
                key={listOfTermNames[3]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[5]?.courses}
                termID={5}
                editStatus={editStatus}
                key={listOfTermNames[5]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[6]?.courses}
                editStatus={editStatus}
                termID={6}
                key={listOfTermNames[6]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[7]?.courses}
                termID={7}
                editStatus={editStatus}
                key={listOfTermNames[7]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">3rd</div></td>
              <td><TermContainer
                courses={listOfTermNames[8]?.courses}
                termID={8}
                editStatus={editStatus}
                key={listOfTermNames[8]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[9]?.courses}
                termID={9}
                editStatus={editStatus}
                key={listOfTermNames[9]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[10]?.courses}
                termID={10}
                editStatus={editStatus}
                key={listOfTermNames[10]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[11]?.courses}
                termID={11}
                editStatus={editStatus}
                key={listOfTermNames[11]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">4th</div></td>
              <td><TermContainer
                courses={listOfTermNames[12]?.courses}
                termID={12}
                editStatus={editStatus}
                key={listOfTermNames[12]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[13]?.courses}
                termID={13}
                editStatus={editStatus}
                key={listOfTermNames[13]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[14]?.courses}
                termID={14}
                editStatus={editStatus}
                key={listOfTermNames[14]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[15]?.courses}
                termID={15}
                editStatus={editStatus}
                key={listOfTermNames[15]?.id}
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

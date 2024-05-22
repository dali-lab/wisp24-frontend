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
  const [mainDraftIndex, setMainDraftIndex] = useState('');

  useEffect(() => {
    if (props.mainDrafts && props.mainDraftIndex) {
      const draftWithMatchingID = props.mainDrafts.find((draft) => draft.id === props.mainDraftIndex);
      setListOfTermNames(draftWithMatchingID.list);
      setMainDraftIndex(props.mainDraftIndex);
    } else {
      setListOfTermNames([]);
    }
  }, [props.mainDrafts, props.mainDraftIndex]);

  useEffect(() => {
    if (props.mainDrafts && props.mainDraftIndex) {
      const draftWithMatchingID = props.mainDrafts.find((draft) => draft.id === props.mainDraftIndex);
      setListOfTermNames(draftWithMatchingID.list);
      setMainDraftIndex(props.mainDraftIndex);
    } else {
      setListOfTermNames([]);
    }
  }, []);

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

  const toggleOnOff2 = (index) => {
    const afterToggle = listOfTermNames.map((term, i) => {
      if (index === i) {
        const prevBoolean = term.onTerm;
        return { ...term, onTerm: !prevBoolean };
      } else {
        return term;
      }
    });
    updateDraftTerm(props.mainDraftIndex, afterToggle);
  };

  const addComment = (index, newComment) => {
    const updatedTerms = listOfTermNames.map((term, i) => {
      if (index === i) {
        return { ...term, comment: newComment };
      } else {
        return term;
      }
    });
    console.log(updatedTerms);
    updateDraftTerm(props.mainDraftIndex, updatedTerms);
  };

  const [editStatus, setEditStatus] = useState(true);

  const delCourse = (index, courseId) => {
    const updatedCourseList = listOfTermNames.map((term, i) => {
      if (index === i) {
        const updatedCourses = term.courses.filter((course) => course.id !== courseId);
        return { ...term, courses: updatedCourses };
      } else {
        return term;
      }
    });
    setListOfTermNames([...updatedCourseList]);

    // Update the draft in the backend
    updateDraftTerm(props.mainDraftIndex, updatedCourseList);
  };

  const dndDelete = (index, initialIdx, courseName) => {
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
    const updatedCourseList2 = updatedCourseList.map((term) => {
      if (initialIdx === term.id) {
        const updatedCourses = term.courses.filter((course) => course.name !== courseName);
        return { ...term, courses: updatedCourses };
      } else {
        return term;
      }
    });
    setListOfTermNames(updatedCourseList2);
    // Update the draft in the backend
    updateDraftTerm(props.mainDraftIndex, updatedCourseList2);
  };

  const TermCard = (subprops) => {
    const id = subprops.termID;
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
      type: 'TERM',
      item: { id, inPlan: true }, // ADD THIS!!
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div ref={drag}>
          <TermComponent
            termKey={subprops.termKey}
            onTerm={subprops.onTerm}
            dndDelete={dndDelete}
            editStatus={subprops.editStatus}
            termName={subprops.termName || ''}
            toggleOnOff2={subprops.toggleOnOff2}
            courses={subprops.courses}
            termID={subprops.termID} // changed from index to termID
            addCourse={subprops.addCourse}
            delCourse={subprops.delCourse}
            edit={subprops.edit}
            isOver={subprops.isOver}
            comment={subprops.comment}
            addComment={subprops.addComment}
          />
        </div>
      </div>
    );
  };

  const TermContainer = (subprops) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'TERM',
      drop: (item, monitor) => {
        if (item.inPlan) {
          const draggedIndex = item.id; // THIS WAS NULL BEFORE!! Now references item: {id} in useDrag hook
          const targetIndex = subprops.termID;

          // Swap the terms in the list
          const updatedTermNames = [...listOfTermNames];
          const draggedTerm = updatedTermNames[draggedIndex];
          updatedTermNames[draggedIndex] = updatedTermNames[targetIndex];
          updatedTermNames[targetIndex] = draggedTerm;

          setListOfTermNames(updatedTermNames);
          updateDraftTerm(mainDraftIndex, updatedTermNames);
        } else {
          const targetIndex = props.termID;
          const updatedTermNames = [...listOfTermNames];

          // type: 'TERM', termId: term.id, term, inPlan: false
          updatedTermNames[targetIndex] = {
            courses: item.term.courses,
            id: item.termId,
            termName: item.term.termName
          };
          setListOfTermNames(updatedTermNames);
          updateDraftTerm(mainDraftIndex, updatedTermNames);
        }
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
          onTerm={subprops.onTerm}
          termKey={subprops.termKey}
          editStatus={subprops.editStatus}
          termName={subprops.termName || ''}
          courses={subprops.courses}
          termID={subprops.termID} // changed from index to termID
          addCourse={subprops.addCourse}
          delCourse={subprops.delCourse}
          toggleOnOff2={subprops.toggleOnOff2}
          edit={subprops.edit}
          comment={subprops.comment}
          addComment={subprops.addComment}
          isOver={isOver}
        />
      </div>
    );
  };
  console.log(listOfTermNames[1]?.comment);
  return (
    <div className="table-container">
      <DndProvider backend={HTML5Backend}>
        <table>
          <thead>
            <tr>
              <th> </th>
              <th><div className="season">fall</div></th>
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
                  onTerm={listOfTermNames[0]?.onTerm}
                  comment={listOfTermNames[0]?.comment}
                  editStatus={editStatus}
                  termID={0}
                  key={listOfTermNames[0]?.id}
                  termKey={listOfTermNames[0]?.id}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  toggleOnOff2={toggleOnOff2}
                  addComment={addComment}
                  edit={false}
                />
              </td>
              <td>
                <TermContainer
                  courses={listOfTermNames[1]?.courses}
                  onTerm={listOfTermNames[1]?.onTerm}
                  termID={1}
                  comment={listOfTermNames[1]?.comment}
                  editStatus={editStatus}
                  key={listOfTermNames[1]?.id}
                  termKey={listOfTermNames[1]?.id}
                  addCourse={addCourse}
                  delCourse={delCourse}
                  toggleOnOff2={toggleOnOff2}
                  addComment={addComment}
                  edit={false}
                />
              </td>
              <td> <TermContainer
                courses={listOfTermNames[2]?.courses}
                onTerm={listOfTermNames[2]?.onTerm}
                termID={2}
                comment={listOfTermNames[2]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[2]?.id}
                termKey={listOfTermNames[2]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[3]?.courses}
                onTerm={listOfTermNames[3]?.onTerm}
                termID={3}
                comment={listOfTermNames[3]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[3]?.id}
                termKey={listOfTermNames[3]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">2nd</div></td>
              <td><TermContainer
                courses={listOfTermNames[4]?.courses}
                onTerm={listOfTermNames[4]?.onTerm}
                termID={4}
                comment={listOfTermNames[4]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[4]?.id}
                termKey={listOfTermNames[4]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[5]?.courses}
                onTerm={listOfTermNames[5]?.onTerm}
                termID={5}
                comment={listOfTermNames[5]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[5]?.id}
                termKey={listOfTermNames[5]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[6]?.courses}
                onTerm={listOfTermNames[6]?.onTerm}
                editStatus={editStatus}
                comment={listOfTermNames[6]?.comment}
                termID={6}
                key={listOfTermNames[6]?.id}
                termKey={listOfTermNames[6]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[7]?.courses}
                onTerm={listOfTermNames[7]?.onTerm}
                termID={7}
                comment={listOfTermNames[7]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[7]?.id}
                termKey={listOfTermNames[7]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">3rd</div></td>
              <td><TermContainer
                courses={listOfTermNames[8]?.courses}
                onTerm={listOfTermNames[8]?.onTerm}
                termID={8}
                comment={listOfTermNames[8]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[8]?.id}
                termKey={listOfTermNames[8]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[9]?.courses}
                onTerm={listOfTermNames[9]?.onTerm}
                termID={9}
                comment={listOfTermNames[9]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[9]?.id}
                termKey={listOfTermNames[9]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[10]?.courses}
                onTerm={listOfTermNames[10]?.onTerm}
                termID={10}
                comment={listOfTermNames[10]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[10]?.id}
                termKey={listOfTermNames[10]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[11]?.courses}
                onTerm={listOfTermNames[11]?.onTerm}
                termID={11}
                comment={listOfTermNames[11]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[11]?.id}
                termKey={listOfTermNames[11]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
            </tr>
            <tr className="term-rows">
              <td><div className="term-holder year-column">4th</div></td>
              <td><TermContainer
                courses={listOfTermNames[12]?.courses}
                onTerm={listOfTermNames[12]?.onTerm}
                termID={12}
                comment={listOfTermNames[12]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[12]?.id}
                termKey={listOfTermNames[12]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[13]?.courses}
                onTerm={listOfTermNames[13]?.onTerm}
                termID={13}
                comment={listOfTermNames[13]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[13]?.id}
                termKey={listOfTermNames[13]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[14]?.courses}
                onTerm={listOfTermNames[14]?.onTerm}
                termID={14}
                comment={listOfTermNames[14]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[14]?.id}
                termKey={listOfTermNames[14]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
                edit={false}
              />
              </td>
              <td><TermContainer
                courses={listOfTermNames[15]?.courses}
                onTerm={listOfTermNames[15]?.onTerm}
                termID={15}
                comment={listOfTermNames[15]?.comment}
                editStatus={editStatus}
                key={listOfTermNames[15]?.id}
                termKey={listOfTermNames[15]?.id}
                addCourse={addCourse}
                delCourse={delCourse}
                toggleOnOff2={toggleOnOff2}
                addComment={addComment}
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

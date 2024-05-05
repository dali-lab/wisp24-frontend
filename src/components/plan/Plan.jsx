/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Plan.css';
import TermComponent from '../termComponent';

const Plan = (props) => {
  const [termName, setTermName] = useState('');
  const [listOfTermNames, setListOfTermNames] = useState([
    { termName: 'term1', courses: [] },
    { termName: 'term2', courses: [] },
    { termName: 'term3', courses: [] },
    { termName: 'term4', courses: [] },
    { termName: 'term5', courses: [] },
    { termName: 'term6', courses: [] },
    { termName: 'term7', courses: [] },
    { termName: 'term8', courses: [] },
    { termName: 'term9', courses: [] },
    { termName: 'term10', courses: [] },
    { termName: 'term11', courses: [] },
    { termName: 'term12', courses: [] },
    { termName: 'term13', courses: [] },
    { termName: 'term14', courses: [] },
    { termName: 'term15', courses: [] },
    { termName: 'term16', courses: [] },
  ]);

  const termNameFunction = (event) => {
    setTermName(event.target.value);
  };

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
  console.log('here:', props.editStatus);

  return (
    <div className="table-container">
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
            <td><TermComponent
              termName={listOfTermNames[0].termName}
              courses={listOfTermNames[0].courses}
              termID={0}
              key={0}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[1].termName}
              courses={listOfTermNames[1].courses}
              termID={1}
              key={1}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[2].termName}
              courses={listOfTermNames[2].courses}
              termID={2}
              key={2}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[3].termName}
              courses={listOfTermNames[3].courses}
              termID={3}
              key={3}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
          </tr>
          <tr className="term-rows">
            <td><div className="term-holder year-column">2nd</div></td>
            <td><TermComponent
              termName={listOfTermNames[4].termName}
              courses={listOfTermNames[4].courses}
              termID={4}
              key={4}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[5].termName}
              courses={listOfTermNames[5].courses}
              termID={5}
              key={5}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[6].termName}
              courses={listOfTermNames[6].courses}
              termID={6}
              key={6}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[7].termName}
              courses={listOfTermNames[7].courses}
              termID={7}
              key={7}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
          </tr>
          <tr className="term-rows">
            <td><div className="term-holder year-column">3rd</div></td>
            <td><TermComponent
              termName={listOfTermNames[8].termName}
              courses={listOfTermNames[8].courses}
              termID={8}
              key={8}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[9].termName}
              courses={listOfTermNames[9].courses}
              termID={9}
              key={9}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[10].termName}
              courses={listOfTermNames[10].courses}
              termID={10}
              key={10}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[11].termName}
              courses={listOfTermNames[11].courses}
              termID={11}
              key={11}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
          </tr>
          <tr className="term-rows">
            <td><div className="term-holder year-column">4th</div></td>
            <td><TermComponent
              termName={listOfTermNames[12].termName}
              courses={listOfTermNames[12].courses}
              termID={12}
              key={12}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[13].termName}
              courses={listOfTermNames[13].courses}
              termID={13}
              key={13}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[14].termName}
              courses={listOfTermNames[14].courses}
              termID={14}
              key={14}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
            <td><TermComponent
              termName={listOfTermNames[15].termName}
              courses={listOfTermNames[15].courses}
              termID={15}
              key={15}
              addCourse={addCourse}
              delCourse={delCourse}
              edit={false}
              editStatus={props.editStatus}
            />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Plan;

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import TermComponent from '../termComponent';
import { getAllDrafts } from '../../services/datastore';
import './index.css';

const TermDisplay = (props) => {
  const [plan, setPlan] = useState(props.plan);
  return (
    <div className="feed-table-container">
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
              {plan[0].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[1].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[2].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[3].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>

          </tr>
          <tr className="term-rows">
            <td><div className="term-holder year-column">2nd</div></td>
            <td>
              {plan[4].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[5].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[6].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[7].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
          </tr>
          <tr className="term-rows">
            <td><div className="term-holder year-column">3rd</div></td>
            <td>
              {plan[8].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[9].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[10].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[11].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
          </tr>
          <tr className="term-rows">
            <td><div className="term-holder year-column">4th</div></td>
            <td>
              {plan[12].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[13].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[14].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>
            <td>
              {plan[14].courses?.map((course) => (
                <div key={course.id}>
                  {course.name}
                </div>
              ))}
            </td>

          </tr>
        </tbody>

      </table>

    </div>

  );
};
export default TermDisplay;

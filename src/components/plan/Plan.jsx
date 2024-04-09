import React from 'react';
import './Plan.css';

const Plan = () => {
  return (
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
          <td><div className="term-holder">f1</div></td>
          <td><div className="term-holder">w1</div></td>
          <td><div className="term-holder">s1</div></td>
          <td><div className="term-holder">x1</div></td>
        </tr>
        <tr className="term-rows">
          <td><div className="term-holder year-column">2nd</div></td>
          <td><div className="term-holder">f2</div></td>
          <td><div className="term-holder">w2</div></td>
          <td><div className="term-holder">s2</div></td>
          <td><div className="term-holder">x2</div></td>
        </tr>
        <tr className="term-rows">
          <td><div className="term-holder year-column">3rd</div></td>
          <td><div className="term-holder">f3</div></td>
          <td><div className="term-holder">w3</div></td>
          <td><div className="term-holder">s3</div></td>
          <td><div className="term-holder">x3</div></td>
        </tr>
        <tr className="term-rows">
          <td><div className="term-holder year-column">4th</div></td>
          <td><div className="term-holder">f4</div></td>
          <td><div className="term-holder">w4</div></td>
          <td><div className="term-holder">s4</div></td>
          <td><div className="term-holder">x4</div></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Plan;

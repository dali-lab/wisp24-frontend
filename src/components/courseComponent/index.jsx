/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import TermComponent from '../TermComponent';
import './index.css';
import { deleteCourse } from '../../services/datastore';

// course component
const CourseComponent = (props) => {
  // const [name, setName] = useState(props.name);
  // const [distrib, setDistrib] = useState('');
  // const [id, setID] = useState(props.courseID);
  // const [prereq, setPrereq] = useState('');
  // const [nro, setNRO] = useState(props.courseNRO);
  // const [color, setColor] = useState('');

  return (
    <div className="course-content-div">
      <div><p>{props.crn}: {props.name} ({props.distrib})</p></div>
      <div className="course-individual-delete"><button type="button" onClick={() => deleteCourse(props.id)}>X</button></div>
    </div>
  );
};
export default CourseComponent;

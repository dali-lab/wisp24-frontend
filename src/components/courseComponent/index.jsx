/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import termComponent from '../termComponent';

// course component
const courseComponent = (props) => {
  const [name, setName] = useState([]);
  const [distrib, setDistrib] = useState([]);
  const [del, setDel] = useState(false);
  const [listOfCourses, setListOfCourses] = useState(['CS1', 'CS10']);

  const newCourseNameFunction = (event) => {
    if (event.target.value in listOfCourses) {
      setName(event.target.value);
    } else {
      setName(null);
    }
  };

  const delCourse = (event) => {
    props.del(props.id);
  };

  return (
    <div>
      <input type="text" value={name} onChange={newCourseNameFunction} />
      <button type="submit" onClick={delCourse}> delete </button>
    </div>
  );
};
export default courseComponent;

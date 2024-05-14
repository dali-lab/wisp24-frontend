/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { addNewCourse, deleteCourse, getAllCourses } from '../../services/datastore.js';
import CourseComponent from '../../components/courseComponent/index.jsx';

const PotentialClass = () => {
  // const [classes, setClasses] = useState(['class1']);
  // const [input, setInput] = useState();
  // const [editing, setEditing] = useState(false);
  const [courseName, setCourseName] = useState('');
  // const [courseID, setCourseID] = useState(0); // is it an issue that this resets if u reload the page?
  const [NRO, setNRO] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const inPlan = false;

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setInput(event.target.value);
  // };

  // const handleClickEditing = (event) => {
  //   if (editing) {
  //     setClasses((prevClasses) => [...prevClasses, input]);
  //   }
  //   event.preventDefault();
  //   setEditing(!editing);
  // };

  // const handleClickDelete = (index) => {
  //   deleteCourse(index);
  //   // const updatedClasses = classes.filter((classItem, i) => i !== index);
  //   // setClasses(updatedClasses);
  // };

  const newCourseName = (event) => {
    // console.log('course typing registered');
    setCourseName(event.target.value);
  };

  const createCourse = () => {
    // console.log('create course button click registered');
    addNewCourse(courseName, 'NW', NRO, 'CS1', 'orange', '92510');
  };

  const changeNRO = () => {
    setNRO(!NRO);
  };

  useEffect(() => {
    getAllCourses((course_list) => {
      setCourseList(course_list);
    });
  }, []);

  let allCourses = '';
  if (courseList != null) {
    allCourses = Object.entries(courseList).map(([id, course]) => {
      return (
        <CourseComponent
          name={course.name}
          crn={course.crn}
          key={id}
          id={id}
          delete={deleteCourse}
          nro={course.nro}
          location={inPlan}
          color={course.color}
          distrib={course.distrib}
          prereq={course.prereq}
        />
      );
    });
  }

  return (
    <div className="potential-class">
      <div className="potential-class-title">Potential Classes</div>
      {/* <div className="potential-class-container">{classes.map((classItem, index) => (
        <div className="potential-class-item" key={classItem}>
          <p>{classItem}</p>
          <button type="submit" onClick={() => handleClickDelete(index)}>Delete Class</button>
        </div>
      ))}
      </div> */}
      <div className="potential-wrapper">
        {allCourses}
      </div>

      <div className="potential-class-add-container">
        {/* {editing */}
        <div className="potential-class-add">
          <div>
            <input type="text" placeholder="Course Name" value={courseName} onChange={newCourseName} />
            <div role="button" tabIndex={0} className="potential-class-add" type="submit" onClick={changeNRO}>{NRO ? 'Remove NRO' : 'Set NRO'}</div>
          </div>
          <div role="button" tabIndex={0} className="potential-class-add" type="submit" onClick={createCourse}>Add Class</div>
        </div>
        {/* : <div role="button" tabIndex={0} className="potential-class-add" type="submit" onClick={handleClickEditing}>Add Class</div>} */}
      </div>
    </div>
  );
};

export default PotentialClass;

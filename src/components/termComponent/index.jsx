import React, { useState, useEffect} from 'react';
import courseComponent from '../courseComponent';

const termComponent = () => {
    const [termName, setTermName] = useState('');
    const [courses, setCourses] = useState([]);
    const [courseID, setCourseID] = useState(0);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDistrib, setNewCourseDistrib] = useState('');


    const newTerm = (event) => {
        setTermName(event.target.value);
    }

    const newCourseNameFunction = (event) => {
        setNewCourseName(event.target.value);
    }

    const newCourseDistribFunction = (event) => {
        setNewCourseDistrib(event.target.value);
    }

    const deleteCourse = (id) => {
        setCourses(courses.filter((i) => i.id != id));
    }

    let allCourses = '';
    if (course != null) {
        allCourses = Object.entries(course).map(([id,course]) => {
            return (
                <Course
                    newCourseName = {course.name}
                    newCourseDistrib = {course.distrib}
                    id = {courseID}
                    delete= {deleteCourse}
                />
            );
        })
    }

    return (
         <div class="text"> 
            <input type="text" value={termName} onChange={newTerm} /> 
           <p class = "title"> termName </p> 
           <p>enter course name:</p>
            <input type="text" value={newNoteName} onChange={newCourseNameFunction} /> 

         </div>
       );
    }
    export default termComponent;
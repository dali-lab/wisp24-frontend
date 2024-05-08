/* eslint-disable prefer-template */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase, ref, set, update, remove, onValue, push
} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app’s Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA51RBWbkyGVmU-Ap09qHTILolxQ1Q07x4',
  authDomain: 'dartpath-5c863.firebaseapp.com',
  databaseURL: 'https://dartpath-5c863-default-rtdb.firebaseio.com',
  projectId: 'dartpath-5c863',
  storageBucket: 'dartpath-5c863.appspot.com',
  messagingSenderId: '426977445411',
  appId: '1:426977445411:web:a9d4a032947150a19f1396',
  measurementId: 'G-DGN0K66FGC'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
// Initialize the Firebase Realtime Database
// const db = getDatabase(initializeApp(firebaseConfig));

export function getTerm(termID, callback = () => {}) {
  const drafRef = ref(db, 'Terms/' + termID);
  onValue(drafRef, (snapshot) => {
    const draft = snapshot.val(); // gets the snapshot of the data
    callback(draft); // return data to the caller
  });
}

export function getAllTerm(callback = () => {}) {
  const draftRef = ref(db, 'Terms/');
  onValue(draftRef, (snapshot) => {
    const drafts = snapshot.val();
    callback(drafts);
  });
}
/* TERM SUBMIT */
export function addTerm(input, callback = () => {}) {
  const reference = push(ref(db, 'Terms/'));
  set(reference, {
    id: reference.key,
    termName: input.termName || null
  }).then(() => {
    onValue(reference, (snapshot) => {
      const key = snapshot.val();
      if (key) {
        callback(key.id);
      }
    }, {
      onlyOnce: true // Ensures the listener is only called once and then detached
    });
  });
}
export function updateTermName(id, newName) {
  const TermRef = ref(db, 'Terms/' + id);
  update(TermRef, {
    termName: newName,
  });
}

export function deleteTerm(termID) {
  const termRef = ref(db, 'Terms/' + termID);
  remove(termRef).then(() => {
    console.log('Term successfully deleted.');
  }).catch((error) => {
    console.error('Error removing term:', error);
  });
}

// CRUD, create, read, update, delete

// read
export function getAllCourses(callback = () => {}) {
  const courseRef = ref(db, 'Term/');
  onValue(courseRef, (snapshot) => {
    const courses = snapshot.val();
    callback(courses);
  });
}

export function getCourseByTerm(termId, callback = () => {}) {
  const courseRef = ref(db, 'Terms/' + termId + '/courses/');
  onValue(courseRef, (snapshot) => {
    const courses = snapshot.val();
    callback(courses);
    console.log('successfully retrieved courses');
  });
}

export function getCourse(termId, courseId, callback = () => {}) {
  const reference = `Terms/Term/${termId}/${courseId}`;
  onValue(reference, (snapshot) => {
    const courses = snapshot.val();
    callback(courses);
  });
}
// export function addNewCourse(courseID, courseName, courseDistrib, courseNRO, coursePrereq, courseColor, courseCRN) {
//   set(ref(db, `Term/course/${courseID}`), {
//     name: courseName,
//     distrib: courseDistrib,
//     nro: courseNRO,
//     prereq: coursePrereq,
//     color: courseColor,
//     crn: courseCRN,
//     id: courseID
//   });
// }

export function addNewCourse(termID, course) {
  const coursesRef = push(ref(db, `Terms/${termID}/courses/`));
  set(coursesRef, {
    id: coursesRef.key,
    name: course,
  });
}

export function deleteCourse(termID, courseID) {
  remove(ref(db, `Terms/${termID}/courses/${courseID}`));
}

export function updateCourse(termID, courseID, newName) {
  update(ref(db, `Terms/${termID}/courses/${courseID}`), {
    name: newName,
  });
}

// export function updateCourse(termID, courseID, newName, newNRO, newColor, newCRN) {
//   update(ref(db, `Terms/${termID}/${courseID}`), {
//     name: newName,
//     nro: newNRO,
//     color: newColor,
//     crn: newCRN
//   });
// }

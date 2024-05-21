/* eslint-disable prefer-template */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase, ref, update, remove, onValue, get, push, set,
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

// *********** PLANS ********************
// add new plan draft
export function getAllDrafts(callback = () => {}) {
  const draftRef = ref(db, 'Draft/');
  onValue(draftRef, (snapshot) => {
    const drafts = snapshot.val();
    callback(drafts);
  });
}

export const addNewDraft = (draftName) => {
  const termList = [];

  // Loop to create and push 16 terms to '/Terms' collection
  for (let i = 0; i < 16; i += 1) {
    const newTermRef = push(ref(db, 'Terms/'));
    const termId = newTermRef.key; // Get the unique term ID generated by push

    const courseList = [];
    const newCourseRef = push(ref(db, 'Courses/')); // Generate unique course ID
    const courseId = newCourseRef.key;
    courseList.push({ // Add course reference to the term list with its ID
      id: courseId,
      name: 'Problem Solving via Object-Oriented Programming',
      crn: 'COSC10', // Modify with your course data
      distrib: 'TLA'
    });

    // {props.crn}: {props.name} ({props.distrib})
    termList.push({ // Add term reference to the draft list with its ID
      id: termId,
      termName: `term${i}`,
      courses: courseList,
      onTerm: true,
      comment: 'off term'
    });
  }

  // Add the new draft with the generated term list to '/Draft' collection
  const newDraftRef = push(ref(db, 'Draft/'));
  set(newDraftRef, {
    name: draftName,
    list: termList,
  });
};

// delete plan draft
export const delDraft = (draftId) => {
  console.log('Deleting draft with ID:', draftId);
  const deleteDraftRef = ref(db, `Draft/${draftId}`);
  remove(deleteDraftRef).then(() => {
    console.log('successfully deleted');
  }).catch((err) => {
    console.log(`error removing draft: ${err}`);
  });
};

// update plan draft
export const updateDraft = (draftId, newDraftName) => {
  update(ref(db, `Draft/${draftId}`), {
    name: newDraftName,
  });
};

// updates the list of terms in the draft
export const updateDraftTerm = (draftId, termList) => {
  update(ref(db, `Draft/${draftId}`), {
    list: termList,
  });
};

// *********** TERMS*****************
// add new term draft
export function addTermToDraft(termID, input) {
  const reference = ref(db, 'Terms/' + termID);
  push(reference, {
    termName: input.termName,
    courses: input.courses,
  });
}

export function getTerm(termID, callback = () => {}) {
  const drafRef = ref(db, 'Terms/' + termID);
  onValue(drafRef, (snapshot) => {
    const draft = snapshot.val(); // gets the snapshot of the data
    callback(draft); // return data to the caller
  });
}

// gets all terms
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
    termName: input.termName,
    courses: [],
  }).then(() => {
    callback(reference.key);
  }).catch((error) => {
    console.error('Error adding term: ', error);
  });
}

export function updateTermName(id, newName) {
  const TermRef = ref(db, 'Terms/' + id);
  update(TermRef, {
    termName: newName,
  }).then(() => { // Log on success
  }).catch((error) => {
    console.error('Failed to update term name:', error);
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

// *********** USERS / FRIENDS ***********

export function addUser(userID, input) {
  const reference = ref(db, 'users/' + userID);
  push(reference, {
    id: input.id,
    name: input.name,
    year: input.year,
    major: input.major,
    minor: input.minor,
    netid: input.netid,
    bio: input.bio,
    planid: input.planid,
  });
}
export function getUserData(userId) {
  const userRef = ref(db, `users/${userId}`);
  return new Promise((resolve, reject) => {
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        resolve(userData);
      } else {
        reject(new Error('No user found with this ID'));
      }
    }, {
      onlyOnce: true
    });
  });
}

export function updateUserData(userId, data) {
  const userRef = ref(db, `users/${userId}`);
  return update(userRef, data);
}

// delete user
export const removeUserData = (userId) => {
  const userRef = ref(db, `users/${userId}`);
  return remove(userRef);
};

// needed?
export function addFriend(userId, friendId) {
  push(ref(db, `friends/${userId}/${friendId}`), true);
}

// needed?
export function removeFriend(userId, friendId) {
  remove(ref(db, `friends/${userId}/${friendId}`));
}

export function addFollower(userId, followerId) {
  push(ref(db, `followers/${userId}/${followerId}`), true);
}

export function removeFollower(userId, followerId) {
  remove(ref(db, `followers/${userId}/${followerId}`));
}

export function addFollowing(userId, followingId) {
  push(ref(db, `following/${userId}/${followingId}`), true);
}

export function removeFollowing(userId, followingId) {
  remove(ref(db, `following/${userId}/${followingId}`));
}

export function addFriendRequest(fromUserId, toUserId) {
  push(ref(db, `requests/${toUserId}/incoming/${fromUserId}`), true);
  push(ref(db, `requests/${fromUserId}/outgoing/${toUserId}`), true);
}

export function removeFriendRequest(fromUserId, toUserId) {
  remove(ref(db, `requests/${toUserId}/incoming/${fromUserId}`));
  remove(ref(db, `requests/${fromUserId}/outgoing/${toUserId}`));
}

// friend list (mutual follows), following, followers, pending requests

export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const usersObj = snapshot.val();
      const usersArray = usersObj ? Object.keys(usersObj).map((key) => ({
        ...usersObj[key],
        id: key
      })) : [];
      resolve(usersArray);
    }, {
      onlyOnce: true
    }, (error) => {
      reject(error);
    });
  });
};

// ************* COURSES ****************
// read
export function getAllCourses(callback = () => {}) {
  const courseRef = ref(db, 'course/');
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

export function addNewCourse(courseName, courseDistrib, courseNRO, coursePrereq, courseColor, courseCRN) {
  console.log(courseName, courseDistrib, courseNRO, coursePrereq, courseColor, courseCRN);
  push(ref(db, 'course/'), {
    name: courseName,
    distrib: courseDistrib,
    nro: courseNRO,
    prereq: coursePrereq,
    color: courseColor,
    crn: courseCRN,
  });
}

export function addNewCourseInTerm(termID, course) {
  const coursesRef = push(ref(db, 'Terms/' + termID + '/courses'));
  set(coursesRef, {
    id: coursesRef.key,
    name: course,
  }).then(() => {
    console.log('Course added successfully');
  }).catch((error) => {
    console.error('Error adding course: ', error);
  });
}

export function deleteCourseInTerm(termID, courseID) {
  remove(ref(db, `Terms/${termID}/courses/${courseID}`));
}

export function deleteCourse(deleteId) {
  remove(ref(db, `course/${deleteId}`));
}

export function updateCourse(newName, newNRO, newColor, newCRN) {
  update(ref(db, 'course/'), {
    name: newName,
  });
}

/* FEED PAGE TERM + SHARE FIREBASE FUNCTIONS */
export function getAllFeedUsers(callback = () => {}) {
  const draftRef = ref(db, 'Feed_Users/');
  onValue(draftRef, (snapshot) => {
    const posts = snapshot.val();
    callback(posts);
  });
}

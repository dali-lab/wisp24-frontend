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

export function getTerm(draftID, callback = () => {}) {
  const drafRef = ref(db, 'drafts/' + draftID);
  onValue(drafRef, (snapshot) => {
    const draft = snapshot.val(); // gets the snapshot of the data
    callback(draft); // return data to the caller
  });
}

export function getAllTerm(callback = () => {}) {
  const draftRef = ref(db, 'drafts/');
  onValue(draftRef, (snapshot) => {
    const drafts = snapshot.val();
    callback(drafts);
  });
}
/* TERM SUBMIT */
export function addTerm(termID, input) {
  const reference = ref(db, 'drafts/' + termID);
  set(reference, { // get unique id
    id: termID,
    draftName: input.draftName,
    classList: input.classList,
  });
}
export function updateTerm(id, data) {
  const drafRef = ref(db, 'drafts/' + id);
  update(drafRef, {
    draftName: data.draftName,
    classList: data.classList,
  });
}

export function deleteTerm(draftID) {
  const termRef = ref(db, 'drafts/' + draftID);
  remove(termRef).then(() => {
    console.log('Term successfully deleted.');
  }).catch((error) => {
    console.error('Error removing term:', error);
  });
}

export const getUserData = (userId) => {
  return new Promise((resolve, reject) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, {
      onlyOnce: true
    });
  });
};

export const updateUserData = (userId, updates) => {
  const userRef = ref(db, `users/${userId}`);
  return update(userRef, updates);
};

export const addUserData = (userId, data) => {
  const userRef = ref(db, `users/${userId}`);
  return set(userRef, data);
};

export const removeUserData = (userId) => {
  const userRef = ref(db, `users/${userId}`);
  return remove(userRef);
};

/* eslint-disable prefer-template */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase, ref, set, update, remove, onValue
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

// access to all terms of the user
export function addTerm(draftName, draftID, input) {
  set(ref(db, 'drafts/' + draftID), {
    name: draftName,
    classes: input, // array of input classes
  });
}

export function getTerm(draftID, callback = () => {}, location) {
  // location is a boolean
  // true  === plan
  // false === component
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

export function updateDraftName(draftName, newName) {
  const drafRef = ref(db, 'draft/' + draftName);
  update(drafRef, {
    name: newName,
  });
}

export function updateClasses(draftID) {
  const drafRef = ref(db, 'draft/' + draftID);
}

export function deleteTerm(draftID) {
  remove(ref(db, 'draft/' + draftID));
}

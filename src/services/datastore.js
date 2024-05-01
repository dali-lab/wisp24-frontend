/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase, ref, update, remove, onValue, get, push
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

export function getAllDrafts(callback = () => {}) {
  const draftRef = ref(db, 'Draft/');
  // Listen for changes and update callback
  onValue(draftRef, (snapshot) => {
    const drafts = snapshot.val();
    callback(drafts);
  });
}

export const addNewDraft = (draftName, termList) => {
  const newDraftRef = ref(db, 'Draft/');
  push(newDraftRef, {
    name: draftName,
    list: termList,
  });
};

export const delDraft = (draftId) => {
  console.log('Deleting draft with ID:', draftId);
  const deleteDraftRef = ref(db, `Draft/${draftId}`);
  remove(deleteDraftRef).then(() => {
    console.log('successfully deleted');
  }).catch((err) => {
    console.log(`error removing draft: ${err}`);
  });
};

export const updateDraft = (draftId, newDraftName) => {
  update(ref(db, `Draft/${draftId}`), {
    name: newDraftName,
  });
};

export const updateDraftTerm = (draftId, termList) => {
  update(ref(db, `Draft/${draftId}`), {
    list: termList,
  });
};

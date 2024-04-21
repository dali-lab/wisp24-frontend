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

// Initialize the Firebase Realtime Database
const db = getDatabase(initializeApp(firebaseConfig));

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

export function addFriend(userId, friendId) {
  set(ref(db, `friends/${userId}/${friendId}`), true);
}

export function removeFriend(userId, friendId) {
  remove(ref(db, `friends/${userId}/${friendId}`));
}

export function addFollower(userId, followerId) {
  set(ref(db, `followers/${userId}/${followerId}`), true);
}

export function removeFollower(userId, followerId) {
  remove(ref(db, `followers/${userId}/${followerId}`));
}

export function addFollowing(userId, followingId) {
  set(ref(db, `following/${userId}/${followingId}`), true);
}

export function removeFollowing(userId, followingId) {
  remove(ref(db, `following/${userId}/${followingId}`));
}

export function addFriendRequest(fromUserId, toUserId) {
  set(ref(db, `requests/${toUserId}/incoming/${fromUserId}`), true);
  set(ref(db, `requests/${fromUserId}/outgoing/${toUserId}`), true);
}

export function removeFriendRequest(fromUserId, toUserId) {
  remove(ref(db, `requests/${toUserId}/incoming/${fromUserId}`));
  remove(ref(db, `requests/${fromUserId}/outgoing/${toUserId}`));
}

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

import firebase from 'firebase/app';
// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXocxrJ6dI0VJkK6lVuBI0xFkcc8i2Dbc",
    authDomain: "chat-app-2c0c3.firebaseapp.com",
    projectId: "chat-app-2c0c3",
    storageBucket: "chat-app-2c0c3.appspot.com",
    messagingSenderId: "759504637577",
    appId: "1:759504637577:web:639ba59d5cd5aa64774058",
    measurementId: "G-EKL840697F"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  const auth = getAuth(app);
  const db = getFirestore(app);
  export {auth, db}
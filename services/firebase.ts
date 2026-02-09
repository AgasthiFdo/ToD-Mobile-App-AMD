// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-fL4L0mQHjIA7i8jRlcf4qk-UFtGqvvs",
  authDomain: "tod-app1-7a4b7.firebaseapp.com",
  projectId: "tod-app1-7a4b7",
  storageBucket: "tod-app1-7a4b7.firebasestorage.app",
  messagingSenderId: "381866301633",
  appId: "1:381866301633:web:c862385e23375aec099c40",
  measurementId: "G-DWZGTTNS9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);


// //////////////////////////////////
// Firebase from zeroalfa
// //////////////////////////////////
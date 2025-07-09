// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARjhLuFPSqcDiwtMD-UOKwL6B6G0lwmNE",
  authDomain: "smart-driving-coach.firebaseapp.com",
  projectId: "smart-driving-coach",
  storageBucket: "smart-driving-coach.firebasestorage.app",
  messagingSenderId: "263402964580",
  appId: "1:263402964580:web:b7b1a598293b18fc940171"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
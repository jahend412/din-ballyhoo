// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCz0HZtzJt3cYn7eXm_n47F_z3Wy_qklY",
  authDomain: "din-ballyhoo.firebaseapp.com",
  projectId: "din-ballyhoo",
  storageBucket: "din-ballyhoo.firebasestorage.app",
  messagingSenderId: "57699491711",
  appId: "1:57699491711:web:e14e3b5e1ae8d3a0d5444a",
  measurementId: "G-26Q3DCR0E4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

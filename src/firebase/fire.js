import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-EKgRIPBE9z0DXFxR4_fZBsMipDEIE2E",
  authDomain: "d-track-9e6b0.firebaseapp.com",
  databaseURL: "https://d-track-9e6b0.firebaseio.com",
  projectId: "d-track-9e6b0",
  storageBucket: "d-track-9e6b0.appspot.com",
  messagingSenderId: "293489289946",
  appId: "1:293489289946:web:30c0b7c3cc9fd2c0b513e3",
  measurementId: "G-DT902EGQH9"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

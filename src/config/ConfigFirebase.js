import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "REPLACE_HERE",
//   authDomain: "REPLACE_HERE",
//   projectId: "REPLACE_HERE",
//   storageBucket: "REPLACE_HERE",
//   messagingSenderId: "REPLACE_HERE",
//   appId: "REPLACE_HERE"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDUfm6fkCFqOxnJbDp7OuVqbeCX4G3CMRg",
  authDomain: "gymapp-a2aac.firebaseapp.com",
  projectId: "gymapp-a2aac",
  storageBucket: "gymapp-a2aac.appspot.com",
  messagingSenderId: "613452939712",
  appId: "1:613452939712:web:4c19c68798b247adaec825",
  measurementId: "G-MHVEVVSC7Q"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
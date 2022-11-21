// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from "firebase/app"; //copilot
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDTBrIkVvibxlWTgwvLvUwA9RdrXuKunuI",
  authDomain: "dishi-42a24.firebaseapp.com",
  projectId: "dishi-42a24",
  storageBucket: "dishi-42a24.appspot.com",
  messagingSenderId: "877721823360",
  appId: "1:877721823360:web:8e558f8bf666dc3d171e65",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
export default auth;

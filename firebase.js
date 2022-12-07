// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from "firebase/app"; //copilot
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';


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
// Initialize firestore
const db = getFirestore(app);

// initialize auth

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});



export default auth;






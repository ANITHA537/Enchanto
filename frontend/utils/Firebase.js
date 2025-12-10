// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginenchanto.firebaseapp.com",
  projectId: "loginenchanto",
  storageBucket: "loginenchanto.firebasestorage.app",
  messagingSenderId: "468305518236",
  appId: "1:468305518236:web:19c4ad5764b3e032a35759",
  measurementId: "G-97GHM81YNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider= new GoogleAuthProvider()

export {auth,provider}
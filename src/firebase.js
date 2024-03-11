import { initializeApp } from "firebase/app" 
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyC-4defqzwnRRHfQJjhvsWRhLf1DlMSVoM",
    authDomain: "l4ac---todo-app.firebaseapp.com",
    projectId: "l4ac---todo-app",
    storageBucket: "l4ac---todo-app.appspot.com",
    messagingSenderId: "372697902995",
    appId: "1:372697902995:web:0a1b28d15990d65db4c266",
    measurementId: "G-2YTQNF0G6X"   
  };
  
const app = initializeApp(firebaseConfig) 
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const db = getFirestore(app) 
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth}; // Add this line
export {db}
export {provider} 

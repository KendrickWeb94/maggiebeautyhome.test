// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-D58vWckNJPzVRmauknU96_q187lNvI8",
  authDomain: "maggie-beauty-home.firebaseapp.com",
  projectId: "maggie-beauty-home",
  storageBucket: "maggie-beauty-home.firebasestorage.app",
  messagingSenderId: "976214524498",
  appId: "1:976214524498:web:3bed7cd1ff23606f75958b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, db, googleProvider, appleProvider, app };
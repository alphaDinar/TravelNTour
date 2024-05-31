import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import {getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAs36M6btwpFLvE7iTna3taFVHG787ceE",
  authDomain: "travel-954ad.firebaseapp.com",
  projectId: "travel-954ad",
  storageBucket: "travel-954ad.appspot.com",
  messagingSenderId: "432215911567",
  appId: "1:432215911567:web:8c835800b87b7270e514fa",
  measurementId: "G-KXTVCWQ3NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const fireAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const fireStoreDB = getFirestore(app);
export const storageDB = getStorage(app);

console.log('firebase');

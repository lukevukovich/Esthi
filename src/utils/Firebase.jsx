import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7Kl5uqLwgHp-HqrLcREIg3ndVo38Je_o",
  authDomain: "esthi1.firebaseapp.com",
  projectId: "esthi1",
  storageBucket: "esthi1.appspot.com",
  messagingSenderId: "578756945741",
  appId: "1:578756945741:web:ed9ee47d0f29cd68b4b904",
  measurementId: "G-JNNB2HP4Z3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
//export const auth = getAuth(app);
//export const db = getFirestore(app);

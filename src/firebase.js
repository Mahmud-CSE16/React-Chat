// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDbspPFjud73KSIAc64BZeSkIjqEbRf78k",
  authDomain: "flash-chat-7142f.firebaseapp.com",
  databaseURL: "https://flash-chat-7142f.firebaseio.com",
  projectId: "flash-chat-7142f",
  storageBucket: "flash-chat-7142f.appspot.com",
  messagingSenderId: "171428454842",
  appId: "1:171428454842:web:633bf7c98351e5a6a6bd83",
  measurementId: "G-6XL7VQ4R31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);
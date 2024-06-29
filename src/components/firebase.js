import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-GiTzFlrUK11_k3UIB90VIneSy5JafS4",

  authDomain: "royal-matka-a33c5.firebaseapp.com",

  databaseURL: "https://royal-matka-a33c5-default-rtdb.firebaseio.com",

  projectId: "royal-matka-a33c5",

  storageBucket: "royal-matka-a33c5.appspot.com",

  messagingSenderId: "218051870057",

  appId: "1:218051870057:web:fa67f268728f7ab71911f8",

  measurementId: "G-NC6V7PSJLP"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
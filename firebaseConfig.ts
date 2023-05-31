import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBEww9gWU7zJ_JpEU_DZJxYcdrSZ-yfE40",
    authDomain: "todoapp-728e1.firebaseapp.com",
    projectId: "todoapp-728e1",
    storageBucket: "todoapp-728e1.appspot.com",
    messagingSenderId: "150117162395",
    appId: "1:150117162395:web:0b95434bf9eb5dd284953e",
    measurementId: "G-TS2K0LS9LB"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

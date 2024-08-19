import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCI5dFry-4fih4uQ5UpLEJbv59I7QGxQM",
    authDomain: "expensetracker-62b50.firebaseapp.com",
    projectId: "expensetracker-62b50",
    storageBucket: "expensetracker-62b50.appspot.com",
    messagingSenderId: "192885537911",
    appId: "1:192885537911:web:0665822b8fbfc36871da72"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
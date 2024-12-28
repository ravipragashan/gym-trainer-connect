import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOuqUCvxTHaWHrEUhVcrSa2TKuf91EMUM",
  authDomain: "gofit-sl.firebaseapp.com",
  projectId: "gofit-sl",
  storageBucket: "gofit-sl.firebasestorage.app",
  messagingSenderId: "852513019749",
  appId: "1:852513019749:web:45148872dcace95c4f738c",
  measurementId: "G-RKYF5FKERY"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };


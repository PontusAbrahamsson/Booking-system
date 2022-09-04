import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

//Auth
export const auth = getAuth(app)
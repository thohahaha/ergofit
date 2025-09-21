// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { environment } from '../../environments/environment';

// Initialize Firebase with environment configuration
export const app = initializeApp(environment.firebase);

// Initialize Firebase Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { environment } from '../../environments/environment';

// Initialize Firebase with environment configuration
export const app = initializeApp(environment.firebase);

// Initialize Firebase Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firestore with settings
export const firestore = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Enable offline persistence and better error handling
if (typeof window !== 'undefined') {
  // Handle online/offline status
  window.addEventListener('online', () => {
    console.log('Network online - enabling Firestore');
    enableNetwork(firestore).catch(console.error);
  });
  
  window.addEventListener('offline', () => {
    console.log('Network offline - disabling Firestore');
    disableNetwork(firestore).catch(console.error);
  });
}

export default app;
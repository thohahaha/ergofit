import { InjectionToken, inject } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { environment } from '../../environments/environment';

// Injection tokens for Firebase services
export const FIREBASE_APP = new InjectionToken<FirebaseApp>('firebase.app');
export const FIREBASE_ANALYTICS = new InjectionToken<Analytics>('firebase.analytics');
export const FIREBASE_FIRESTORE = new InjectionToken<Firestore>('firebase.firestore');
export const FIREBASE_AUTH = new InjectionToken<Auth>('firebase.auth');

// Firebase providers for dependency injection
export function provideFirebase() {
  return [
    {
      provide: FIREBASE_APP,
      useFactory: () => initializeApp(environment.firebase)
    },
    {
      provide: FIREBASE_ANALYTICS,
      useFactory: () => {
        const app = inject(FIREBASE_APP);
        return typeof window !== 'undefined' ? getAnalytics(app) : null;
      }
    },
    {
      provide: FIREBASE_FIRESTORE,
      useFactory: () => {
        const app = inject(FIREBASE_APP);
        return getFirestore(app);
      }
    },
    {
      provide: FIREBASE_AUTH,
      useFactory: () => {
        const app = inject(FIREBASE_APP);
        return getAuth(app);
      }
    }
  ];
}
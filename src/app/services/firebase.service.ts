import { Injectable, inject } from '@angular/core';
import { logEvent, Analytics } from 'firebase/analytics';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  Firestore
} from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { 
  FIREBASE_ANALYTICS, 
  FIREBASE_FIRESTORE, 
  FIREBASE_AUTH 
} from '../providers/firebase.providers';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private analytics = inject(FIREBASE_ANALYTICS);
  private firestore = inject(FIREBASE_FIRESTORE);
  private auth = inject(FIREBASE_AUTH);

  constructor() {}

  // Analytics Methods
  logPostureEvent(eventName: string, parameters?: any) {
    if (this.analytics) {
      logEvent(this.analytics, eventName, parameters);
    }
  }

  logPageView(pageName: string) {
    if (this.analytics) {
      logEvent(this.analytics, 'page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
  }

  // Posture Data Methods
  async savePostureData(userId: string, data: any) {
    try {
      const postureRef = collection(this.firestore, 'posture_data');
      await addDoc(postureRef, {
        userId,
        timestamp: new Date(),
        ...data
      });
      
      this.logPostureEvent('posture_data_saved', {
        user_id: userId,
        posture_score: data.postureScore
      });
    } catch (error) {
      console.error('Error saving posture data:', error);
    }
  }

  async getUserPostureHistory(userId: string, limitCount: number = 10) {
    try {
      const postureRef = collection(this.firestore, 'posture_data');
      const q = query(
        postureRef, 
        orderBy('timestamp', 'desc'), 
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const history: any[] = [];
      
      querySnapshot.forEach((doc) => {
        history.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return history;
    } catch (error) {
      console.error('Error fetching posture history:', error);
      return [];
    }
  }

  // User Settings Methods
  async saveUserSettings(userId: string, settings: any) {
    try {
      const userRef = doc(this.firestore, 'user_settings', userId);
      await setDoc(userRef, {
        ...settings,
        updatedAt: new Date()
      }, { merge: true });
      
      this.logPostureEvent('settings_updated', {
        user_id: userId
      });
    } catch (error) {
      console.error('Error saving user settings:', error);
    }
  }

  async getUserSettings(userId: string) {
    try {
      const userRef = doc(this.firestore, 'user_settings', userId);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Return default settings
        return {
          notificationsEnabled: true,
          soundEnabled: true,
          darkModeEnabled: false,
          reminderInterval: 30,
          sensitivity: 5,
          selectedLanguage: 'id'
        };
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return null;
    }
  }

  // Analytics and Metrics
  async saveAnalyticsData(userId: string, analyticsData: any) {
    try {
      const analyticsRef = collection(this.firestore, 'analytics_data');
      await addDoc(analyticsRef, {
        userId,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        timestamp: new Date(),
        ...analyticsData
      });
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  }

  // Recommendations tracking
  async logRecommendationUsage(userId: string, recommendationType: string) {
    try {
      const recommendationRef = collection(this.firestore, 'recommendation_usage');
      await addDoc(recommendationRef, {
        userId,
        type: recommendationType,
        timestamp: new Date()
      });
      
      this.logPostureEvent('recommendation_used', {
        user_id: userId,
        recommendation_type: recommendationType
      });
    } catch (error) {
      console.error('Error logging recommendation usage:', error);
    }
  }
}
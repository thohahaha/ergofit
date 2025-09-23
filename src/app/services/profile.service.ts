import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService, UserProfile } from './auth.service';
import { FIREBASE_FIRESTORE } from '../providers/firebase.providers';

export interface ErgoFitUserProfile extends UserProfile {
  level: number;
  title: string;
  totalPoints: number;
  currentStreak: number;
  totalHours: number;
  accuracyScore: number;
  workType?: string;
  bio?: string;
  joinDate: Date;
  achievements: Achievement[];
  weeklyStats: WeeklyStats;
  preferences: UserPreferences;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: string;
}

export interface WeeklyStats {
  postureScores: number[];
  activityLevels: number[];
  dates: string[];
}

export interface UserPreferences {
  postureReminders: boolean;
  breakNotifications: boolean;
  achievementAlerts: boolean;
  reminderInterval: number;
  sensitivity: number;
  darkMode: boolean;
  colorTheme: string;
  animationLevel: string;
  fontSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private firestore: Firestore = inject(FIREBASE_FIRESTORE);
  private authService = inject(AuthService);

  private userProfileSubject = new BehaviorSubject<ErgoFitUserProfile | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor() {
    // Listen to auth state changes and load profile accordingly
    this.authService.currentUser$.subscribe(async (user) => {
      if (user) {
        await this.loadUserProfile(user.uid);
      } else {
        this.userProfileSubject.next(null);
      }
    });
  }

  get currentProfile(): ErgoFitUserProfile | null {
    return this.userProfileSubject.value;
  }

  /**
   * Load user profile with retry mechanism
   */
  async loadUserProfile(uid: string, retryCount: number = 0): Promise<ErgoFitUserProfile | null> {
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
    
    try {
      const userDocRef = doc(this.firestore, 'userProfiles', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data() as DocumentData;
        const profile: ErgoFitUserProfile = {
          uid: data['uid'],
          email: data['email'],
          displayName: data['displayName'],
          photoURL: data['photoURL'],
          emailVerified: data['emailVerified'] || false,
          level: data['level'] || 1,
          title: data['title'] || 'Beginner',
          totalPoints: data['totalPoints'] || 0,
          currentStreak: data['currentStreak'] || 0,
          totalHours: data['totalHours'] || 0,
          accuracyScore: data['accuracyScore'] || 85,
          workType: data['workType'],
          bio: data['bio'],
          joinDate: data['joinDate']?.toDate() || new Date(),
          achievements: data['achievements'] || [],
          weeklyStats: data['weeklyStats'] || {
            postureScores: [85, 80, 90, 75, 88, 82, 85],
            activityLevels: [60, 70, 80, 55, 75, 65, 70],
            dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          preferences: data['preferences'] || this.getDefaultPreferences()
        };
        
        this.userProfileSubject.next(profile);
        return profile;
      } else {
        // Create initial profile for new user
        const newProfile = await this.createInitialProfile(uid);
        this.userProfileSubject.next(newProfile);
        return newProfile;
      }
    } catch (error: any) {
      console.error(`Error loading user profile (attempt ${retryCount + 1}):`, error);
      
      // Handle different types of errors
      if (error?.code === 'unavailable' || error?.message?.includes('offline')) {
        console.log('Client is offline, using cached/minimal profile');
        return this.createOfflineProfile(uid);
      }
      
      // Retry for transient errors
      if (retryCount < maxRetries && this.isRetryableError(error)) {
        console.log(`Retrying in ${retryDelay}ms... (${retryCount + 1}/${maxRetries})`);
        await this.delay(retryDelay);
        return this.loadUserProfile(uid, retryCount + 1);
      }
      
      // For other errors or max retries reached, return offline profile
      console.error('Max retries reached or non-retryable error, using offline profile');
      return this.createOfflineProfile(uid);
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    const retryableCodes = ['unavailable', 'deadline-exceeded', 'internal', 'aborted'];
    return retryableCodes.includes(error?.code);
  }

  /**
   * Delay utility for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Create offline profile
   */
  private createOfflineProfile(uid: string): ErgoFitUserProfile {
    const authUser = this.authService.currentUser;
    const offlineProfile: ErgoFitUserProfile = {
      uid: uid,
      displayName: authUser?.displayName || 'User',
      email: authUser?.email || '',
      photoURL: authUser?.photoURL,
      emailVerified: authUser?.emailVerified || false,
      level: 1,
      title: 'Beginner',
      totalPoints: 0,
      currentStreak: 0,
      totalHours: 0,
      accuracyScore: 85,
      joinDate: new Date(),
      achievements: [],
      weeklyStats: {
        postureScores: [85, 80, 90, 75, 88, 82, 85],
        activityLevels: [60, 70, 80, 55, 75, 65, 70],
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      preferences: this.getDefaultPreferences()
    };
    
    this.userProfileSubject.next(offlineProfile);
    return offlineProfile;
  }

  /**
   * Get default preferences
   */
  private getDefaultPreferences(): UserPreferences {
    return {
      postureReminders: true,
      breakNotifications: true,
      achievementAlerts: true,
      reminderInterval: 30,
      sensitivity: 50,
      darkMode: false,
      colorTheme: 'blue',
      animationLevel: 'medium',
      fontSize: 14
    };
  }

  /**
   * Create initial profile for new users
   */
  private async createInitialProfile(uid: string): Promise<ErgoFitUserProfile> {
    const authUser = this.authService.currentUser;
    if (!authUser) throw new Error('No authenticated user');

    const initialProfile: ErgoFitUserProfile = {
      uid: authUser.uid,
      email: authUser.email!,
      displayName: authUser.displayName || 'ErgoFit User',
      photoURL: authUser.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg',
      emailVerified: authUser.emailVerified,
      level: 1,
      title: 'Ergonomic Beginner',
      totalPoints: 0,
      currentStreak: 0,
      totalHours: 0,
      accuracyScore: 0,
      workType: 'office',
      bio: 'New to ergonomic health journey.',
      joinDate: new Date(),
      achievements: this.getInitialAchievements(),
      weeklyStats: {
        postureScores: [0, 0, 0, 0, 0, 0, 0],
        activityLevels: [0, 0, 0, 0, 0, 0, 0],
        dates: this.getLastSevenDays()
      },
      preferences: this.getDefaultPreferences()
    };

    // Save to Firestore
    await this.saveUserProfile(initialProfile);
    return initialProfile;
  }

  /**
   * Save user profile to Firestore
   */
  async saveUserProfile(profile: ErgoFitUserProfile): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', profile.uid);
      await setDoc(userRef, this.mapProfileToFirestore(profile), { merge: true });
      this.userProfileSubject.next(profile);
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  /**
   * Update specific profile fields
   */
  async updateProfile(updates: Partial<ErgoFitUserProfile>): Promise<void> {
    const currentProfile = this.currentProfile;
    if (!currentProfile) throw new Error('No current profile');

    const updatedProfile = { ...currentProfile, ...updates };
    await this.saveUserProfile(updatedProfile);
  }

  /**
   * Update user stats (points, streak, hours, accuracy)
   */
  async updateStats(stats: {
    pointsEarned?: number;
    hoursAdded?: number;
    accuracyScore?: number;
    maintainStreak?: boolean;
  }): Promise<void> {
    const currentProfile = this.currentProfile;
    if (!currentProfile) return;

    const updates: Partial<ErgoFitUserProfile> = {};

    if (stats.pointsEarned) {
      updates.totalPoints = currentProfile.totalPoints + stats.pointsEarned;
      // Check for level up
      updates.level = Math.floor(updates.totalPoints / 1000) + 1;
      updates.title = this.getTitleForLevel(updates.level);
    }

    if (stats.hoursAdded) {
      updates.totalHours = currentProfile.totalHours + stats.hoursAdded;
    }

    if (stats.accuracyScore !== undefined) {
      updates.accuracyScore = stats.accuracyScore;
    }

    if (stats.maintainStreak !== undefined) {
      if (stats.maintainStreak) {
        updates.currentStreak = currentProfile.currentStreak + 1;
      } else {
        updates.currentStreak = 0;
      }
    }

    await this.updateProfile(updates);
  }

  /**
   * Update weekly stats
   */
  async updateWeeklyStats(postureScore: number, activityLevel: number): Promise<void> {
    const currentProfile = this.currentProfile;
    if (!currentProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const todayIndex = currentProfile.weeklyStats.dates.indexOf(today);

    if (todayIndex !== -1) {
      // Update today's stats
      currentProfile.weeklyStats.postureScores[todayIndex] = postureScore;
      currentProfile.weeklyStats.activityLevels[todayIndex] = activityLevel;
    } else {
      // Shift array and add new day
      currentProfile.weeklyStats.postureScores.shift();
      currentProfile.weeklyStats.postureScores.push(postureScore);
      
      currentProfile.weeklyStats.activityLevels.shift();
      currentProfile.weeklyStats.activityLevels.push(activityLevel);
      
      currentProfile.weeklyStats.dates.shift();
      currentProfile.weeklyStats.dates.push(today);
    }

    await this.updateProfile({ weeklyStats: currentProfile.weeklyStats });
  }

  /**
   * Unlock achievement
   */
  async unlockAchievement(achievementId: string): Promise<void> {
    const currentProfile = this.currentProfile;
    if (!currentProfile) return;

    const achievementIndex = currentProfile.achievements.findIndex(a => a.id === achievementId);
    if (achievementIndex !== -1 && !currentProfile.achievements[achievementIndex].unlocked) {
      currentProfile.achievements[achievementIndex].unlocked = true;
      currentProfile.achievements[achievementIndex].unlockedAt = new Date();
      currentProfile.achievements[achievementIndex].progress = 'Completed';

      // Award points for achievement
      await this.updateStats({ pointsEarned: 100 });
      await this.updateProfile({ achievements: currentProfile.achievements });
    }
  }

  /**
   * Update user preferences
   */
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const currentProfile = this.currentProfile;
    if (!currentProfile) return;

    const updatedPreferences = { ...currentProfile.preferences, ...preferences };
    await this.updateProfile({ preferences: updatedPreferences });
  }

  // Helper methods
  private mapFirestoreToProfile(data: DocumentData, uid: string): ErgoFitUserProfile {
    return {
      uid,
      email: data['email'],
      displayName: data['displayName'],
      photoURL: data['photoURL'],
      emailVerified: data['emailVerified'] || false,
      level: data['level'] || 1,
      title: data['title'] || 'Ergonomic Beginner',
      totalPoints: data['totalPoints'] || 0,
      currentStreak: data['currentStreak'] || 0,
      totalHours: data['totalHours'] || 0,
      accuracyScore: data['accuracyScore'] || 0,
      workType: data['workType'] || 'office',
      bio: data['bio'] || '',
      joinDate: data['joinDate']?.toDate() || new Date(),
      achievements: data['achievements'] || this.getInitialAchievements(),
      weeklyStats: data['weeklyStats'] || {
        postureScores: [0, 0, 0, 0, 0, 0, 0],
        activityLevels: [0, 0, 0, 0, 0, 0, 0],
        dates: this.getLastSevenDays()
      },
      preferences: data['preferences'] || this.getDefaultPreferences()
    };
  }

  private mapProfileToFirestore(profile: ErgoFitUserProfile): DocumentData {
    return {
      email: profile.email,
      displayName: profile.displayName,
      photoURL: profile.photoURL,
      emailVerified: profile.emailVerified,
      level: profile.level,
      title: profile.title,
      totalPoints: profile.totalPoints,
      currentStreak: profile.currentStreak,
      totalHours: profile.totalHours,
      accuracyScore: profile.accuracyScore,
      workType: profile.workType,
      bio: profile.bio,
      joinDate: profile.joinDate,
      achievements: profile.achievements,
      weeklyStats: profile.weeklyStats,
      preferences: profile.preferences,
      updatedAt: new Date()
    };
  }

  private getInitialAchievements(): Achievement[] {
    return [
      {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first session',
        icon: 'medal-outline',
        unlocked: false,
        progress: '0/1'
      },
      {
        id: 'week_warrior',
        name: 'Week Warrior',
        description: '7 days streak',
        icon: 'ribbon-outline',
        unlocked: false,
        progress: '0/7'
      },
      {
        id: 'perfect_posture',
        name: 'Perfect Posture',
        description: '95% accuracy for a week',
        icon: 'shield-checkmark-outline',
        unlocked: false,
        progress: '0%'
      },
      {
        id: 'time_master',
        name: 'Time Master',
        description: '100 hours monitored',
        icon: 'star-outline',
        unlocked: false,
        progress: '0/100'
      }
    ];
  }

  private getTitleForLevel(level: number): string {
    if (level < 5) return 'Ergonomic Beginner';
    if (level < 10) return 'Posture Apprentice';
    if (level < 15) return 'Wellness Warrior';
    if (level < 20) return 'Health Guardian';
    if (level < 25) return 'Ergonomic Expert';
    return 'Ergonomic Master';
  }

  private getLastSevenDays(): string[] {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }
}
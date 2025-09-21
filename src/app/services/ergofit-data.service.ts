import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ErgoFitDataService {
  
  constructor(private firebaseService: FirebaseService) {}

  // Generate a unique user ID (in real app, this would come from authentication)
  private getUserId(): string {
    return 'user_' + Date.now().toString();
  }

  // Save posture monitoring data
  async savePostureReading(postureData: {
    neckScore: number;
    backScore: number;
    shoulderScore: number;
    hipScore: number;
    overallScore: number;
  }) {
    const userId = this.getUserId();
    
    await this.firebaseService.savePostureData(userId, {
      ...postureData,
      sessionId: 'session_' + Date.now(),
      deviceType: 'web_browser'
    });

    // Log analytics event
    this.firebaseService.logPostureEvent('posture_reading_saved', {
      overall_score: postureData.overallScore,
      session_type: 'monitoring'
    });
  }

  // Save user exercise/recommendation activity
  async logExerciseActivity(exerciseType: string, duration: number) {
    const userId = this.getUserId();
    
    await this.firebaseService.logRecommendationUsage(userId, exerciseType);
    
    // Additional analytics
    this.firebaseService.logPostureEvent('exercise_completed', {
      exercise_type: exerciseType,
      duration_seconds: duration
    });
  }

  // Save daily analytics summary
  async saveDailyAnalytics(analyticsData: {
    totalWorkingHours: number;
    postureScore: number;
    breaksTaken: number;
    recommendationsFollowed: number;
  }) {
    const userId = this.getUserId();
    
    await this.firebaseService.saveAnalyticsData(userId, analyticsData);
    
    this.firebaseService.logPostureEvent('daily_summary_saved', {
      working_hours: analyticsData.totalWorkingHours,
      avg_posture_score: analyticsData.postureScore
    });
  }

  // Get user's posture history
  async getPostureHistory(limit: number = 7) {
    const userId = this.getUserId();
    return await this.firebaseService.getUserPostureHistory(userId, limit);
  }

  // Save and retrieve user settings
  async saveUserSettings(settings: any) {
    const userId = this.getUserId();
    await this.firebaseService.saveUserSettings(userId, settings);
  }

  async getUserSettings() {
    const userId = this.getUserId();
    return await this.firebaseService.getUserSettings(userId);
  }
}
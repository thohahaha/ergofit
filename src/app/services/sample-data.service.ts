import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {

  constructor(private profileService: ProfileService) {}

  /**
   * Initialize sample data for new users (for testing purposes)
   */
  async initializeSampleData(): Promise<void> {
    const profile = this.profileService.currentProfile;
    if (!profile) return;

    // Add some sample stats
    await this.profileService.updateStats({
      pointsEarned: 1250,
      hoursAdded: 48,
      accuracyScore: 87,
      maintainStreak: true
    });

    // Add sample weekly stats
    await this.profileService.updateWeeklyStats(85, 78);
    
    // Unlock a couple of achievements for demo
    await this.profileService.unlockAchievement('first_steps');
    await this.profileService.unlockAchievement('week_warrior');
  }

  /**
   * Add sample activity for today
   */
  async addSampleActivity(): Promise<void> {
    // Simulate a monitoring session
    await this.profileService.updateStats({
      pointsEarned: 150,
      hoursAdded: 2,
      accuracyScore: 92,
      maintainStreak: true
    });

    // Update today's stats
    const today = new Date();
    const postureScore = Math.floor(Math.random() * 20) + 80; // 80-100
    const activityLevel = Math.floor(Math.random() * 30) + 70; // 70-100
    
    await this.profileService.updateWeeklyStats(postureScore, activityLevel);
  }

  /**
   * Simulate a week of progress data
   */
  async generateWeekOfData(): Promise<void> {
    const profile = this.profileService.currentProfile;
    if (!profile) return;

    // Generate realistic weekly data
    const postureScores = [82, 85, 88, 84, 91, 87, 89];
    const activityLevels = [75, 78, 82, 79, 88, 85, 91];
    
    // Update weekly stats directly
    const weeklyStats = {
      postureScores,
      activityLevels,
      dates: this.getLastSevenDays()
    };

    await this.profileService.updateProfile({ weeklyStats });

    // Add total progress
    await this.profileService.updateStats({
      pointsEarned: 850,
      hoursAdded: 14,
      accuracyScore: 87,
      maintainStreak: true
    });
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
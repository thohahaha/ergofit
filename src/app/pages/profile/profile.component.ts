import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar,
  IonProgressBar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  settingsOutline,
  trophyOutline,
  barChartOutline,
  timeOutline,
  flameOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  medalOutline,
  ribbonOutline,
  shieldCheckmarkOutline,
  starOutline,
  playOutline,
  eyeOutline,
  flaskOutline
} from 'ionicons/icons';
import { ProfileService, ErgoFitUserProfile } from '../../services/profile.service';
import { SampleDataService } from '../../services/sample-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonAvatar,
    IonProgressBar
  ],
  template: `
    <ion-content class="profile-content">
      <div *ngIf="userProfile" class="profile-container">

        <!-- Clean Profile Header -->
        <div class="profile-header">
          <div class="header-content">
            <div class="avatar-section">
              <ion-avatar class="profile-avatar">
                <img [src]="userProfile.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
                     [alt]="userProfile.displayName + ' Avatar'">
              </ion-avatar>
              <div class="user-info">
                <h1 class="user-name">{{userProfile.displayName}}</h1>
                <p class="user-level">Level {{userProfile.level}} • {{userProfile.title}}</p>
              </div>
            </div>

            <div class="header-actions">
              <ion-button
                class="settings-btn"
                fill="clear"
                (click)="navigateToSettings()">
                <ion-icon name="settings-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">

          <!-- Key Performance Metrics -->
          <section class="metrics-section">
            <div class="section-header">
              <h2 class="section-title">Performance Overview</h2>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon primary">
                  <ion-icon name="trophy-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{userProfile.totalPoints}}</div>
                  <div class="stat-label">Total Points</div>
                  <ion-progress-bar [value]="getPointsProgress()" color="warning"></ion-progress-bar>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon secondary">
                  <ion-icon name="flame-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{userProfile.currentStreak}}</div>
                  <div class="stat-label">Day Streak</div>
                  <ion-progress-bar [value]="getStreakProgress()" color="danger"></ion-progress-bar>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon tertiary">
                  <ion-icon name="time-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{userProfile.totalHours}}h</div>
                  <div class="stat-label">Hours Monitored</div>
                  <ion-progress-bar [value]="getHoursProgress()" color="secondary"></ion-progress-bar>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon quaternary">
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{userProfile.accuracyScore}}%</div>
                  <div class="stat-label">Accuracy Score</div>
                  <ion-progress-bar [value]="userProfile.accuracyScore / 100" color="success"></ion-progress-bar>
                </div>
              </div>
            </div>
          </section>

          <!-- Progress Visualization -->
          <section class="charts-section">
            <div class="section-header">
              <h2 class="section-title">Weekly Progress</h2>
            </div>

            <div class="charts-grid">
              <div class="chart-card">
                <div class="chart-header">
                  <h3>Posture Score</h3>
                </div>
                <div class="chart-container">
                  <canvas
                    #postureChart
                    class="progress-canvas"
                    width="200"
                    height="200">
                  </canvas>
                </div>
              </div>

              <div class="chart-card">
                <div class="chart-header">
                  <h3>Activity Level</h3>
                </div>
                <div class="chart-container">
                  <canvas
                    #activityChart
                    class="progress-canvas"
                    width="200"
                    height="200">
                  </canvas>
                </div>
              </div>
            </div>
          </section>

          <!-- Achievements Section -->
          <section class="achievements-section">
            <div class="section-header">
              <h2 class="section-title">Achievements</h2>
              <p class="section-subtitle">{{getUnlockedAchievementsCount()}} of {{userProfile.achievements.length}} unlocked</p>
            </div>

            <div class="achievements-grid">
              <div
                class="achievement-card"
                [class.unlocked]="achievement.unlocked"
                *ngFor="let achievement of userProfile.achievements">
                <div class="achievement-icon" [class.unlocked]="achievement.unlocked">
                  <ion-icon [name]="achievement.icon"></ion-icon>
                </div>
                <div class="achievement-content">
                  <h4 class="achievement-title">{{achievement.name}}</h4>
                  <p class="achievement-description">{{achievement.description}}</p>
                  <div class="achievement-progress" *ngIf="achievement.unlocked">{{achievement.progress}}</div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="!userProfile" class="loading-state">
        <div class="loading-content">
          <ion-icon name="person-outline"></ion-icon>
          <p>Loading your profile...</p>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    /* Main Layout */
    .profile-content {
      --background: #f8fafc;
      padding: 0;
    }

    .profile-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Clean Header */
    .profile-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 1.5rem;
      margin-bottom: 1.5rem;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .avatar-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      border: 3px solid rgba(255, 255, 255, 0.9);
    }

    .user-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.25rem 0;
    }

    .user-level {
      font-size: 0.9rem;
      opacity: 0.9;
      margin: 0;
    }

    .settings-btn {
      --color: white;
      font-size: 1.5rem;
    }

    /* Main Content */
    .main-content {
      padding: 0 1.5rem 2rem;
    }

    /* Section Styling */
    section {
      margin-bottom: 2rem;
    }

    .section-header {
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }

    .section-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }

    /* Performance Metrics */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon.primary { background: #f59e0b; }
    .stat-icon.secondary { background: #ef4444; }
    .stat-icon.tertiary { background: #10b981; }
    .stat-icon.quaternary { background: #3b82f6; }

    .stat-icon ion-icon {
      font-size: 1.5rem;
      color: white;
    }

    .stat-content {
      flex: 1;
      min-width: 0;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1e293b;
      line-height: 1;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .stat-content ion-progress-bar {
      --height: 4px;
      --border-radius: 2px;
    }

    /* Charts Section */
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .chart-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .chart-header {
      text-align: center;
      margin-bottom: 1rem;
    }

    .chart-header h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .chart-container {
      display: flex;
      justify-content: center;
    }

    .progress-canvas {
      max-width: 160px;
      max-height: 160px;
    }

    /* Achievements Section */
    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .achievement-card {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.2s ease;
    }

    .achievement-card.unlocked {
      border-color: #f59e0b;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    }

    .achievement-card:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .achievement-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e5e7eb;
      color: #9ca3af;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .achievement-icon.unlocked {
      background: #f59e0b;
      color: white;
    }

    .achievement-icon ion-icon {
      font-size: 1.25rem;
    }

    .achievement-content {
      flex: 1;
      min-width: 0;
    }

    .achievement-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }

    .achievement-description {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    }

    .achievement-progress {
      font-size: 0.75rem;
      color: #f59e0b;
      font-weight: 600;
    }

    /* Loading State */
    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .loading-content ion-icon {
      font-size: 4rem;
      color: #9ca3af;
      margin-bottom: 1rem;
    }

    .loading-content p {
      font-size: 1.125rem;
      color: #6b7280;
      margin: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .profile-header {
        padding: 1.5rem 1rem;
      }

      .header-content {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
      }

      .avatar-section {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
      }

      .main-content {
        padding: 0 1rem 2rem;
      }

      .stats-grid,
      .charts-grid,
      .achievements-grid {
        grid-template-columns: 1fr;
      }

      .stat-card {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .achievement-card {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
      }

      .section-title {
        font-size: 1.125rem;
      }
    }

    @media (max-width: 480px) {
      .profile-header {
        padding: 1.25rem 0.75rem;
      }

      .main-content {
        padding: 0 0.75rem 1.5rem;
      }

      .stat-card,
      .chart-card,
      .achievement-card {
        padding: 1rem;
      }

      .profile-avatar {
        width: 70px;
        height: 70px;
      }

      .user-name {
        font-size: 1.25rem;
      }

      .stat-value {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('postureChart', { static: false }) postureChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('activityChart', { static: false }) activityChartRef!: ElementRef<HTMLCanvasElement>;

  userProfile: ErgoFitUserProfile | null = null;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private sampleDataService: SampleDataService
  ) {
    addIcons({
      'person-outline': personOutline,
      'settings-outline': settingsOutline,
      'trophy-outline': trophyOutline,
      'bar-chart-outline': barChartOutline,
      'time-outline': timeOutline,
      'flame-outline': flameOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'lock-closed-outline': lockClosedOutline,
      'medal-outline': medalOutline,
      'ribbon-outline': ribbonOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'star-outline': starOutline,
      'play-outline': playOutline,
      'eye-outline': eyeOutline,
      'flask-outline': flaskOutline
    });
  }

  ngOnInit() {
    // Subscribe to user profile changes
    this.subscriptions.add(
      this.profileService.userProfile$.subscribe(profile => {
        this.userProfile = profile;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  navigateToSettings() {
    this.router.navigate(['/profile/settings']);
  }

  // Helper methods for progress calculations
  getPointsProgress(): number {
    if (!this.userProfile) return 0;
    const nextLevelPoints = (this.userProfile.level) * 1000;
    const currentLevelPoints = (this.userProfile.level - 1) * 1000;
    const progress = (this.userProfile.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints);
    return Math.min(Math.max(progress, 0), 1);
  }

  getStreakProgress(): number {
    if (!this.userProfile) return 0;
    return Math.min(this.userProfile.currentStreak / 30, 1); // Max 30 days for full progress
  }

  getHoursProgress(): number {
    if (!this.userProfile) return 0;
    return Math.min(this.userProfile.totalHours / 200, 1); // Max 200 hours for full progress
  }

  private initializeCharts() {
    this.drawPostureChart();
    this.drawActivityChart();
  }

  private drawPostureChart() {
    if (!this.postureChartRef?.nativeElement || !this.userProfile) return;

    const canvas = this.postureChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#f0f0f0';
    ctx.stroke();

    // Calculate average posture score from weekly stats
    const avgPostureScore = this.userProfile.weeklyStats.postureScores.reduce((a, b) => a + b, 0) / 
                           this.userProfile.weeklyStats.postureScores.length || 0;
    const progress = avgPostureScore / 100;
    
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * progress);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#6C63FF';
    ctx.stroke();

    // Draw text
    ctx.fillStyle = '#6C63FF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(avgPostureScore) + '%', centerX, centerY + 8);
  }

  private drawActivityChart() {
    if (!this.activityChartRef?.nativeElement || !this.userProfile) return;

    const canvas = this.activityChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Use data from weekly stats
    const data = this.userProfile.weeklyStats.activityLevels;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const barWidth = 20;
    const spacing = 8;
    const maxValue = Math.max(...data, 1); // Avoid division by zero
    const chartHeight = canvas.height - 40;
    const startX = (canvas.width - (data.length * (barWidth + spacing))) / 2;

    data.forEach((value, index) => {
      const x = startX + index * (barWidth + spacing);
      const barHeight = (value / maxValue) * chartHeight;
      const y = canvas.height - barHeight - 20;

      // Draw bar
      ctx.fillStyle = '#6C63FF';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw day labels
      ctx.fillStyle = '#666';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(days[index], x + barWidth / 2, canvas.height - 5);

      // Draw values
      if (value > 0) {
        ctx.fillStyle = '#6C63FF';
        ctx.font = 'bold 10px Arial';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      }
    });
  }

  getUnlockedAchievementsCount(): number {
    if (!this.userProfile?.achievements) return 0;
    return this.userProfile.achievements.filter(achievement => achievement.unlocked).length;
  }
}
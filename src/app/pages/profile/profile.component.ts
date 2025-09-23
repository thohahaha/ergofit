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
    <ion-content class="profile-content" [fullscreen]="true">
      <div *ngIf="userProfile">
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="avatar-container">
            <ion-avatar class="profile-avatar">
              <img [src]="userProfile.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'" 
                   [alt]="userProfile.displayName + ' Avatar'">
            </ion-avatar>
          </div>
          
          <div class="user-info">
            <h1 class="user-name">{{userProfile.displayName}}</h1>
            <p class="user-level">Level {{userProfile.level}} • {{userProfile.title}}</p>
            
            <div class="quick-actions">
              <ion-button 
                class="action-btn" 
                fill="outline" 
                (click)="navigateToSettings()">
                <ion-icon name="settings-outline" slot="start"></ion-icon>
                Settings
              </ion-button>
              
              <!-- Debug button for generating sample data -->
              <ion-button 
                class="action-btn debug-btn" 
                fill="outline" 
                color="warning"
                (click)="generateSampleData()">
                <ion-icon name="flask-outline" slot="start"></ion-icon>
                Generate Sample Data
              </ion-button>
            </div>
          </div>
        </div>

        <!-- Stats Dashboard -->
        <div class="stats-dashboard">
          <h2 class="section-title">
            <ion-icon name="bar-chart-outline"></ion-icon>
            Performance Dashboard
          </h2>
          
          <div class="stats-grid">
            <div class="stat-card primary">
              <div class="stat-icon">
                <ion-icon name="trophy-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <h3>{{userProfile.totalPoints}}</h3>
                <p>Total Points</p>
                <ion-progress-bar [value]="getPointsProgress()" class="gold"></ion-progress-bar>
              </div>
            </div>

            <div class="stat-card secondary">
              <div class="stat-icon">
                <ion-icon name="flame-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <h3>{{userProfile.currentStreak}}</h3>
                <p>Day Streak</p>
                <ion-progress-bar [value]="getStreakProgress()" class="fire"></ion-progress-bar>
              </div>
            </div>

            <div class="stat-card tertiary">
              <div class="stat-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <h3>{{userProfile.totalHours}}h</h3>
                <p>Monitored</p>
                <ion-progress-bar [value]="getHoursProgress()" class="time"></ion-progress-bar>
              </div>
            </div>

            <div class="stat-card quaternary">
              <div class="stat-icon">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <h3>{{userProfile.accuracyScore}}%</h3>
                <p>Accuracy</p>
                <ion-progress-bar [value]="userProfile.accuracyScore / 100" class="accuracy"></ion-progress-bar>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements Section -->
        <div class="achievements-section">
          <h2 class="section-title">
            <ion-icon name="trophy-outline"></ion-icon>
            Achievements
          </h2>
          
          <div class="achievements-grid">
            <div 
              class="achievement-card" 
              [class.unlocked]="achievement.unlocked"
              [class.locked]="!achievement.unlocked"
              *ngFor="let achievement of userProfile.achievements">
              <div class="achievement-icon">
                <ion-icon [name]="achievement.icon"></ion-icon>
              </div>
              <h4 class="achievement-title">{{achievement.name}}</h4>
              <p class="achievement-desc">{{achievement.description}}</p>
              <div class="achievement-progress">{{achievement.progress}}</div>
            </div>
          </div>
        </div>

        <!-- Progress Charts -->
        <div class="progress-section">
          <h2 class="section-title">
            <ion-icon name="bar-chart-outline"></ion-icon>
            Weekly Progress
          </h2>
          
          <div class="progress-charts">
            <div class="chart-card">
              <h3 class="chart-title">Posture Score</h3>
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
              <h3 class="chart-title">Activity Level</h3>
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
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="!userProfile" class="loading-state">
        <ion-icon name="person-outline"></ion-icon>
        <p>Loading profile...</p>
      </div>
    </ion-content>
  `,
  styles: [`
    .profile-content {
      --background: var(--ergofit-background);
    }

    .profile-header {
      padding: 40px 24px;
      text-align: center;
      background: linear-gradient(135deg, var(--ergofit-primary), var(--ergofit-accent));
      color: white;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
      border: 3px solid rgba(255, 255, 255, 0.9);
      margin-bottom: 16px;
    }

    .user-name {
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    .user-level {
      font-size: 1rem;
      opacity: 0.9;
      margin-bottom: 16px;
    }

    .quick-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .action-btn {
      --background: rgba(255, 255, 255, 0.15);
      --color: white;
      --border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      height: 36px;
      min-width: 100px;
    }

    .debug-btn {
      --background: rgba(255, 193, 7, 0.15);
      --color: var(--ion-color-warning);
      border: 1px solid rgba(255, 193, 7, 0.3);
    }

    .stats-dashboard {
      padding: 24px 16px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--ergofit-primary);
      font-weight: 600;
      margin: 0 0 20px 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: var(--ergofit-card-background);
      border-radius: 16px;
      padding: 20px;
      box-shadow: var(--ergofit-card-shadow);
      border: var(--ergofit-card-border);
      position: relative;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
    }

    .stat-card.primary::before { background: #ffd700; }
    .stat-card.secondary::before { background: #ff6b6b; }
    .stat-card.tertiary::before { background: #4ecdc4; }
    .stat-card.quaternary::before { background: var(--ergofit-primary); }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }

    .stat-card.primary .stat-icon { background: #ffd700; }
    .stat-card.secondary .stat-icon { background: #ff6b6b; }
    .stat-card.tertiary .stat-icon { background: #4ecdc4; }
    .stat-card.quaternary .stat-icon { background: var(--ergofit-primary); }

    .stat-icon ion-icon {
      font-size: 24px;
      color: white;
    }

    .stat-content h3 {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--ergofit-primary);
      margin: 0 0 4px 0;
    }

    .stat-content p {
      color: #666;
      margin: 0 0 8px 0;
    }

    .stat-progress ion-progress-bar {
      --height: 4px;
      --border-radius: 2px;
    }

    .achievements-section {
      padding: 0 16px 24px;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }

    .achievement-card {
      background: var(--ergofit-card-background);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--ergofit-card-shadow);
      border: var(--ergofit-card-border);
      text-align: center;
    }

    .achievement-card.unlocked { border-color: #ffd700; }

    .achievement-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 auto 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffd700;
      color: white;
    }

    .achievement-title {
      font-weight: 600;
      color: var(--ergofit-primary);
      margin: 0 0 4px 0;
      font-size: 0.9rem;
    }

    .achievement-desc {
      font-size: 0.8rem;
      color: #666;
      margin: 0 0 4px 0;
    }

    .achievement-progress {
      font-size: 0.7rem;
      color: #ffd700;
      font-weight: 600;
    }

    .progress-section {
      padding: 0 16px 24px;
    }

    .progress-charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .chart-card {
      background: var(--ergofit-card-background);
      border-radius: 16px;
      padding: 20px;
      box-shadow: var(--ergofit-card-shadow);
      border: var(--ergofit-card-border);
    }

    .chart-title {
      font-weight: 600;
      color: var(--ergofit-primary);
      margin: 0 0 16px 0;
      text-align: center;
    }

    .chart-container {
      text-align: center;
    }

    .progress-canvas {
      max-width: 150px;
      max-height: 150px;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #666;
    }

    .loading-state ion-icon {
      font-size: 64px;
      margin-bottom: 16px;
      color: var(--ergofit-primary);
      opacity: 0.6;
    }

    .loading-state p {
      font-size: 1.1rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .profile-header { padding: 32px 16px; }
      .stats-grid, .achievements-grid, .progress-charts { grid-template-columns: 1fr; }
      .quick-actions { flex-direction: column; align-items: center; }
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

  // Debug method for testing
  async generateSampleData() {
    await this.sampleDataService.initializeSampleData();
    console.log('Sample data generated successfully!');
  }
}
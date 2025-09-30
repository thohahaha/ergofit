import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar
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
  flaskOutline,
  analyticsOutline,
  trendingUpOutline,
  removeOutline,
  logOutOutline
} from 'ionicons/icons';
import { ProfileService, ErgoFitUserProfile } from '../../services/profile.service';
import { SampleDataService } from '../../services/sample-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonAvatar
  ],
  template: `
    <ion-content class="profile-content">
      <div *ngIf="userProfile" class="profile-container">

        <!-- Profile Header -->
        <div class="profile-header">
          <div class="header-content">
            <div class="profile-info">
              <div class="avatar-container">
                <ion-avatar class="profile-avatar">
                  <img [src]="userProfile.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
                       [alt]="userProfile.displayName + ' Avatar'">
                </ion-avatar>
              </div>

              <div class="user-details">
                <h1 class="user-name">{{userProfile.displayName}}</h1>
                <div class="user-meta">
                  <div class="level-badge">
                    <ion-icon name="star-outline"></ion-icon>
                    <span>Level {{userProfile.level}}</span>
                  </div>
                  <span class="title-text">{{userProfile.title}}</span>
                </div>
                <div class="level-progress">
                  <div class="progress-track">
                    <div class="progress-fill" [style.width]="getPointsProgress() * 100 + '%'"></div>
                  </div>
                  <span class="progress-text">{{(getPointsProgress() * 100).toFixed(0)}}% to next level</span>
                </div>
              </div>
            </div>

            <div class="header-actions">
              <ion-button class="action-btn" fill="clear" (click)="navigateToSettings()">
                <ion-icon name="settings-outline"></ion-icon>
              </ion-button>
              <ion-button class="action-btn logout-btn" fill="clear" (click)="logout()">
                <ion-icon name="log-out-outline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">

          <!-- Performance Metrics -->
          <section class="metrics-section">
            <div class="section-header">
              <h2 class="section-title">Performance Overview</h2>
            </div>

            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-icon icon-trophy">
                  <ion-icon name="trophy-outline"></ion-icon>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{userProfile.totalPoints}}</div>
                  <div class="metric-label">Total Points</div>
                </div>
                <div class="metric-trend positive">
                  <ion-icon name="trending-up-outline"></ion-icon>
                  <span>+12%</span>
                </div>
              </div>

              <div class="metric-card">
                <div class="metric-icon icon-flame">
                  <ion-icon name="flame-outline"></ion-icon>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{userProfile.currentStreak}}</div>
                  <div class="metric-label">Day Streak</div>
                </div>
                <div class="metric-trend positive">
                  <ion-icon name="trending-up-outline"></ion-icon>
                  <span>+5</span>
                </div>
              </div>

              <div class="metric-card">
                <div class="metric-icon icon-time">
                  <ion-icon name="time-outline"></ion-icon>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{userProfile.totalHours}}h</div>
                  <div class="metric-label">Hours Monitored</div>
                </div>
                <div class="metric-trend neutral">
                  <ion-icon name="remove-outline"></ion-icon>
                  <span>0%</span>
                </div>
              </div>

              <div class="metric-card">
                <div class="metric-icon icon-accuracy">
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{userProfile.accuracyScore}}%</div>
                  <div class="metric-label">Accuracy Score</div>
                </div>
                <div class="metric-trend positive">
                  <ion-icon name="trending-up-outline"></ion-icon>
                  <span>+3%</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Progress Charts -->
          <section class="charts-section">
            <div class="section-header">
              <h2 class="section-title">Weekly Progress</h2>
            </div>

            <div class="charts-grid">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title-wrapper">
                    <ion-icon name="analytics-outline" class="chart-icon"></ion-icon>
                    <h3 class="chart-title">Posture Score</h3>
                  </div>
                </div>
                <div class="chart-container">
                  <canvas #postureChart class="progress-canvas" width="200" height="200"></canvas>
                </div>
              </div>

              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title-wrapper">
                    <ion-icon name="bar-chart-outline" class="chart-icon"></ion-icon>
                    <h3 class="chart-title">Activity Level</h3>
                  </div>
                </div>
                <div class="chart-container">
                  <canvas #activityChart class="progress-canvas" width="200" height="200"></canvas>
                </div>
              </div>
            </div>
          </section>

          <!-- Achievements -->
          <section class="achievements-section">
            <div class="section-header">
              <h2 class="section-title">Achievements</h2>
              <div class="achievement-counter">
                <span class="counter-text">{{getUnlockedAchievementsCount()}}</span>
                <span class="counter-divider">/</span>
                <span class="counter-total">{{userProfile.achievements.length}}</span>
                <span class="counter-label">unlocked</span>
              </div>
            </div>

            <div class="achievements-grid">
              <div
                class="achievement-card"
                [class.unlocked]="achievement.unlocked"
                *ngFor="let achievement of userProfile.achievements">

                <div class="achievement-badge">
                  <div class="badge-icon" [class.unlocked]="achievement.unlocked">
                    <ion-icon [name]="achievement.icon"></ion-icon>
                  </div>
                </div>

                <div class="achievement-info">
                  <h4 class="achievement-name">{{achievement.name}}</h4>
                  <p class="achievement-desc">{{achievement.description}}</p>
                  <div class="achievement-status" [class.completed]="achievement.unlocked">
                    <span *ngIf="achievement.unlocked; else locked" class="status-text">Unlocked</span>
                    <ng-template #locked>
                      <span class="status-text locked">Locked</span>
                    </ng-template>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="!userProfile" class="loading-state">
        <div class="loading-content">
          <div class="loading-avatar">
            <div class="loading-rings">
              <div class="loading-ring ring-1"></div>
              <div class="loading-ring ring-2"></div>
              <div class="loading-ring ring-3"></div>
            </div>
            <ion-icon name="person-outline" class="loading-icon"></ion-icon>
          </div>
          <h3 class="loading-title">Loading Profile</h3>
          <p class="loading-text">Fetching your ErgoFit data...</p>
          <div class="loading-dots">
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    /* ===== CSS VARIABLES ===== */
    :host {
      --primary-color: #2563eb;
      --primary-light: #3b82f6;
      --secondary-color: #1e40af;
      --accent-color: #06b6d4;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --text-primary: #1f2937;
      --text-secondary: #6b7280;
      --text-light: #9ca3af;
      --background-primary: #ffffff;
      --background-secondary: #f8fafc;
      --background-tertiary: #f1f5f9;
      --border-color: #e5e7eb;
      --border-light: #f3f4f6;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      --radius-sm: 6px;
      --radius-md: 8px;
      --radius-lg: 12px;
      --radius-xl: 16px;

      display: block;
      height: 100vh;
      background: var(--background-secondary);
    }

    /* ===== CONTENT BASE ===== */
    .profile-content {
      --background: var(--background-secondary);
      --color: var(--text-primary);
    }

    .profile-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }

    /* ===== PROFILE HEADER ===== */
    .profile-header {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      margin-bottom: 32px;
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .header-content {
      padding: 32px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
    }

    .profile-info {
      display: flex;
      align-items: center;
      gap: 24px;
      flex: 1;
    }

    .avatar-container {
      position: relative;
      flex-shrink: 0;
    }

    .profile-avatar {
      width: 96px;
      height: 96px;
      border: 3px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .user-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .level-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--background-tertiary);
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid var(--border-color);
      font-size: 14px;
      color: var(--text-primary);
      font-weight: 500;
    }

    .title-text {
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 500;
    }

    .level-progress {
      margin-top: 8px;
    }

    .progress-track {
      width: 200px;
      height: 6px;
      background: var(--background-tertiary);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 6px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      border-radius: 3px;
      transition: width 0.6s ease;
    }

    .progress-text {
      font-size: 12px;
      color: var(--text-light);
    }

    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .action-btn {
      --color: var(--text-secondary);
      --background: transparent;
      --border-radius: var(--radius-md);
      width: 40px;
      height: 40px;
      transition: all 0.2s ease;
    }

    .action-btn:hover {
      --background: var(--background-tertiary);
      --color: var(--text-primary);
    }

    .logout-btn {
      --color: var(--danger-color);
    }

    .logout-btn:hover {
      --background: rgba(239, 68, 68, 0.1);
      --color: var(--danger-color);
    }

    /* ===== MAIN CONTENT ===== */
    .main-content {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    /* ===== SECTION HEADERS ===== */
    .section-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    /* ===== METRICS SECTION ===== */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .metric-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.2s ease;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      position: relative;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--border-light);
    }

    .metric-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      flex-shrink: 0;
    }

    .icon-trophy {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    }

    .icon-flame {
      background: linear-gradient(135deg, var(--warning-color), #ff6b35);
    }

    .icon-time {
      background: linear-gradient(135deg, var(--success-color), var(--accent-color));
    }

    .icon-accuracy {
      background: linear-gradient(135deg, #8b5cf6, var(--secondary-color));
    }

    .metric-content {
      flex: 1;
    }

    .metric-value {
      font-size: 28px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 4px 0;
      line-height: 1;
    }

    .metric-label {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
      font-weight: 500;
    }

    .metric-trend {
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 600;
    }

    .positive {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success-color);
    }

    .neutral {
      background: rgba(148, 163, 184, 0.1);
      color: #94a3b8;
    }

    /* ===== CHARTS SECTION ===== */
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
    }

    .chart-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 28px;
      transition: all 0.2s ease;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
    }

    .chart-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .chart-title-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chart-icon {
      font-size: 20px;
      color: var(--primary-color);
      background: rgba(37, 99, 235, 0.1);
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chart-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    .chart-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      padding: 16px;
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
    }

    .progress-canvas {
      max-width: 100%;
      height: auto;
    }

    /* ===== ACHIEVEMENTS SECTION ===== */
    .achievement-counter {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      padding: 12px 20px;
      background: var(--background-primary);
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-color);
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
      box-shadow: var(--shadow-sm);
    }

    .counter-text {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .counter-divider, .counter-total {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .counter-label {
      font-size: 12px;
      color: var(--text-light);
      margin-left: 4px;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 32px;
    }

    .achievement-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.2s ease;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
    }

    .achievement-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .achievement-card.unlocked {
      border-color: var(--success-color);
      background: rgba(16, 185, 129, 0.02);
    }

    .achievement-badge {
      flex-shrink: 0;
    }

    .badge-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: var(--background-tertiary);
      color: var(--text-light);
      border: 2px solid var(--border-color);
      transition: all 0.2s ease;
    }

    .badge-icon.unlocked {
      background: linear-gradient(135deg, var(--success-color), var(--accent-color));
      color: white;
      border-color: var(--success-color);
    }

    .achievement-info {
      flex: 1;
    }

    .achievement-name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 6px 0;
      color: var(--text-primary);
    }

    .achievement-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 0 0 8px 0;
      line-height: 1.4;
    }

    .achievement-status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: var(--radius-md);
      font-size: 11px;
      font-weight: 600;
      background: var(--background-tertiary);
      color: var(--text-light);
    }

    .achievement-status.completed {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success-color);
    }

    /* ===== LOADING STATE ===== */
    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    .loading-content {
      text-align: center;
    }

    .loading-avatar {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
    }

    .loading-rings {
      position: absolute;
      inset: 0;
    }

    .loading-ring {
      position: absolute;
      border: 2px solid transparent;
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    .ring-1 {
      inset: 0;
      border-top-color: var(--primary-color);
      border-right-color: var(--primary-color);
    }

    .ring-2 {
      inset: 10px;
      border-top-color: var(--accent-color);
      border-left-color: var(--accent-color);
      animation-duration: 1.5s;
      animation-direction: reverse;
    }

    .ring-3 {
      inset: 20px;
      border-top-color: var(--success-color);
      border-bottom-color: var(--success-color);
      animation-duration: 1s;
    }

    .loading-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      color: var(--text-secondary);
    }

    .loading-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .loading-text {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .loading-dots {
      display: flex;
      gap: 6px;
      justify-content: center;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--text-light);
      animation: bounce 1.4s ease-in-out infinite both;
    }

    .dot-1 { animation-delay: -0.32s; }
    .dot-2 { animation-delay: -0.16s; }
    .dot-3 { animation-delay: 0s; }

    /* ===== ANIMATIONS ===== */
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .profile-container {
        padding: 16px;
      }

      .header-content {
        padding: 24px 20px;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .header-actions {
        margin-top: 16px;
        order: 3;
      }

      .profile-info {
        flex-direction: column;
        text-align: center;
      }

      .user-name {
        font-size: 24px;
      }

      .metrics-grid,
      .charts-grid,
      .achievements-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .metric-card {
        padding: 20px 18px;
      }

      .section-title {
        font-size: 20px;
      }
    }

    @media (max-width: 480px) {
      .header-content {
        padding: 20px 16px;
      }

      .user-name {
        font-size: 20px;
      }

      .metric-card {
        flex-direction: column;
        text-align: center;
      }

      .metric-trend {
        position: relative;
        top: auto;
        right: auto;
        margin-top: 8px;
      }

      .achievement-card {
        flex-direction: column;
        text-align: center;
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
    private sampleDataService: SampleDataService,
    private authService: AuthService
  ) {
    addIcons({
      'person-outline': personOutline,
      'settings-outline': settingsOutline,
      'trophy-outline': trophyOutline,
      'bar-chart-outline': barChartOutline,
      'analytics-outline': analyticsOutline,
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
      'flask-outline': flaskOutline,
      'trending-up-outline': trendingUpOutline,
      'remove-outline': removeOutline,
      'log-out-outline': logOutOutline
    });
  }

  ngOnInit() {
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

  async logout() {
    const confirmed = confirm('Apakah Anda yakin ingin keluar dari aplikasi?');
    if (confirmed) {
      try {
        await this.authService.signOut();
        this.router.navigate(['/auth/login']);
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Gagal logout. Silakan coba lagi.');
      }
    }
  }

  getPointsProgress(): number {
    if (!this.userProfile) return 0;
    const nextLevelPoints = (this.userProfile.level) * 1000;
    const currentLevelPoints = (this.userProfile.level - 1) * 1000;
    const progress = (this.userProfile.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints);
    return Math.min(Math.max(progress, 0), 1);
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#f1f5f9';
    ctx.stroke();

    const avgPostureScore = this.userProfile.weeklyStats.postureScores.reduce((a, b) => a + b, 0) /
                           this.userProfile.weeklyStats.postureScores.length || 0;
    const progress = avgPostureScore / 100;

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * progress);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 8;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#06b6d4');
    ctx.strokeStyle = gradient;
    ctx.stroke();

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(avgPostureScore) + '%', centerX, centerY + 8);
  }

  private drawActivityChart() {
    if (!this.activityChartRef?.nativeElement || !this.userProfile) return;

    const canvas = this.activityChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = this.userProfile.weeklyStats.activityLevels;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const barWidth = 20;
    const spacing = 8;
    const maxValue = Math.max(...data, 1);
    const chartHeight = canvas.height - 40;
    const startX = (canvas.width - (data.length * (barWidth + spacing))) / 2;

    data.forEach((value, index) => {
      const x = startX + index * (barWidth + spacing);
      const barHeight = (value / maxValue) * chartHeight;
      const y = canvas.height - barHeight - 20;

      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(1, '#06b6d4');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(days[index], x + barWidth / 2, canvas.height - 5);

      if (value > 0) {
        ctx.fillStyle = '#1f2937';
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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonProgressBar,
  IonBadge,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  timeOutline,
  refreshOutline,
  warningOutline,
  trendingUpOutline,
  alertCircleOutline,
  settingsOutline,
  personOutline,
  notificationsOutline,
  helpOutline,
  scanOutline,
  terminalOutline,
  pauseOutline,
  documentTextOutline,
  trophyOutline,
  cafeOutline,
  shieldCheckmarkOutline,
  heartOutline,
  bodyOutline,
  fitnessOutline,
  eyeOutline,
  checkmarkCircleOutline,
  homeOutline,
  statsChartOutline,
  flashOutline,
  starOutline,
  calendarOutline,
  timerOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonProgressBar,
    IonBadge,
    IonChip,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol
  ],
  template: `
    <ion-content class="content" [fullscreen]="true">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="dashboard-header">
          <div class="brand-section">
            <div class="brand-logo">
              <img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image">
            </div>
            <div class="brand-info">
              <h1 class="brand-title">ErgoFit</h1>
              <p class="brand-subtitle">Ergonomic Monitoring Dashboard</p>
            </div>
          </div>
          <div class="status-section">
            <div class="current-time">
              <ion-icon name="time-outline"></ion-icon>
              <span>{{ getCurrentTime() }}</span>
            </div>
            <ion-badge [color]="getStatusColor()" class="status-badge">
              <ion-icon name="heart-outline"></ion-icon>
              {{ currentStatusText }}
            </ion-badge>
          </div>
        </div>
        <div class="welcome-greeting">
          <h2>Selamat {{ getGreeting() }}, {{ userName }}!</h2>
          <p>Berikut adalah ringkasan aktivitas ergonomis Anda hari ini</p>
        </div>
      </div>

      <!-- Key Metrics Overview -->
      <div class="metrics-overview">
        <h2 class="section-title">
          <ion-icon name="analytics-outline"></ion-icon>
          Metrics Utama
        </h2>

        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card class="metric-card primary-card">
                <ion-card-content>
                  <div class="metric-header">
                    <div class="metric-icon primary-icon">
                      <ion-icon name="body-outline"></ion-icon>
                    </div>
                    <div class="metric-trend" [class.positive]="postureScore >= 80">
                      <ion-icon name="trending-up-outline"></ion-icon>
                      <span>+{{ trendValue }}%</span>
                    </div>
                  </div>
                  <div class="metric-value">
                    <span class="value">{{ postureScore }}</span>
                    <span class="unit">%</span>
                  </div>
                  <div class="metric-label">Skor Postur</div>
                  <ion-progress-bar [value]="postureScore / 100" class="metric-progress"></ion-progress-bar>
                  <div class="metric-status">{{ getPostureStatus() }}</div>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card class="metric-card secondary-card">
                <ion-card-content>
                  <div class="metric-header">
                    <div class="metric-icon secondary-icon">
                      <ion-icon name="timer-outline"></ion-icon>
                    </div>
                  </div>
                  <div class="metric-value">
                    <span class="value">{{ activeHours }}</span>
                    <span class="unit">jam</span>
                  </div>
                  <div class="metric-label">Waktu Aktif</div>
                  <ion-progress-bar [value]="timeProgressPercent / 100" class="metric-progress secondary"></ion-progress-bar>
                  <div class="metric-status">{{ timeProgressPercent }}% dari target 8 jam</div>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card class="metric-card tertiary-card">
                <ion-card-content>
                  <div class="metric-header">
                    <div class="metric-icon tertiary-icon">
                      <ion-icon name="cafe-outline"></ion-icon>
                    </div>
                  </div>
                  <div class="metric-value">
                    <span class="value">{{ breaksToday }}</span>
                    <span class="unit">/8</span>
                  </div>
                  <div class="metric-label">Break Diambil</div>
                  <div class="break-indicators">
                    <div *ngFor="let i of breakNumbers"
                         class="break-dot"
                         [class.completed]="i <= breaksToday"
                         [class.current]="i === breaksToday + 1">
                    </div>
                  </div>
                  <div class="metric-status">{{ getBreakStatus() }}</div>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card class="metric-card success-card">
                <ion-card-content>
                  <div class="metric-header">
                    <div class="metric-icon success-icon">
                      <ion-icon name="star-outline"></ion-icon>
                    </div>
                  </div>
                  <div class="metric-value">
                    <span class="value">{{ streakDays }}</span>
                    <span class="unit">hari</span>
                  </div>
                  <div class="metric-label">Streak Terbaik</div>
                  <div class="streak-visualization">
                    <div *ngFor="let day of recentDays"
                         class="streak-day"
                         [class.completed]="day.completed">
                      <div class="day-dot"></div>
                    </div>
                  </div>
                  <div class="metric-status">Konsistensi Excellent!</div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Alert Section -->
      <div class="alert-section" *ngIf="currentAlerts.length > 0">
        <h2 class="section-title">
          <ion-icon name="warning-outline"></ion-icon>
          Notifikasi & Alert
        </h2>

        <div class="alerts-container">
          <ion-card *ngFor="let alert of currentAlerts"
                   class="alert-card"
                   [class]="'alert-' + alert.type">
            <ion-card-content>
              <div class="alert-header">
                <div class="alert-icon">
                  <ion-icon [name]="alert.icon"></ion-icon>
                </div>
                <div class="alert-content">
                  <h4>{{ alert.title }}</h4>
                  <p>{{ alert.message }}</p>
                </div>
                <ion-badge [color]="alert.type">{{ alert.priority }}</ion-badge>
              </div>
              <div class="alert-actions" *ngIf="alert.actions">
                <ion-button *ngFor="let action of alert.actions"
                           [fill]="action.primary ? 'solid' : 'outline'"
                           size="small"
                           (click)="handleAlertAction(action.action)">
                  <ion-icon [name]="action.icon" slot="start"></ion-icon>
                  {{ action.label }}
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <!-- Today's Activities -->
      <div class="activities-section">
        <h2 class="section-title">
          <ion-icon name="calendar-outline"></ion-icon>
          Aktivitas Hari Ini
        </h2>

        <ion-grid>
          <ion-row>
            <ion-col size="12" size-lg="8">
              <ion-card class="schedule-card">
                <ion-card-header>
                  <ion-card-title>Jadwal Ergonomis</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <div class="schedule-timeline">
                    <div *ngFor="let activity of todaySchedule"
                         class="timeline-item"
                         [class.completed]="activity.completed"
                         [class.current]="activity.current">
                      <div class="timeline-time">{{ activity.time }}</div>
                      <div class="timeline-content">
                        <div class="activity-icon">
                          <ion-icon [name]="activity.icon"></ion-icon>
                        </div>
                        <div class="activity-details">
                          <h4>{{ activity.title }}</h4>
                          <p>{{ activity.description }}</p>
                        </div>
                        <div class="activity-status">
                          <ion-icon *ngIf="activity.completed"
                                   name="checkmark-circle-outline"
                                   color="success"></ion-icon>
                          <ion-icon *ngIf="activity.current && !activity.completed"
                                   name="flash-outline"
                                   color="warning"></ion-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-lg="4">
              <ion-card class="progress-card">
                <ion-card-header>
                  <ion-card-title>Progress Mingguan</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <div class="weekly-stats">
                    <div class="stat-item">
                      <div class="stat-icon">
                        <ion-icon name="trophy-outline"></ion-icon>
                      </div>
                      <div class="stat-content">
                        <div class="stat-value">{{ weeklyStats.averageScore }}%</div>
                        <div class="stat-label">Rata-rata Skor</div>
                        <div class="stat-change positive">+2.3% minggu lalu</div>
                      </div>
                    </div>

                    <div class="stat-item">
                      <div class="stat-icon">
                        <ion-icon name="fitness-outline"></ion-icon>
                      </div>
                      <div class="stat-content">
                        <div class="stat-value">{{ weeklyStats.totalBreaks }}</div>
                        <div class="stat-label">Total Break</div>
                        <div class="stat-change positive">+12% minggu lalu</div>
                      </div>
                    </div>

                    <div class="stat-item">
                      <div class="stat-icon">
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                      </div>
                      <div class="stat-content">
                        <div class="stat-value">{{ weeklyStats.exercisesCompleted }}</div>
                        <div class="stat-label">Latihan Selesai</div>
                        <div class="stat-change positive">+18% minggu lalu</div>
                      </div>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <h2 class="section-title">
          <ion-icon name="flash-outline"></ion-icon>
          Aksi Cepat
        </h2>

        <ion-grid>
          <ion-row>
            <ion-col size="6" size-md="3">
              <ion-button class="action-button primary-action"
                         expand="block"
                         (click)="startQuickBreak()">
                <ion-icon name="pause-outline" slot="start"></ion-icon>
                Istirahat Sekarang
              </ion-button>
            </ion-col>
            <ion-col size="6" size-md="3">
              <ion-button class="action-button secondary-action"
                         expand="block"
                         fill="outline">
                <ion-icon name="body-outline" slot="start"></ion-icon>
                Mulai Latihan
              </ion-button>
            </ion-col>
            <ion-col size="6" size-md="3">
              <ion-button class="action-button tertiary-action"
                         expand="block"
                         fill="outline">
                <ion-icon name="stats-chart-outline" slot="start"></ion-icon>
                Lihat Analytics
              </ion-button>
            </ion-col>
            <ion-col size="6" size-md="3">
              <ion-button class="action-button quaternary-action"
                         expand="block"
                         fill="outline">
                <ion-icon name="settings-outline" slot="start"></ion-icon>
                Pengaturan
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      /* Professional Color Palette */
      --primary-color: #1e40af;
      --primary-light: #3b82f6;
      --primary-dark: #1e3a8a;
      --secondary-color: #059669;
      --tertiary-color: #d97706;
      --accent-color: #7c3aed;
      --success-color: #065f46;
      --warning-color: #92400e;
      --danger-color: #dc2626;
      --dark-color: #111827;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
      --background-color: #f8fafc;
      --surface-color: #ffffff;
      --surface-elevated: #ffffff;
      --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --card-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --border-radius: 16px;
      --border-radius-sm: 12px;
      --border-radius-lg: 20px;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;

      display: block;
      min-height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    /* Mobile-Optimized Touch Interactions */
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
    }

    button, .metric-card, .action-button {
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
    }

    .metric-card, .alert-card, .schedule-card, .progress-card {
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
      tap-highlight-color: rgba(0, 0, 0, 0.1);
    }

    /* Smooth scrolling for mobile */
    .content {
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    /* Better touch targets for mobile */
    ion-button {
      min-height: 44px;
      min-width: 44px;
    }

    .status-badge, .current-time {
      min-height: 44px;
      display: flex;
      align-items: center;
    }


    /* Content Layout */
    .content {
      --background: var(--background-color);
      padding: var(--spacing-2xl) var(--spacing-lg);
    }

    /* Welcome Section - Professional Layout */
    .welcome-section {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
      box-shadow: var(--card-shadow-lg);
      border: 1px solid var(--gray-200);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-2xl);
      padding-bottom: var(--spacing-xl);
      border-bottom: 1px solid var(--gray-100);
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .brand-logo {
      width: 64px;
      height: 64px;
      border-radius: var(--border-radius);
      overflow: hidden;
      background: var(--gray-50);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--card-shadow);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .brand-info {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-xs) 0;
      line-height: 1;
      letter-spacing: -0.025em;
    }

    .brand-subtitle {
      font-size: 1rem;
      color: var(--gray-600);
      margin: 0;
      font-weight: 500;
    }

    .status-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-md);
    }

    .current-time {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      background: var(--gray-50);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1rem;
      color: var(--gray-700);
      border: 1px solid var(--gray-200);
    }

    .status-badge {
      background: var(--primary-color);
      color: white;
      border-radius: var(--border-radius);
      padding: var(--spacing-sm) var(--spacing-lg);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-weight: 600;
      font-size: 0.875rem;
      box-shadow: var(--card-shadow);
    }

    .welcome-greeting {
      text-align: left;
    }

    .welcome-greeting h2 {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
      line-height: 1.2;
    }

    .welcome-greeting p {
      font-size: 1.125rem;
      color: var(--gray-600);
      margin: 0;
      line-height: 1.5;
    }

    /* Section Titles - Professional */
    .section-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      color: var(--gray-900);
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: var(--spacing-2xl);
      letter-spacing: -0.025em;
    }

    .section-title ion-icon {
      width: 48px;
      height: 48px;
      color: var(--primary-color);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2rem;
    }

    /* Metrics Overview */
    .metrics-overview {
      margin-bottom: var(--spacing-2xl);
    }

    /* Metric Cards - Professional Design */
    .metric-card {
      background: var(--surface-elevated);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--card-shadow-lg);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: hidden;
      border: 1px solid var(--gray-100);
      position: relative;
    }

    .metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .metric-card:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      transform: translateY(-8px) scale(1.02);
      border-color: var(--gray-200);
    }

    .metric-card:hover::before {
      opacity: 1;
    }

    .primary-card::before {
      background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
    }

    .secondary-card::before {
      background: linear-gradient(90deg, var(--secondary-color), #10b981);
    }

    .tertiary-card::before {
      background: linear-gradient(90deg, var(--tertiary-color), #f59e0b);
    }

    .success-card::before {
      background: linear-gradient(90deg, var(--success-color), var(--secondary-color));
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-xl);
      padding: var(--spacing-lg);
    }

    .metric-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.75rem;
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .metric-icon::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .metric-card:hover .metric-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .metric-card:hover .metric-icon::before {
      opacity: 1;
    }

    .primary-icon {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    }

    .secondary-icon {
      background: linear-gradient(135deg, var(--secondary-color), #10b981);
    }

    .tertiary-icon {
      background: linear-gradient(135deg, var(--tertiary-color), #f59e0b);
    }

    .success-icon {
      background: linear-gradient(135deg, var(--success-color), var(--secondary-color));
    }

    .metric-trend {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 0.875rem;
      font-weight: 700;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--border-radius);
      background: rgba(5, 150, 105, 0.1);
    }

    .metric-trend.positive {
      color: var(--success-color);
      background: rgba(5, 150, 105, 0.1);
    }

    .metric-value {
      margin-bottom: var(--spacing-xl);
      padding: 0 var(--spacing-lg);
    }

    .metric-value .value {
      font-size: 3rem;
      font-weight: 900;
      color: var(--gray-900);
      line-height: 1;
      letter-spacing: -0.05em;
      background: linear-gradient(135deg, var(--gray-900), var(--gray-700));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .metric-value .unit {
      font-size: 1.25rem;
      color: var(--gray-500);
      font-weight: 700;
      margin-left: var(--spacing-sm);
      vertical-align: super;
    }

    .metric-label {
      color: var(--gray-600);
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--spacing-lg);
      padding: 0 var(--spacing-lg);
    }

    .metric-progress {
      margin: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
      --background: var(--gray-200);
      --progress-background: var(--primary-color);
      border-radius: var(--border-radius);
      height: 8px;
      overflow: hidden;
      position: relative;
    }

    .metric-progress::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
      animation: shimmer 2s infinite;
    }

    .metric-progress.secondary {
      --background: var(--gray-200);
      --progress-background: var(--secondary-color);
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .metric-status {
      font-size: 0.875rem;
      color: var(--gray-600);
      font-weight: 600;
      padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-lg);
      text-align: center;
      background: var(--gray-50);
      margin: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
    }

    /* Break Indicators */
    .break-indicators {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      margin-bottom: var(--spacing-sm);
    }

    .break-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(245, 158, 11, 0.2);
      border: 2px solid var(--tertiary-color);
      transition: all 0.3s ease;
    }

    .break-dot.completed {
      background: var(--tertiary-color);
    }

    .break-dot.current {
      background: var(--warning-color);
      box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.3);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }

    /* Streak Visualization */
    .streak-visualization {
      display: flex;
      gap: var(--spacing-xs);
      justify-content: center;
      margin-bottom: var(--spacing-sm);
    }

    .streak-day {
      position: relative;
    }

    .day-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.2);
      border: 1px solid var(--success-color);
    }

    .streak-day.completed .day-dot {
      background: var(--success-color);
    }

    /* Alert Section - Modern Design */
    .alert-section {
      margin-bottom: var(--spacing-2xl);
    }

    .alerts-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .alert-card {
      background: var(--surface-elevated);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--gray-200);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .alert-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: var(--warning-color);
    }

    .alert-warning {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
      border-color: rgba(245, 158, 11, 0.2);
    }

    .alert-warning::before {
      background: linear-gradient(135deg, var(--warning-color), #fbbf24);
    }

    .alert-danger {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%);
      border-color: rgba(239, 68, 68, 0.2);
    }

    .alert-danger::before {
      background: linear-gradient(135deg, var(--danger-color), #dc2626);
    }

    .alert-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      border-color: var(--gray-300);
    }

    .alert-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
      padding: var(--spacing-lg);
      position: relative;
    }

    .alert-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--border-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--warning-color), #fbbf24);
      color: white;
      font-size: 1.4rem;
      flex-shrink: 0;
      box-shadow: var(--shadow-lg);
      transition: all 0.3s ease;
    }

    .alert-card:hover .alert-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .alert-content {
      flex: 1;
    }

    .alert-content h4 {
      color: var(--gray-900);
      font-weight: 700;
      font-size: var(--font-size-lg);
      margin: 0 0 var(--spacing-sm) 0;
      letter-spacing: -0.025em;
    }

    .alert-content p {
      color: var(--gray-700);
      line-height: 1.6;
      margin: 0;
      font-size: var(--font-size-base);
    }

    .alert-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: flex-end;
      padding: 0 var(--spacing-lg) var(--spacing-lg);
    }

    .alert-actions ion-button {
      --border-radius: var(--border-radius-lg);
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .alert-actions ion-button:hover {
      transform: translateY(-2px);
    }

    /* Activities Section - Enhanced */
    .activities-section {
      margin-bottom: var(--spacing-2xl);
    }

    .schedule-card,
    .progress-card {
      background: var(--surface-elevated);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--gray-200);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .schedule-card:hover,
    .progress-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      border-color: var(--gray-300);
    }

    .schedule-timeline {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      padding: var(--spacing-md);
    }

    .timeline-item {
      display: flex;
      gap: var(--spacing-lg);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--gray-200);
      position: relative;
      overflow: hidden;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: var(--gray-300);
      transition: background 0.3s ease;
    }

    .timeline-item.completed {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%);
      border-color: rgba(16, 185, 129, 0.2);
    }

    .timeline-item.completed::before {
      background: linear-gradient(135deg, var(--success-color), #22d3ee);
    }

    .timeline-item.current {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%);
      border-color: rgba(245, 158, 11, 0.2);
      animation: currentItemGlow 3s ease-in-out infinite;
    }

    .timeline-item.current::before {
      background: linear-gradient(135deg, var(--warning-color), #fbbf24);
    }

    @keyframes currentItemGlow {
      0%, 100% {
        box-shadow: var(--shadow-md);
      }
      50% {
        box-shadow: 0 8px 25px -5px rgba(245, 158, 11, 0.3), var(--shadow-lg);
      }
    }

    .timeline-time {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-lg);
      font-weight: 700;
      font-size: var(--font-size-sm);
      min-width: 72px;
      text-align: center;
      flex-shrink: 0;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .timeline-item:hover .timeline-time {
      transform: scale(1.05);
      box-shadow: var(--shadow-lg);
    }

    .timeline-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      flex: 1;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--border-radius-lg);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      flex-shrink: 0;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
    }

    .timeline-item:hover .activity-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .activity-details {
      flex: 1;
    }

    .activity-details h4 {
      color: var(--gray-900);
      font-weight: 700;
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-lg);
      letter-spacing: -0.025em;
    }

    .activity-details p {
      color: var(--gray-700);
      font-size: var(--font-size-sm);
      margin: 0;
      line-height: 1.5;
    }

    .activity-status {
      flex-shrink: 0;
    }

    /* Weekly Stats - Enhanced */
    .weekly-stats {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .weekly-stats .stat-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      padding: var(--spacing-lg);
      background: var(--gray-50);
      border: 1px solid var(--gray-200);
      border-radius: var(--border-radius-lg);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .weekly-stats .stat-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--primary-gradient);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .weekly-stats .stat-item:hover {
      background: white;
      border-color: var(--gray-300);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .weekly-stats .stat-item:hover::before {
      opacity: 1;
    }

    .weekly-stats .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--border-radius-lg);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.4rem;
      flex-shrink: 0;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
    }

    .weekly-stats .stat-item:hover .stat-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .weekly-stats .stat-content {
      flex: 1;
    }

    .weekly-stats .stat-value {
      font-size: var(--font-size-2xl);
      font-weight: 900;
      color: var(--gray-900);
      margin-bottom: var(--spacing-xs);
      letter-spacing: -0.025em;
      background: linear-gradient(135deg, var(--gray-900), var(--gray-700));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .weekly-stats .stat-label {
      color: var(--gray-700);
      font-size: var(--font-size-sm);
      font-weight: 700;
      margin-bottom: var(--spacing-xs);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .weekly-stats .stat-change {
      font-size: var(--font-size-xs);
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .weekly-stats .stat-change.positive {
      color: var(--success-color);
      background: rgba(16, 185, 129, 0.1);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-xs);
    }

    /* Quick Actions - Enhanced */
    .quick-actions-section {
      margin-bottom: var(--spacing-2xl);
    }

    .action-button {
      --border-radius: var(--border-radius-lg);
      height: 64px;
      font-weight: 700;
      font-size: var(--font-size-base);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow-md);
      position: relative;
      overflow: hidden;
    }

    .action-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .action-button:hover::before {
      left: 100%;
    }

    .primary-action {
      --background: var(--primary-gradient);
      --color: white;
    }

    .primary-action:hover {
      --background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
    }

    .secondary-action {
      --border-color: var(--secondary-color);
      --color: var(--secondary-color);
      background: rgba(6, 182, 212, 0.05);
    }

    .secondary-action:hover {
      background: rgba(6, 182, 212, 0.1);
      --border-color: var(--secondary-light);
    }

    .tertiary-action {
      --border-color: var(--tertiary-color);
      --color: var(--tertiary-color);
      background: rgba(245, 158, 11, 0.05);
    }

    .tertiary-action:hover {
      background: rgba(245, 158, 11, 0.1);
      --border-color: #fbbf24;
    }

    .quaternary-action {
      --border-color: var(--gray-600);
      --color: var(--gray-700);
      background: var(--gray-50);
    }

    .quaternary-action:hover {
      background: var(--gray-100);
      --border-color: var(--gray-700);
    }

    .action-button:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: var(--shadow-xl);
    }

    /* Grid Layout Mobile Optimization */
    ion-grid {
      padding: 0;
    }

    ion-row {
      margin: 0;
    }

    ion-col {
      padding: var(--spacing-xs);
    }

    /* Mobile-First Responsive Design */
    @media (max-width: 768px) {
      /* Grid spacing for mobile */
      ion-col {
        padding: var(--spacing-sm);
      }
      .content {
        padding: var(--spacing-md);
      }

      .welcome-section {
        padding: var(--spacing-xl);
        margin-bottom: var(--spacing-xl);
        border-radius: var(--border-radius);
      }

      .dashboard-header {
        flex-direction: column;
        gap: var(--spacing-xl);
        align-items: stretch;
        text-align: center;
        padding-bottom: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }

      .brand-section {
        justify-content: center;
        gap: var(--spacing-md);
      }

      .brand-logo {
        width: 56px;
        height: 56px;
      }

      .brand-title {
        font-size: 2rem;
      }

      .brand-subtitle {
        font-size: 0.95rem;
      }

      .status-section {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .welcome-greeting {
        text-align: center;
      }

      .welcome-greeting h2 {
        font-size: 1.5rem;
        line-height: 1.3;
      }

      .welcome-greeting p {
        font-size: 1rem;
      }

      .section-title {
        font-size: 1.5rem;
        margin-bottom: var(--spacing-xl);
        justify-content: center;
        text-align: center;
      }

      .section-title ion-icon {
        width: 40px;
        height: 40px;
        font-size: 1.75rem;
      }

      .metric-card {
        margin-bottom: var(--spacing-lg);
      }

      .metric-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--spacing-md);
        padding: var(--spacing-lg) var(--spacing-md);
      }

      .metric-icon {
        width: 64px;
        height: 64px;
        font-size: 2rem;
      }

      .metric-trend {
        justify-content: center;
      }

      .metric-value {
        text-align: center;
        margin-bottom: var(--spacing-lg);
        padding: 0 var(--spacing-md);
      }

      .metric-value .value {
        font-size: 2.5rem;
      }

      .metric-label {
        text-align: center;
        padding: 0 var(--spacing-md);
      }

      .metric-progress {
        margin: 0 var(--spacing-md) var(--spacing-md) var(--spacing-md);
      }

      .metric-status {
        margin: 0 var(--spacing-md) var(--spacing-md) var(--spacing-md);
        font-size: 0.8rem;
      }

      /* Break Indicators Mobile */
      .break-indicators {
        gap: var(--spacing-sm);
        flex-wrap: wrap;
        justify-content: center;
        padding: 0 var(--spacing-sm);
      }

      .break-dot {
        width: 14px;
        height: 14px;
      }

      /* Activity Timeline Mobile */
      .timeline-item {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
      }

      .timeline-content {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-sm);
      }

      .activity-details h4 {
        font-size: 1rem;
      }

      /* Alert Cards Mobile */
      .alert-header {
        flex-direction: column;
        text-align: center;
        align-items: center;
        gap: var(--spacing-md);
      }

      .alert-actions {
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
      }

      /* Stats Mobile */
      .weekly-stats .stat-item {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-sm);
      }

      /* Action Buttons Mobile */
      .action-button {
        height: 56px;
        font-size: 1rem;
        font-weight: 600;
      }
    }

    /* Small Mobile Devices */
    @media (max-width: 480px) {
      .content {
        padding: var(--spacing-sm);
      }

      .welcome-section {
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }

      .dashboard-header {
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-md);
      }

      .brand-logo {
        width: 48px;
        height: 48px;
      }

      .brand-title {
        font-size: 1.75rem;
      }

      .brand-subtitle {
        font-size: 0.875rem;
      }

      .status-section {
        flex-direction: column;
        gap: var(--spacing-sm);
        align-items: center;
      }

      .current-time {
        font-size: 0.9rem;
        padding: var(--spacing-xs) var(--spacing-md);
      }

      .status-badge {
        font-size: 0.8rem;
        padding: var(--spacing-xs) var(--spacing-md);
      }

      .welcome-greeting h2 {
        font-size: 1.25rem;
        margin-bottom: var(--spacing-xs);
      }

      .welcome-greeting p {
        font-size: 0.95rem;
      }

      .section-title {
        font-size: 1.25rem;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .metric-card {
        border-radius: var(--border-radius-sm);
      }

      .metric-header {
        padding: var(--spacing-md);
      }

      .metric-icon {
        width: 56px;
        height: 56px;
        font-size: 1.75rem;
      }

      .metric-value .value {
        font-size: 2.25rem;
      }

      .metric-value .unit {
        font-size: 1.1rem;
      }

      .timeline-time {
        min-width: 60px;
        font-size: 0.8rem;
        padding: var(--spacing-xs) var(--spacing-sm);
      }

      .activity-icon {
        width: 32px;
        height: 32px;
        font-size: 1rem;
      }

      .alert-card {
        border-radius: var(--border-radius-sm);
      }

      .recommendation-item {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-sm);
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
      }

      .action-button {
        height: 52px;
        font-size: 0.95rem;
      }
    }

    /* Extra Small Mobile Devices */
    @media (max-width: 360px) {
      .content {
        padding: var(--spacing-xs);
      }

      .welcome-section {
        padding: var(--spacing-md);
      }

      .brand-section {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .brand-title {
        font-size: 1.5rem;
      }

      .welcome-greeting h2 {
        font-size: 1.125rem;
      }

      .metric-value .value {
        font-size: 2rem;
      }

      .metric-icon {
        width: 48px;
        height: 48px;
        font-size: 1.5rem;
      }

      .break-dot {
        width: 12px;
        height: 12px;
      }

      .action-button {
        height: 48px;
        font-size: 0.9rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  // User data
  userName = 'Pengguna';

  // Metrics data
  postureScore = 85;
  activeHours = 6.5;
  timeProgressPercent = 81;
  breaksToday = 5;
  streakDays = 12;
  trendValue = 5.2;
  currentStatusText = 'Postur Baik';

  // Helper arrays
  breakNumbers = Array.from({length: 8}, (_, i) => i + 1);
  recentDays = Array.from({length: 7}, (_, i) => ({
    completed: i < 5
  }));

  // Alert data
  currentAlerts = [
    {
      title: 'Waktu Istirahat',
      message: 'Sudah 2 jam sejak istirahat terakhir. Saatnya untuk peregangan!',
      icon: 'time-outline',
      type: 'warning',
      priority: 'Medium',
      actions: [
        { label: 'Istirahat Sekarang', icon: 'pause-outline', action: 'take-break', primary: true },
        { label: 'Ingatkan 15 menit lagi', icon: 'time-outline', action: 'snooze', primary: false }
      ]
    },
    {
      title: 'Postur Kurang Baik',
      message: 'Postur duduk Anda terdeteksi kurang ergonomis dalam 10 menit terakhir.',
      icon: 'warning-outline',
      type: 'danger',
      priority: 'High',
      actions: [
        { label: 'Koreksi Postur', icon: 'body-outline', action: 'correct-posture', primary: true }
      ]
    }
  ];

  // Schedule data
  todaySchedule = [
    {
      time: '09:00',
      title: 'Setup Workstation',
      description: 'Atur posisi monitor dan kursi untuk memulai hari',
      icon: 'desktop-outline',
      completed: true,
      current: false
    },
    {
      time: '10:30',
      title: 'Peregangan Pagi',
      description: 'Latihan peregangan leher dan bahu',
      icon: 'body-outline',
      completed: true,
      current: false
    },
    {
      time: '12:00',
      title: 'Break Makan Siang',
      description: 'Istirahat makan dengan berjalan kaki ringan',
      icon: 'cafe-outline',
      completed: false,
      current: true
    },
    {
      time: '14:30',
      title: 'Micro Break',
      description: 'Istirahat 5 menit untuk mata dan postur',
      icon: 'eye-outline',
      completed: false,
      current: false
    },
    {
      time: '16:00',
      title: 'Hydration & Exercise',
      description: 'Minum air dan breathing exercise',
      icon: 'heart-outline',
      completed: false,
      current: false
    },
    {
      time: '17:30',
      title: 'Evaluasi Harian',
      description: 'Review postur dan catat perbaikan yang diperlukan',
      icon: 'checkmark-circle-outline',
      completed: false,
      current: false
    }
  ];

  // Weekly stats
  weeklyStats = {
    averageScore: 82,
    totalBreaks: 38,
    exercisesCompleted: 24
  };

  constructor() {
    addIcons({
      analyticsOutline,
      timeOutline,
      refreshOutline,
      warningOutline,
      trendingUpOutline,
      alertCircleOutline,
      settingsOutline,
      personOutline,
      notificationsOutline,
      helpOutline,
      scanOutline,
      terminalOutline,
      pauseOutline,
      documentTextOutline,
      trophyOutline,
      cafeOutline,
      shieldCheckmarkOutline,
      heartOutline,
      bodyOutline,
      fitnessOutline,
      eyeOutline,
      checkmarkCircleOutline,
      homeOutline,
      statsChartOutline,
      flashOutline,
      starOutline,
      calendarOutline,
      timerOutline
    });
  }

  ngOnInit() {
    this.simulateRealTimeData();
  }

  ngOnDestroy() {}

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Pagi';
    if (hour < 17) return 'Siang';
    return 'Sore';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusColor(): string {
    if (this.postureScore >= 80) return 'success';
    if (this.postureScore >= 60) return 'warning';
    return 'danger';
  }

  getPostureStatus(): string {
    if (this.postureScore >= 85) return 'Excellent';
    if (this.postureScore >= 70) return 'Good';
    if (this.postureScore >= 50) return 'Fair';
    return 'Poor';
  }

  getBreakStatus(): string {
    const percentage = (this.breaksToday / 8) * 100;
    if (percentage >= 100) return 'Target tercapai!';
    if (percentage >= 75) return 'Hampir tercapai';
    if (percentage >= 50) return 'Setengah jalan';
    return 'Perlu lebih banyak break';
  }

  startQuickBreak() {
    console.log('Starting quick break...');
    // Implement break functionality
  }

  handleAlertAction(action: string) {
    console.log('Alert action:', action);
    switch (action) {
      case 'take-break':
        this.startQuickBreak();
        break;
      case 'snooze':
        // Implement snooze functionality
        break;
      case 'correct-posture':
        // Implement posture correction guidance
        break;
    }
  }

  private simulateRealTimeData() {
    setInterval(() => {
      // Simulate slight variations in posture score
      this.postureScore = Math.max(70, Math.min(95, this.postureScore + (Math.random() - 0.5) * 10));

      // Update status text based on score
      if (this.postureScore >= 80) {
        this.currentStatusText = 'Postur Baik';
      } else if (this.postureScore >= 60) {
        this.currentStatusText = 'Postur Cukup';
      } else {
        this.currentStatusText = 'Postur Kurang';
      }
    }, 10000); // Update every 10 seconds
  }
}
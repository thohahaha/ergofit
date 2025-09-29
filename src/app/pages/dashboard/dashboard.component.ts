import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
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
    IonHeader,
    IonToolbar,
    IonTitle,
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
    <ion-header class="header">
      <ion-toolbar class="header-toolbar">
        <ion-title class="header-title">
          <div class="title-content">
            <div class="brand-logo">
              <img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image">
            </div>
            <div class="brand-text">
              <span class="brand-name">ErgoFit</span>
              <span class="brand-subtitle">Dashboard</span>
            </div>
          </div>
        </ion-title>
        <div slot="end" class="header-actions">
          <ion-badge [color]="getStatusColor()" class="status-badge">
            <ion-icon name="heart-outline"></ion-icon>
            {{ currentStatusText }}
          </ion-badge>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content" [fullscreen]="true">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="welcome-content">
          <h1>Selamat {{ getGreeting() }}, {{ userName }}!</h1>
          <p>Berikut adalah ringkasan aktivitas ergonomis Anda hari ini</p>
        </div>
        <div class="current-time">
          <ion-icon name="time-outline"></ion-icon>
          <span>{{ getCurrentTime() }}</span>
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
      /* Modern Professional Color Palette */
      --primary-color: #4f46e5;
      --primary-light: #6366f1;
      --primary-dark: #3730a3;
      --primary-gradient: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      --secondary-color: #06b6d4;
      --secondary-light: #22d3ee;
      --tertiary-color: #f59e0b;
      --accent-color: #8b5cf6;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --info-color: #3b82f6;

      /* Neutral Colors */
      --dark-color: #0f172a;
      --gray-900: #0f172a;
      --gray-800: #1e293b;
      --gray-700: #334155;
      --gray-600: #475569;
      --gray-500: #64748b;
      --gray-400: #94a3b8;
      --gray-300: #cbd5e1;
      --gray-200: #e2e8f0;
      --gray-100: #f1f5f9;
      --gray-50: #f8fafc;

      /* Background & Surface */
      --background-color: #fafbfc;
      --background-gradient: linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%);
      --surface-color: #ffffff;
      --surface-elevated: #ffffff;
      --surface-overlay: rgba(255, 255, 255, 0.95);

      /* Shadows */
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      --card-shadow: var(--shadow-lg);
      --card-shadow-hover: var(--shadow-xl);

      /* Border Radius */
      --border-radius: 16px;
      --border-radius-sm: 12px;
      --border-radius-xs: 8px;
      --border-radius-lg: 20px;
      --border-radius-xl: 24px;

      /* Spacing */
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;

      /* Typography */
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-base: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      --font-size-3xl: 1.875rem;
      --font-size-4xl: 2.25rem;

      display: block;
      min-height: 100vh;
    }

    /* Header Styles - Modern Glassmorphism */
    .header {
      background: var(--primary-gradient);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
      color: white;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      pointer-events: none;
    }

    .header-toolbar {
      --background: transparent;
      --color: white;
      padding: var(--spacing-md) var(--spacing-lg);
      position: relative;
      z-index: 1;
    }

    .title-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .brand-logo {
      width: 56px;
      height: 56px;
      border-radius: var(--border-radius-sm);
      overflow: hidden;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-md);
    }

    .brand-logo:hover {
      transform: scale(1.05);
      background: rgba(255, 255, 255, 0.2);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: var(--border-radius-xs);
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      margin-left: var(--spacing-sm);
    }

    .brand-name {
      font-size: var(--font-size-2xl);
      font-weight: 800;
      color: white;
      line-height: 1;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      letter-spacing: -0.025em;
    }

    .brand-subtitle {
      font-size: var(--font-size-sm);
      opacity: 0.9;
      color: white;
      font-weight: 500;
      margin-top: 2px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .status-badge {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 24px;
      padding: var(--spacing-sm) var(--spacing-md);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-weight: 600;
      font-size: var(--font-size-sm);
      transition: all 0.3s ease;
      box-shadow: var(--shadow-md);
    }

    .status-badge:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-1px);
    }

    /* Content Layout */
    .content {
      --background: var(--background-gradient);
      padding: var(--spacing-lg);
      min-height: 100vh;
    }

    /* Welcome Section - Modern Card Design */
    .welcome-section {
      background: var(--primary-gradient);
      background-size: 200% 200%;
      animation: gradientShift 8s ease-in-out infinite;
      color: white;
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-2xl);
      position: relative;
      overflow: hidden;
    }

    .welcome-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      pointer-events: none;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .welcome-content {
      position: relative;
      z-index: 1;
    }

    .welcome-content h1 {
      font-size: var(--font-size-4xl);
      font-weight: 900;
      margin: 0 0 var(--spacing-md) 0;
      color: white;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      letter-spacing: -0.025em;
      line-height: 1.1;
    }

    .welcome-content p {
      margin: 0;
      opacity: 0.95;
      font-size: var(--font-size-lg);
      font-weight: 400;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      line-height: 1.5;
    }

    .current-time {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-weight: 600;
      font-size: var(--font-size-lg);
      box-shadow: var(--shadow-lg);
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
    }

    .current-time:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    /* Section Titles - Enhanced Typography */
    .section-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      color: var(--gray-900);
      font-size: var(--font-size-2xl);
      font-weight: 800;
      margin-bottom: var(--spacing-2xl);
      letter-spacing: -0.025em;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 48px;
      height: 3px;
      background: var(--primary-gradient);
      border-radius: 2px;
    }

    .section-title ion-icon {
      color: var(--primary-color);
      font-size: 2rem;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Metrics Overview */
    .metrics-overview {
      margin-bottom: var(--spacing-2xl);
    }

    /* Metric Cards - Modern Professional Design */
    .metric-card {
      background: var(--surface-elevated);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--card-shadow);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      border: 1px solid var(--gray-200);
      position: relative;
      backdrop-filter: blur(10px);
    }

    .metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--primary-gradient);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .metric-card:hover {
      box-shadow: var(--shadow-2xl);
      transform: translateY(-8px) scale(1.02);
      border-color: var(--gray-300);
    }

    .metric-card:hover::before {
      opacity: 1;
    }

    .primary-card::before {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    }

    .secondary-card::before {
      background: linear-gradient(135deg, var(--secondary-color), var(--secondary-light));
    }

    .tertiary-card::before {
      background: linear-gradient(135deg, var(--tertiary-color), #fbbf24);
    }

    .success-card::before {
      background: linear-gradient(135deg, var(--success-color), #22d3ee);
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-lg);
      padding-top: var(--spacing-sm);
    }

    .metric-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--border-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.75rem;
      box-shadow: var(--shadow-lg);
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
      background: linear-gradient(135deg, var(--secondary-color), var(--secondary-light));
    }

    .tertiary-icon {
      background: linear-gradient(135deg, var(--tertiary-color), #fbbf24);
    }

    .success-icon {
      background: linear-gradient(135deg, var(--success-color), #22d3ee);
    }

    .metric-trend {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-sm);
      font-weight: 700;
      background: linear-gradient(135deg, var(--success-color), #22d3ee);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-xs);
      backdrop-filter: blur(4px);
    }

    .metric-trend.positive {
      background: linear-gradient(135deg, var(--success-color), #22d3ee);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .metric-value {
      margin-bottom: var(--spacing-lg);
      display: flex;
      align-items: baseline;
      gap: var(--spacing-xs);
    }

    .metric-value .value {
      font-size: var(--font-size-4xl);
      font-weight: 900;
      color: var(--gray-900);
      line-height: 0.9;
      letter-spacing: -0.025em;
      background: linear-gradient(135deg, var(--gray-900), var(--gray-700));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .metric-value .unit {
      font-size: var(--font-size-xl);
      color: var(--gray-600);
      font-weight: 700;
      margin-top: var(--spacing-xs);
    }

    .metric-label {
      color: var(--gray-700);
      font-size: var(--font-size-sm);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--spacing-md);
      opacity: 0.9;
    }

    .metric-progress {
      margin-bottom: var(--spacing-md);
      --background: var(--gray-200);
      --progress-background: var(--primary-gradient);
      border-radius: var(--border-radius-xs);
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
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
      animation: shimmer 2s infinite;
    }

    .metric-progress.secondary {
      --background: var(--gray-200);
      --progress-background: linear-gradient(135deg, var(--secondary-color), var(--secondary-light));
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .metric-status {
      font-size: var(--font-size-xs);
      color: var(--gray-600);
      font-weight: 600;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--gray-100);
      border-radius: var(--border-radius-xs);
      text-align: center;
    }

    /* Break Indicators - Enhanced */
    .break-indicators {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-sm);
    }

    .break-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--gray-200);
      border: 2px solid var(--gray-300);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .break-dot::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      background: var(--tertiary-color);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s ease;
    }

    .break-dot.completed {
      background: linear-gradient(135deg, var(--tertiary-color), #fbbf24);
      border-color: var(--tertiary-color);
      box-shadow: var(--shadow-md);
    }

    .break-dot.completed::before {
      transform: translate(-50%, -50%) scale(1);
      background: white;
    }

    .break-dot.current {
      background: linear-gradient(135deg, var(--warning-color), #fbbf24);
      border-color: var(--warning-color);
      box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2), var(--shadow-lg);
      animation: pulseGlow 2s infinite;
    }

    @keyframes pulseGlow {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2), var(--shadow-lg);
      }
      50% {
        transform: scale(1.1);
        box-shadow: 0 0 0 8px rgba(245, 158, 11, 0.3), var(--shadow-xl);
      }
    }

    /* Streak Visualization - Enhanced */
    .streak-visualization {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-sm);
    }

    .streak-day {
      position: relative;
      transition: transform 0.3s ease;
    }

    .streak-day:hover {
      transform: scale(1.2);
    }

    .day-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--gray-200);
      border: 2px solid var(--gray-300);
      transition: all 0.3s ease;
      position: relative;
    }

    .day-dot::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 4px;
      background: var(--success-color);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s ease;
    }

    .streak-day.completed .day-dot {
      background: linear-gradient(135deg, var(--success-color), #22d3ee);
      border-color: var(--success-color);
      box-shadow: var(--shadow-sm);
    }

    .streak-day.completed .day-dot::after {
      transform: translate(-50%, -50%) scale(1);
      background: white;
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

    /* Responsive Design */
    @media (max-width: 768px) {
      .content {
        padding: var(--spacing-sm);
      }

      .welcome-section {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
      }

      .welcome-content h1 {
        font-size: 1.5rem;
      }

      .current-time {
        align-self: stretch;
        justify-content: center;
      }

      .section-title {
        font-size: 1.25rem;
      }

      .metric-value .value {
        font-size: 2rem;
      }

      .timeline-item {
        flex-direction: column;
        text-align: center;
      }

      .timeline-content {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-sm);
      }

      .alert-header {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }

      .alert-actions {
        justify-content: center;
        flex-wrap: wrap;
      }

      .weekly-stats .stat-item {
        flex-direction: column;
        text-align: center;
      }

      .action-button {
        height: 52px;
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .brand-logo {
        width: 40px;
        height: 40px;
      }

      .brand-name {
        font-size: 1.25rem;
      }

      .status-badge {
        padding: var(--spacing-xs);
        font-size: 0.75rem;
      }

      .welcome-section {
        padding: var(--spacing-lg);
      }

      .welcome-content h1 {
        font-size: 1.25rem;
      }

      .metric-card {
        margin-bottom: var(--spacing-md);
      }

      .metric-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
      }

      .metric-icon {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }

      .timeline-time {
        min-width: 50px;
        font-size: 0.75rem;
      }

      .activity-icon {
        width: 28px;
        height: 28px;
        font-size: 0.875rem;
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
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
    <ion-content class="dashboard-content" [fullscreen]="true" [scrollEvents]="true">
      <div class="dashboard-container">
        <!-- Dashboard Header -->
        <div class="dashboard-header">
          <div class="header-content">
            <div class="brand-section">
              <div class="brand-logo">
                <img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image">
              </div>
              <div class="brand-info">
                <h1 class="brand-title">ErgoFit</h1>
                <p class="brand-subtitle">AI-Powered Posture Intelligence</p>
              </div>
            </div>

            <div class="status-section">
              <div class="status-card time-card">
                <div class="status-icon">
                  <ion-icon name="time-outline"></ion-icon>
                </div>
                <div class="status-content">
                  <span class="status-value">{{ getCurrentTime() }}</span>
                  <span class="status-label">Waktu Saat Ini</span>
                </div>
              </div>
              <div class="status-card health-card" [class]="getStatusColor() + '-status'">
                <div class="status-icon">
                  <ion-icon name="heart-outline"></ion-icon>
                </div>
                <div class="status-content">
                  <span class="status-value">{{ currentStatusText }}</span>
                  <span class="status-label">Status Kesehatan</span>
                </div>
              </div>
            </div>
          </div>

          <div class="welcome-section">
            <h2 class="welcome-title">Selamat {{ getGreeting() }}, {{ userName }}!</h2>
            <p class="welcome-subtitle">Mari tingkatkan postur dan kesehatan Anda hari ini</p>
          </div>
        </div>

        <!-- Metrics Section -->
        <div class="metrics-section">
          <div class="section-header">
            <h2 class="section-title">Dashboard Metrics</h2>
            <p class="section-subtitle">Real-time insights into your posture and wellness</p>
          </div>

          <div class="metrics-grid">
            <div class="metric-card posture-card">
              <div class="metric-header">
                <div class="metric-icon posture-icon">
                  <ion-icon name="body-outline"></ion-icon>
                </div>
                <div class="metric-trend positive">
                  <ion-icon name="trending-up-outline"></ion-icon>
                  <span>+{{ trendValue }}%</span>
                </div>
              </div>
              <div class="metric-content">
                <div class="metric-value">
                  <span class="value">{{ postureScore }}</span>
                  <span class="unit">%</span>
                </div>
                <div class="metric-label">Skor Postur</div>
                <div class="progress-container">
                  <div class="progress-track">
                    <div class="progress-fill posture-progress" [style.width.%]="postureScore"></div>
                  </div>
                  <span class="progress-text">{{ getPostureStatus() }}</span>
                </div>
              </div>
            </div>

            <div class="metric-card time-card">
              <div class="metric-header">
                <div class="metric-icon time-icon">
                  <ion-icon name="timer-outline"></ion-icon>
                </div>
              </div>
              <div class="metric-content">
                <div class="metric-value">
                  <span class="value">{{ activeHours }}</span>
                  <span class="unit">jam</span>
                </div>
                <div class="metric-label">Waktu Aktif</div>
                <div class="progress-container">
                  <div class="progress-track">
                    <div class="progress-fill time-progress" [style.width.%]="timeProgressPercent"></div>
                  </div>
                  <span class="progress-text">{{ timeProgressPercent }}% dari target</span>
                </div>
              </div>
            </div>

            <div class="metric-card break-card">
              <div class="metric-header">
                <div class="metric-icon break-icon">
                  <ion-icon name="cafe-outline"></ion-icon>
                </div>
              </div>
              <div class="metric-content">
                <div class="metric-value">
                  <span class="value">{{ breaksToday }}</span>
                  <span class="unit">/8</span>
                </div>
                <div class="metric-label">Break Diambil</div>
                <div class="break-visualization">
                  <div *ngFor="let i of breakNumbers"
                       class="break-dot"
                       [class.completed]="i <= breaksToday"
                       [class.current]="i === breaksToday + 1">
                  </div>
                </div>
                <span class="metric-status">{{ getBreakStatus() }}</span>
              </div>
            </div>

            <div class="metric-card streak-card">
              <div class="metric-header">
                <div class="metric-icon streak-icon">
                  <ion-icon name="star-outline"></ion-icon>
                </div>
              </div>
              <div class="metric-content">
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
                <span class="metric-status">Konsistensi Excellent!</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Smart Alerts -->
        <div class="alerts-section" *ngIf="currentAlerts.length > 0">
          <div class="section-header">
            <h2 class="section-title">Smart Alerts</h2>
            <p class="section-subtitle">AI-powered recommendations for your wellness</p>
          </div>

          <div class="alerts-grid">
            <div *ngFor="let alert of currentAlerts"
                 class="alert-card"
                 [class]="'alert-' + alert.type">
              <div class="alert-content">
                <div class="alert-icon-container">
                  <div class="alert-icon">
                    <ion-icon [name]="alert.icon"></ion-icon>
                  </div>
                  <div class="alert-priority" [class]="'priority-' + alert.type">
                    {{ alert.priority }}
                  </div>
                </div>
                <div class="alert-body">
                  <h3 class="alert-title">{{ alert.title }}</h3>
                  <p class="alert-message">{{ alert.message }}</p>
                  <div class="alert-actions" *ngIf="alert.actions">
                    <button *ngFor="let action of alert.actions"
                            class="alert-button"
                            [class.primary]="action.primary"
                            (click)="handleAlertAction(action.action)">
                      <ion-icon [name]="action.icon"></ion-icon>
                      <span>{{ action.label }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Timeline & Stats -->
      <div class="activity-section">
        <div class="activity-grid">
          <div class="timeline-container">
            <div class="section-header">
              <h2 class="section-title">Today's Schedule</h2>
              <p class="section-subtitle">Your personalized wellness timeline</p>
            </div>

            <div class="timeline-wrapper">
              <div *ngFor="let activity of todaySchedule"
                   class="timeline-item"
                   [class.completed]="activity.completed"
                   [class.current]="activity.current">
                <div class="timeline-indicator">
                  <div class="timeline-time">{{ activity.time }}</div>
                  <div class="timeline-dot"></div>
                </div>
                <div class="activity-card">
                  <div class="activity-icon">
                    <ion-icon [name]="activity.icon"></ion-icon>
                  </div>
                  <div class="activity-info">
                    <h3 class="activity-title">{{ activity.title }}</h3>
                    <p class="activity-description">{{ activity.description }}</p>
                  </div>
                  <div class="activity-status">
                    <ion-icon *ngIf="activity.completed"
                             name="checkmark-circle-outline"
                             class="status-completed"></ion-icon>
                    <ion-icon *ngIf="activity.current && !activity.completed"
                             name="flash-outline"
                             class="status-current"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="stats-container">
            <div class="section-header">
              <h2 class="section-title">Weekly Progress</h2>
              <p class="section-subtitle">Your achievement overview</p>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon trophy-icon">
                  <ion-icon name="trophy-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{ weeklyStats.averageScore }}%</div>
                  <div class="stat-label">Rata-rata Skor</div>
                  <div class="stat-trend positive">+2.3% dari minggu lalu</div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon fitness-icon">
                  <ion-icon name="fitness-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{ weeklyStats.totalBreaks }}</div>
                  <div class="stat-label">Total Break</div>
                  <div class="stat-trend positive">+12% dari minggu lalu</div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon shield-icon">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{ weeklyStats.exercisesCompleted }}</div>
                  <div class="stat-label">Latihan Selesai</div>
                  <div class="stat-trend positive">+18% dari minggu lalu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <div class="section-header">
          <h2 class="section-title">Quick Actions</h2>
          <p class="section-subtitle">Take immediate action for your wellness</p>
        </div>

        <div class="actions-grid">
          <button class="action-card primary-action" (click)="startQuickBreak()">
            <div class="action-icon">
              <ion-icon name="pause-outline"></ion-icon>
            </div>
            <div class="action-content">
              <h3>Istirahat Sekarang</h3>
              <p>Take a quick 5-minute break</p>
            </div>
          </button>

          <button class="action-card secondary-action">
            <div class="action-icon">
              <ion-icon name="body-outline"></ion-icon>
            </div>
            <div class="action-content">
              <h3>Mulai Latihan</h3>
              <p>Begin posture exercises</p>
            </div>
          </button>

          <button class="action-card tertiary-action">
            <div class="action-icon">
              <ion-icon name="stats-chart-outline"></ion-icon>
            </div>
            <div class="action-content">
              <h3>Lihat Analytics</h3>
              <p>Review your progress</p>
            </div>
          </button>

          <button class="action-card quaternary-action">
            <div class="action-icon">
              <ion-icon name="settings-outline"></ion-icon>
            </div>
            <div class="action-content">
              <h3>Pengaturan</h3>
              <p>Customize your experience</p>
            </div>
          </button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      /* ErgoFit Professional Color Palette */
      --primary-color: #2563eb;
      --primary-light: #3b82f6;
      --primary-dark: #1e40af;
      --secondary-color: #059669;
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
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      --radius-sm: 6px;
      --radius-md: 8px;
      --radius-lg: 12px;
      --radius-xl: 16px;
      --radius-2xl: 20px;
      --spacing-xs: 0.25rem;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 2rem;
      --spacing-2xl: 3rem;

      display: block;
      min-height: 100vh;
      background: var(--background-secondary);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    /* Content Layout */
    .dashboard-content {
      --background: var(--background-secondary);
      --color: var(--text-primary);
    }

    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-lg);
    }

    /* Background Decorations */
    .bg-decoration {
      position: fixed;
      border-radius: 50%;
      opacity: 0.05;
      animation: float 8s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
    }

    .bg-decoration-1 {
      width: 300px;
      height: 300px;
      background: var(--primary-gradient);
      top: -150px;
      right: -150px;
      animation-delay: 0s;
    }

    .bg-decoration-2 {
      width: 200px;
      height: 200px;
      background: var(--secondary-gradient);
      bottom: 10%;
      left: -100px;
      animation-delay: 2s;
    }

    .bg-decoration-3 {
      width: 150px;
      height: 150px;
      background: var(--accent-gradient);
      top: 60%;
      right: 5%;
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-30px) rotate(180deg); }
    }

    /* Modern Header */
    .modern-header {
      position: relative;
      z-index: 1;
      margin-bottom: var(--spacing-2xl);
    }

    .header-content {
      background: var(--surface);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .brand-logo {
      position: relative;
      width: 4rem;
      height: 4rem;
      border-radius: var(--border-radius);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--border-radius);
    }

    .logo-glow {
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      background: var(--primary-gradient);
      border-radius: var(--border-radius);
      opacity: 0.3;
      filter: blur(8px);
      z-index: -1;
      animation: logoGlow 2s ease-in-out infinite alternate;
    }

    @keyframes logoGlow {
      from { opacity: 0.3; transform: scale(1); }
      to { opacity: 0.6; transform: scale(1.05); }
    }

    .brand-info h1 {
      font-size: 2rem;
      font-weight: 800;
      margin: 0 0 0.25rem 0;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand-info p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .status-section {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
    }

    .status-card {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 0.875rem;
      min-height: 44px;
    }

    .time-card {
      background: rgba(100, 116, 139, 0.1);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    }

    .health-card {
      background: var(--primary-gradient);
      color: white;
      box-shadow: var(--shadow-md);
    }

    .health-card.success {
      background: var(--success-gradient);
    }

    .health-card.warning {
      background: var(--warning-gradient);
    }

    .health-card.danger {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    }

    .welcome-section {
      text-align: center;
    }

    .welcome-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .welcome-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0;
    }

    /* Section Headers */
    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .section-subtitle {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
    }

    /* Metrics Grid */
    .metrics-section {
      position: relative;
      z-index: 1;
      margin-bottom: var(--spacing-2xl);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-lg);
    }

    .metric-card {
      background: var(--surface);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
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
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .metric-card:hover::before {
      opacity: 1;
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .metric-icon {
      width: 3rem;
      height: 3rem;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;
    }

    .posture-icon {
      background: var(--primary-gradient);
    }

    .time-icon {
      background: var(--accent-gradient);
    }

    .break-icon {
      background: var(--warning-gradient);
    }

    .streak-icon {
      background: var(--success-gradient);
    }

    .metric-card:hover .metric-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .metric-trend {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .metric-trend.positive {
      background: rgba(67, 233, 123, 0.1);
      color: var(--success-color);
    }

    .metric-content {
      text-align: center;
    }

    .metric-value {
      margin-bottom: var(--spacing-md);
    }

    .metric-value .value {
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--text-primary);
      line-height: 1;
    }

    .metric-value .unit {
      font-size: 1rem;
      color: var(--text-secondary);
      font-weight: 600;
      margin-left: var(--spacing-xs);
    }

    .metric-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: var(--spacing-md);
    }

    .progress-container {
      margin-bottom: var(--spacing-md);
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: rgba(226, 232, 240, 0.8);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: var(--spacing-sm);
    }

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }

    .posture-progress {
      background: var(--primary-gradient);
    }

    .time-progress {
      background: var(--accent-gradient);
    }

    .progress-text {
      font-size: 0.75rem;
      color: var(--text-light);
      font-weight: 500;
    }

    .break-visualization,
    .streak-visualization {
      display: flex;
      justify-content: center;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-sm);
    }

    .break-dot,
    .day-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(156, 163, 175, 0.3);
      transition: all 0.3s ease;
    }

    .break-dot.completed,
    .streak-day.completed .day-dot {
      background: var(--warning-color);
    }

    .break-dot.current {
      background: var(--warning-color);
      transform: scale(1.2);
      box-shadow: 0 0 0 3px rgba(250, 112, 154, 0.3);
    }

    .metric-status {
      font-size: 0.75rem;
      color: var(--text-light);
      font-weight: 500;
    }

    /* Alerts Section */
    .alerts-section {
      position: relative;
      z-index: 1;
      margin-bottom: var(--spacing-2xl);
    }

    .alerts-grid {
      display: grid;
      gap: var(--spacing-lg);
    }

    .alert-card {
      background: var(--surface);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
    }

    .alert-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: var(--warning-gradient);
    }

    .alert-warning::before {
      background: var(--warning-gradient);
    }

    .alert-danger::before {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    }

    .alert-content {
      padding: var(--spacing-xl);
      display: flex;
      gap: var(--spacing-lg);
    }

    .alert-icon-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .alert-icon {
      width: 3rem;
      height: 3rem;
      border-radius: var(--border-radius);
      background: var(--warning-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      box-shadow: var(--shadow-md);
    }

    .alert-priority {
      font-size: 0.75rem;
      font-weight: 600;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius);
      text-transform: uppercase;
    }

    .priority-warning {
      background: rgba(250, 112, 154, 0.1);
      color: var(--warning-color);
    }

    .priority-danger {
      background: rgba(255, 107, 107, 0.1);
      color: var(--danger-color);
    }

    .alert-body {
      flex: 1;
    }

    .alert-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .alert-message {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0 0 var(--spacing-lg) 0;
      line-height: 1.5;
    }

    .alert-actions {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }

    .alert-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .alert-button.primary {
      background: var(--primary-gradient);
      color: white;
      border-color: transparent;
    }

    .alert-button:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    /* Activity Section */
    .activity-section {
      position: relative;
      z-index: 1;
      margin-bottom: var(--spacing-2xl);
    }

    .activity-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }

    .timeline-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .timeline-item {
      display: flex;
      gap: var(--spacing-lg);
      position: relative;
    }

    .timeline-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
      flex-shrink: 0;
    }

    .timeline-time {
      background: var(--primary-gradient);
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
      font-weight: 600;
      min-width: 80px;
      text-align: center;
      box-shadow: var(--shadow-md);
    }

    .timeline-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--border-color);
      position: relative;
    }

    .timeline-item.completed .timeline-dot {
      background: var(--success-gradient);
    }

    .timeline-item.current .timeline-dot {
      background: var(--warning-gradient);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(250, 112, 154, 0.7); }
      50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(250, 112, 154, 0); }
    }

    .activity-card {
      background: var(--surface);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      flex: 1;
      transition: all 0.3s ease;
    }

    .timeline-item.completed .activity-card {
      background: linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%);
      border-color: rgba(67, 233, 123, 0.2);
    }

    .timeline-item.current .activity-card {
      background: linear-gradient(135deg, rgba(250, 112, 154, 0.05) 0%, rgba(254, 225, 64, 0.05) 100%);
      border-color: rgba(250, 112, 154, 0.2);
    }

    .activity-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }

    .activity-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--border-radius);
      background: var(--primary-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }

    .activity-info {
      flex: 1;
    }

    .activity-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .activity-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .activity-status {
      flex-shrink: 0;
    }

    .status-completed {
      color: var(--success-color);
      font-size: 1.5rem;
    }

    .status-current {
      color: var(--warning-color);
      font-size: 1.5rem;
      animation: bounce 1s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    .stats-grid {
      display: grid;
      gap: var(--spacing-lg);
    }

    .stat-card {
      background: var(--surface);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }

    .stat-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }

    .trophy-icon {
      background: var(--warning-gradient);
    }

    .fitness-icon {
      background: var(--accent-gradient);
    }

    .shield-icon {
      background: var(--success-gradient);
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin: 0 0 var(--spacing-xs) 0;
    }

    .stat-trend {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .stat-trend.positive {
      color: var(--success-color);
    }

    /* Quick Actions */
    .quick-actions-section {
      position: relative;
      z-index: 1;
      margin-bottom: var(--spacing-2xl);
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
    }

    .action-card {
      background: var(--surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-xl);
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      min-height: 100px;
    }

    .action-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .action-card:hover::before {
      left: 100%;
    }

    .action-card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: var(--shadow-xl);
    }

    .primary-action {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border-color: rgba(102, 126, 234, 0.2);
    }

    .primary-action:hover {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }

    .secondary-action {
      background: linear-gradient(135deg, rgba(240, 147, 251, 0.05) 0%, rgba(245, 87, 108, 0.05) 100%);
      border-color: rgba(240, 147, 251, 0.2);
    }

    .tertiary-action {
      background: linear-gradient(135deg, rgba(79, 172, 254, 0.05) 0%, rgba(0, 242, 254, 0.05) 100%);
      border-color: rgba(79, 172, 254, 0.2);
    }

    .quaternary-action {
      background: linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%);
      border-color: rgba(67, 233, 123, 0.2);
    }

    .action-icon {
      width: 3rem;
      height: 3rem;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      flex-shrink: 0;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
    }

    .primary-action .action-icon {
      background: var(--primary-gradient);
    }

    .secondary-action .action-icon {
      background: var(--secondary-gradient);
    }

    .tertiary-action .action-icon {
      background: var(--accent-gradient);
    }

    .quaternary-action .action-icon {
      background: var(--success-gradient);
    }

    .action-card:hover .action-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .action-content h3 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .action-content p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* Mobile Responsive Design */
    @media (max-width: 1024px) {
      .activity-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .content {
        padding: var(--spacing-md);
      }

      .modern-header {
        margin-bottom: var(--spacing-xl);
      }

      .header-content {
        flex-direction: column;
        gap: var(--spacing-lg);
        padding: var(--spacing-lg);
        text-align: center;
      }

      .brand-section {
        justify-content: center;
      }

      .status-section {
        flex-direction: column;
        gap: var(--spacing-sm);
        width: 100%;
      }

      .status-card {
        justify-content: center;
        width: 100%;
      }

      .welcome-title {
        font-size: 1.5rem;
      }

      .welcome-subtitle {
        font-size: 0.875rem;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
      }

      .metric-card {
        padding: var(--spacing-lg);
      }

      .metric-header {
        flex-direction: column;
        gap: var(--spacing-md);
        text-align: center;
      }

      .timeline-item {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .timeline-indicator {
        flex-direction: row;
        align-items: center;
      }

      .activity-card {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-sm);
      }

      .alert-content {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
      }

      .alert-actions {
        justify-content: center;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }

      .action-card {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
      }
    }

    @media (max-width: 480px) {
      .content {
        padding: var(--spacing-sm);
      }

      .brand-logo {
        width: 3rem;
        height: 3rem;
      }

      .brand-info h1 {
        font-size: 1.5rem;
      }

      .welcome-title {
        font-size: 1.25rem;
      }

      .section-title {
        font-size: 1.25rem;
      }

      .metric-value .value {
        font-size: 2rem;
      }

      .metric-icon {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;
      }

      .timeline-time {
        font-size: 0.75rem;
        padding: var(--spacing-xs) var(--spacing-sm);
        min-width: 60px;
      }

      .activity-icon {
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
      }

      .action-icon {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;
      }
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
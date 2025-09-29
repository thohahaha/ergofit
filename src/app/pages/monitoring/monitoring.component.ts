import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToggle,
  IonRange,
  IonProgressBar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  alertCircleOutline,
  warningOutline,
  playOutline,
  pauseOutline,
  stopOutline,
  settingsOutline,
  eyeOutline,
  cameraOutline,
  timerOutline,
  statsChartOutline,
  notificationsOutline,
  bodyOutline,
  shieldCheckmarkOutline,
  pulseOutline,
  refreshOutline,
  informationCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonToggle,
    IonRange,
    IonProgressBar
  ],
  template: `
    <ion-content class="monitoring-content">
      <div class="monitoring-container">

        <!-- Header Section -->
        <div class="monitoring-header">
          <div class="header-content">
            <div class="header-info">
              <h1 class="page-title">Real-Time Monitoring</h1>
              <p class="page-subtitle">Live posture analysis and ergonomic feedback</p>
            </div>
            <div class="header-status">
              <div class="monitoring-status" [class.active]="isMonitoring">
                <div class="status-indicator"></div>
                <span>{{isMonitoring ? 'Active' : 'Inactive'}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Control Panel -->
        <div class="control-panel">
          <div class="control-header">
            <h3 class="control-title">Monitoring Controls</h3>
            <div class="session-timer">
              <ion-icon name="timer-outline"></ion-icon>
              <span>{{formatTime(sessionTime)}}</span>
            </div>
          </div>

          <div class="control-actions">
            <ion-button
              [color]="isMonitoring ? 'danger' : 'primary'"
              class="control-btn primary"
              (click)="toggleMonitoring()">
              <ion-icon [name]="isMonitoring ? 'pause-outline' : 'play-outline'" slot="start"></ion-icon>
              {{isMonitoring ? 'Pause' : 'Start'}} Monitoring
            </ion-button>

            <ion-button
              fill="outline"
              color="medium"
              class="control-btn"
              (click)="stopMonitoring()"
              [disabled]="!isMonitoring">
              <ion-icon name="stop-outline" slot="start"></ion-icon>
              Stop
            </ion-button>

            <ion-button
              fill="outline"
              color="medium"
              class="control-btn"
              (click)="openSettings()">
              <ion-icon name="settings-outline" slot="start"></ion-icon>
              Settings
            </ion-button>
          </div>

          <div class="monitoring-settings">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Detection Sensitivity</h4>
                <p>Adjust posture detection sensitivity</p>
              </div>
              <ion-range
                [(ngModel)]="sensitivity"
                min="1"
                max="10"
                step="1"
                pin="true"
                class="sensitivity-range">
                <ion-label slot="start">Low</ion-label>
                <ion-label slot="end">High</ion-label>
              </ion-range>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h4>Real-time Alerts</h4>
                <p>Get instant notifications for poor posture</p>
              </div>
              <ion-toggle
                [(ngModel)]="realTimeAlerts"
                class="alert-toggle">
              </ion-toggle>
            </div>
          </div>
        </div>

        <!-- Live Status Overview -->
        <div class="status-overview">
          <div class="overall-status-card">
            <div class="status-header">
              <div class="status-icon" [class]="getOverallStatusClass()">
                <ion-icon [name]="getOverallStatusIcon()"></ion-icon>
              </div>
              <div class="status-info">
                <h3 class="status-title">Overall Posture</h3>
                <div class="status-score">{{getOverallScore()}}/100</div>
                <div class="status-label" [class]="getOverallStatusClass()">{{getOverallStatusText()}}</div>
              </div>
            </div>
            <div class="status-progress">
              <ion-progress-bar
                [value]="getOverallScore() / 100"
                [color]="getOverallStatusColor()">
              </ion-progress-bar>
            </div>
          </div>
        </div>

        <!-- Body Visualization -->
        <div class="body-visualization">
          <div class="visualization-header">
            <h3 class="viz-title">Posture Visualization</h3>
            <div class="viz-controls">
              <ion-button fill="clear" size="small" class="viz-btn" (click)="toggleBodyView()">
                <ion-icon name="eye-outline"></ion-icon>
              </ion-button>
              <ion-button fill="clear" size="small" class="viz-btn" (click)="capturePosture()">
                <ion-icon name="camera-outline"></ion-icon>
              </ion-button>
            </div>
          </div>

          <div class="body-figure-container">
            <svg width="200" height="300" viewBox="0 0 200 300" class="body-figure">
              <!-- Head -->
              <circle cx="100" cy="40" r="25" [attr.fill]="getBodyPartColor('head')" stroke="#e5e7eb" stroke-width="2"/>

              <!-- Neck -->
              <rect x="95" y="65" width="10" height="20" [attr.fill]="getBodyPartColor('neck')" stroke="#e5e7eb" stroke-width="2"/>

              <!-- Shoulders -->
              <rect x="70" y="85" width="60" height="15" [attr.fill]="getBodyPartColor('shoulders')" stroke="#e5e7eb" stroke-width="2" rx="7"/>

              <!-- Back/Spine -->
              <rect x="95" y="100" width="10" height="80" [attr.fill]="getBodyPartColor('back')" stroke="#e5e7eb" stroke-width="2"/>

              <!-- Hips -->
              <rect x="85" y="180" width="30" height="20" [attr.fill]="getBodyPartColor('hips')" stroke="#e5e7eb" stroke-width="2" rx="10"/>

              <!-- Arms -->
              <rect x="50" y="90" width="15" height="60" [attr.fill]="getBodyPartColor('arms')" stroke="#e5e7eb" stroke-width="2" rx="7"/>
              <rect x="135" y="90" width="15" height="60" [attr.fill]="getBodyPartColor('arms')" stroke="#e5e7eb" stroke-width="2" rx="7"/>

              <!-- Legs -->
              <rect x="90" y="200" width="8" height="80" [attr.fill]="getBodyPartColor('legs')" stroke="#e5e7eb" stroke-width="2"/>
              <rect x="102" y="200" width="8" height="80" [attr.fill]="getBodyPartColor('legs')" stroke="#e5e7eb" stroke-width="2"/>
            </svg>

            <div class="body-legend">
              <div class="legend-item">
                <div class="legend-color excellent"></div>
                <span>Excellent</span>
              </div>
              <div class="legend-item">
                <div class="legend-color good"></div>
                <span>Good</span>
              </div>
              <div class="legend-item">
                <div class="legend-color fair"></div>
                <span>Fair</span>
              </div>
              <div class="legend-item">
                <div class="legend-color poor"></div>
                <span>Poor</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Metrics -->
        <div class="detailed-metrics">
          <div class="metrics-header">
            <h3 class="metrics-title">Body Part Analysis</h3>
            <div class="metrics-refresh">
              <ion-button fill="clear" size="small" (click)="refreshMetrics()">
                <ion-icon name="refresh-outline"></ion-icon>
              </ion-button>
            </div>
          </div>

          <div class="metrics-grid">
            <div class="metric-card" [class]="getMetricStatusClass(neckScore)">
              <div class="metric-header">
                <div class="metric-icon">
                  <ion-icon name="body-outline"></ion-icon>
                </div>
                <div class="metric-info">
                  <h4 class="metric-title">Neck Position</h4>
                  <div class="metric-value">{{neckScore}}<span class="metric-unit">/10</span></div>
                </div>
                <div class="metric-status">
                  <ion-chip [color]="getMetricColor(neckScore)" class="status-chip">
                    {{getStatusText(neckScore)}}
                  </ion-chip>
                </div>
              </div>
              <div class="metric-progress">
                <ion-progress-bar [value]="neckScore / 10" [color]="getMetricColor(neckScore)"></ion-progress-bar>
              </div>
              <div class="metric-recommendation">
                <p>{{getNeckRecommendation()}}</p>
              </div>
            </div>

            <div class="metric-card" [class]="getMetricStatusClass(shoulderScore)">
              <div class="metric-header">
                <div class="metric-icon">
                  <ion-icon name="body-outline"></ion-icon>
                </div>
                <div class="metric-info">
                  <h4 class="metric-title">Shoulders</h4>
                  <div class="metric-value">{{shoulderScore}}<span class="metric-unit">/10</span></div>
                </div>
                <div class="metric-status">
                  <ion-chip [color]="getMetricColor(shoulderScore)" class="status-chip">
                    {{getStatusText(shoulderScore)}}
                  </ion-chip>
                </div>
              </div>
              <div class="metric-progress">
                <ion-progress-bar [value]="shoulderScore / 10" [color]="getMetricColor(shoulderScore)"></ion-progress-bar>
              </div>
              <div class="metric-recommendation">
                <p>{{getShoulderRecommendation()}}</p>
              </div>
            </div>

            <div class="metric-card" [class]="getMetricStatusClass(backScore)">
              <div class="metric-header">
                <div class="metric-icon">
                  <ion-icon name="body-outline"></ion-icon>
                </div>
                <div class="metric-info">
                  <h4 class="metric-title">Back Posture</h4>
                  <div class="metric-value">{{backScore}}<span class="metric-unit">/10</span></div>
                </div>
                <div class="metric-status">
                  <ion-chip [color]="getMetricColor(backScore)" class="status-chip">
                    {{getStatusText(backScore)}}
                  </ion-chip>
                </div>
              </div>
              <div class="metric-progress">
                <ion-progress-bar [value]="backScore / 10" [color]="getMetricColor(backScore)"></ion-progress-bar>
              </div>
              <div class="metric-recommendation">
                <p>{{getBackRecommendation()}}</p>
              </div>
            </div>

            <div class="metric-card" [class]="getMetricStatusClass(hipScore)">
              <div class="metric-header">
                <div class="metric-icon">
                  <ion-icon name="body-outline"></ion-icon>
                </div>
                <div class="metric-info">
                  <h4 class="metric-title">Hip Alignment</h4>
                  <div class="metric-value">{{hipScore}}<span class="metric-unit">/10</span></div>
                </div>
                <div class="metric-status">
                  <ion-chip [color]="getMetricColor(hipScore)" class="status-chip">
                    {{getStatusText(hipScore)}}
                  </ion-chip>
                </div>
              </div>
              <div class="metric-progress">
                <ion-progress-bar [value]="hipScore / 10" [color]="getMetricColor(hipScore)"></ion-progress-bar>
              </div>
              <div class="metric-recommendation">
                <p>{{getHipRecommendation()}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Activity Feed -->
        <div class="activity-feed">
          <div class="feed-header">
            <h3 class="feed-title">Live Activity Feed</h3>
            <div class="feed-controls">
              <ion-button fill="clear" size="small" (click)="clearFeed()">Clear</ion-button>
            </div>
          </div>

          <div class="feed-content">
            <div class="activity-item" *ngFor="let activity of activityFeed; trackBy: trackByActivity">
              <div class="activity-time">{{formatTime(activity.timestamp)}}</div>
              <div class="activity-content">
                <div class="activity-icon" [class]="activity.type">
                  <ion-icon [name]="getActivityIcon(activity.type)"></ion-icon>
                </div>
                <div class="activity-info">
                  <h5 class="activity-title">{{activity.title}}</h5>
                  <p class="activity-description">{{activity.description}}</p>
                </div>
              </div>
            </div>

            <div class="empty-feed" *ngIf="activityFeed.length === 0">
              <ion-icon name="information-circle-outline"></ion-icon>
              <p>Start monitoring to see live posture updates</p>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stats-header">
            <h3 class="stats-title">Session Statistics</h3>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="timer-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{formatTime(sessionTime)}}</div>
                <div class="stat-label">Session Time</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="pulse-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{alertCount}}</div>
                <div class="stat-label">Alerts Today</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="shield-checkmark-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{goodPostureTime}}%</div>
                <div class="stat-label">Good Posture</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="stats-chart-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{improvementTrend > 0 ? '+' : ''}}{{improvementTrend}}%</div>
                <div class="stat-label">Improvement</div>
              </div>
            </div>
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
      --info-color: #8b5cf6;
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

    /* ===== CONTENT STYLING ===== */
    .monitoring-content {
      --background: var(--background-secondary);
      --color: var(--text-primary);
    }

    .monitoring-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }

    /* ===== HEADER SECTION ===== */
    .monitoring-header {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }

    .header-content {
      padding: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }

    .header-info {
      flex: 1;
    }

    .page-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0;
    }

    .header-status {
      display: flex;
      align-items: center;
    }

    .monitoring-status {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: var(--background-tertiary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      font-weight: 500;
      color: var(--text-secondary);
    }

    .monitoring-status.active {
      background: rgba(16, 185, 129, 0.1);
      border-color: var(--success-color);
      color: var(--success-color);
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--text-light);
    }

    .monitoring-status.active .status-indicator {
      background: var(--success-color);
      animation: pulse 2s ease-in-out infinite;
    }

    /* ===== CONTROL PANEL ===== */
    .control-panel {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }

    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .control-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .session-timer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--background-secondary);
      border-radius: var(--radius-md);
      font-family: monospace;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-color);
    }

    .control-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
    }

    .control-btn {
      height: 48px;
      font-weight: 500;
      --border-radius: var(--radius-lg);
    }

    .control-btn.primary {
      min-width: 180px;
    }

    .monitoring-settings {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-light);
    }

    .setting-info {
      flex: 1;
      margin-right: 24px;
    }

    .setting-info h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .setting-info p {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
    }

    .sensitivity-range {
      min-width: 200px;
    }

    /* ===== STATUS OVERVIEW ===== */
    .status-overview {
      margin-bottom: 24px;
    }

    .overall-status-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      box-shadow: var(--shadow-sm);
    }

    .status-header {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 20px;
    }

    .status-icon {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: white;
    }

    .status-icon.excellent {
      background: linear-gradient(135deg, var(--success-color), #059669);
    }

    .status-icon.good {
      background: linear-gradient(135deg, #22c55e, var(--success-color));
    }

    .status-icon.fair {
      background: linear-gradient(135deg, var(--warning-color), #d97706);
    }

    .status-icon.poor {
      background: linear-gradient(135deg, var(--danger-color), #dc2626);
    }

    .status-info {
      flex: 1;
    }

    .status-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .status-score {
      font-size: 36px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 4px 0;
      line-height: 1;
    }

    .status-label {
      font-size: 14px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: var(--radius-md);
      display: inline-block;
    }

    .status-label.excellent {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success-color);
    }

    .status-label.good {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    .status-label.fair {
      background: rgba(245, 158, 11, 0.1);
      color: var(--warning-color);
    }

    .status-label.poor {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger-color);
    }

    .status-progress {
      margin-top: 16px;
    }

    .status-progress ion-progress-bar {
      height: 8px;
      --progress-background: var(--background-tertiary);
    }

    /* ===== BODY VISUALIZATION ===== */
    .body-visualization {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }

    .visualization-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .viz-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .viz-controls {
      display: flex;
      gap: 8px;
    }

    .viz-btn {
      --color: var(--text-secondary);
      width: 32px;
      height: 32px;
    }

    .body-figure-container {
      text-align: center;
    }

    .body-figure {
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
      transition: all 0.3s ease;
    }

    .body-legend {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .legend-color.excellent {
      background: var(--success-color);
    }

    .legend-color.good {
      background: #22c55e;
    }

    .legend-color.fair {
      background: var(--warning-color);
    }

    .legend-color.poor {
      background: var(--danger-color);
    }

    /* ===== DETAILED METRICS ===== */
    .detailed-metrics {
      margin-bottom: 24px;
    }

    .metrics-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .metrics-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .metrics-refresh ion-button {
      --color: var(--text-secondary);
      width: 32px;
      height: 32px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .metric-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .metric-card.excellent {
      border-left: 4px solid var(--success-color);
      background: rgba(16, 185, 129, 0.02);
    }

    .metric-card.good {
      border-left: 4px solid #22c55e;
      background: rgba(34, 197, 94, 0.02);
    }

    .metric-card.fair {
      border-left: 4px solid var(--warning-color);
      background: rgba(245, 158, 11, 0.02);
    }

    .metric-card.poor {
      border-left: 4px solid var(--danger-color);
      background: rgba(239, 68, 68, 0.02);
    }

    .metric-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .metric-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--background-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
      font-size: 18px;
    }

    .metric-info {
      flex: 1;
    }

    .metric-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .metric-value {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
    }

    .metric-unit {
      font-size: 14px;
      color: var(--text-light);
      font-weight: 500;
    }

    .metric-status {
      align-self: flex-start;
    }

    .status-chip {
      --border-radius: var(--radius-md);
      font-size: 11px;
      font-weight: 600;
      height: 24px;
    }

    .metric-progress {
      margin-bottom: 16px;
    }

    .metric-progress ion-progress-bar {
      height: 6px;
      --progress-background: var(--background-tertiary);
    }

    .metric-recommendation {
      padding: 12px;
      background: var(--background-secondary);
      border-radius: var(--radius-md);
    }

    .metric-recommendation p {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* ===== ACTIVITY FEED ===== */
    .activity-feed {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }

    .feed-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .feed-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .feed-controls ion-button {
      --color: var(--text-secondary);
      font-size: 12px;
      height: 32px;
    }

    .feed-content {
      max-height: 300px;
      overflow-y: auto;
    }

    .activity-item {
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--border-light);
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-time {
      font-size: 12px;
      color: var(--text-light);
      font-family: monospace;
      min-width: 60px;
      padding-top: 2px;
    }

    .activity-content {
      display: flex;
      gap: 12px;
      flex: 1;
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: white;
      flex-shrink: 0;
    }

    .activity-icon.info {
      background: var(--info-color);
    }

    .activity-icon.warning {
      background: var(--warning-color);
    }

    .activity-icon.success {
      background: var(--success-color);
    }

    .activity-icon.danger {
      background: var(--danger-color);
    }

    .activity-info {
      flex: 1;
    }

    .activity-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .activity-description {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .empty-feed {
      text-align: center;
      padding: 40px 20px;
      color: var(--text-light);
    }

    .empty-feed ion-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    /* ===== QUICK STATS ===== */
    .quick-stats {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }

    .stats-header {
      margin-bottom: 24px;
    }

    .stats-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-light);
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: rgba(37, 99, 235, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
      font-size: 18px;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 4px 0;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .monitoring-container {
        padding: 16px;
      }

      .header-content {
        padding: 24px 20px;
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }

      .page-title {
        font-size: 24px;
      }

      .control-panel {
        padding: 24px 20px;
      }

      .control-actions {
        flex-direction: column;
        gap: 12px;
      }

      .setting-item {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }

      .setting-info {
        margin-right: 0;
        text-align: center;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .body-legend {
        gap: 12px;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .metric-header {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
        gap: 12px;
      }

      .body-legend {
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
    }
  `]
})
export class MonitoringComponent implements OnInit, OnDestroy, AfterViewInit {
  // Monitoring State
  isMonitoring: boolean = false;
  sessionTime: number = 0;
  sensitivity: number = 7;
  realTimeAlerts: boolean = true;

  // Posture Scores
  neckScore: number = 7;
  shoulderScore: number = 8;
  backScore: number = 6;
  hipScore: number = 7;

  // Statistics
  alertCount: number = 3;
  goodPostureTime: number = 72;
  improvementTrend: number = 8;

  // Activity Feed
  activityFeed: any[] = [];

  // Intervals
  private dataInterval: any;
  private sessionInterval: any;

  constructor() {
    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'alert-circle-outline': alertCircleOutline,
      'warning-outline': warningOutline,
      'play-outline': playOutline,
      'pause-outline': pauseOutline,
      'stop-outline': stopOutline,
      'settings-outline': settingsOutline,
      'eye-outline': eyeOutline,
      'camera-outline': cameraOutline,
      'timer-outline': timerOutline,
      'stats-chart-outline': statsChartOutline,
      'notifications-outline': notificationsOutline,
      'body-outline': bodyOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'pulse-outline': pulseOutline,
      'refresh-outline': refreshOutline,
      'information-circle-outline': informationCircleOutline
    });
  }

  ngOnInit() {
    this.initializeActivityFeed();
  }

  ngAfterViewInit() {
    // Initialize any chart visualizations if needed
  }

  ngOnDestroy() {
    this.stopMonitoring();
  }

  toggleMonitoring() {
    if (this.isMonitoring) {
      this.pauseMonitoring();
    } else {
      this.startMonitoring();
    }
  }

  startMonitoring() {
    this.isMonitoring = true;
    this.addActivity('info', 'Monitoring Started', 'Real-time posture monitoring is now active');

    // Start data simulation
    this.dataInterval = setInterval(() => {
      this.updatePostureData();
    }, 3000);

    // Start session timer
    this.sessionInterval = setInterval(() => {
      this.sessionTime++;
    }, 1000);
  }

  pauseMonitoring() {
    this.isMonitoring = false;
    this.addActivity('warning', 'Monitoring Paused', 'Monitoring session has been paused');

    if (this.dataInterval) {
      clearInterval(this.dataInterval);
      this.dataInterval = null;
    }

    if (this.sessionInterval) {
      clearInterval(this.sessionInterval);
      this.sessionInterval = null;
    }
  }

  stopMonitoring() {
    this.isMonitoring = false;
    this.sessionTime = 0;
    this.addActivity('info', 'Monitoring Stopped', 'Session ended and data saved');

    if (this.dataInterval) {
      clearInterval(this.dataInterval);
      this.dataInterval = null;
    }

    if (this.sessionInterval) {
      clearInterval(this.sessionInterval);
      this.sessionInterval = null;
    }
  }

  openSettings() {
    console.log('Opening monitoring settings...');
  }

  toggleBodyView() {
    console.log('Toggling body view...');
  }

  capturePosture() {
    this.addActivity('success', 'Posture Captured', 'Current posture snapshot saved for analysis');
  }

  refreshMetrics() {
    this.updatePostureData();
    this.addActivity('info', 'Metrics Refreshed', 'Posture analysis data has been updated');
  }

  clearFeed() {
    this.activityFeed = [];
  }

  // Data and Status Methods
  private updatePostureData() {
    const oldNeck = this.neckScore;
    const oldShoulder = this.shoulderScore;
    const oldBack = this.backScore;
    const oldHip = this.hipScore;

    // Simulate gradual changes
    this.neckScore = Math.max(1, Math.min(10, this.neckScore + Math.floor(Math.random() * 3 - 1)));
    this.shoulderScore = Math.max(1, Math.min(10, this.shoulderScore + Math.floor(Math.random() * 3 - 1)));
    this.backScore = Math.max(1, Math.min(10, this.backScore + Math.floor(Math.random() * 3 - 1)));
    this.hipScore = Math.max(1, Math.min(10, this.hipScore + Math.floor(Math.random() * 3 - 1)));

    // Check for significant changes
    if (Math.abs(this.neckScore - oldNeck) >= 2) {
      const improvement = this.neckScore > oldNeck;
      this.addActivity(
        improvement ? 'success' : 'warning',
        `Neck Position ${improvement ? 'Improved' : 'Declined'}`,
        `Score changed from ${oldNeck} to ${this.neckScore}`
      );
    }

    // Check for alerts
    if (this.realTimeAlerts && this.getOverallScore() < 60) {
      this.alertCount++;
      this.addActivity('danger', 'Poor Posture Alert', 'Please adjust your posture immediately');
    }
  }

  private initializeActivityFeed() {
    this.activityFeed = [
      {
        id: 1,
        timestamp: Date.now() - 300000,
        type: 'info',
        title: 'Monitoring Initialized',
        description: 'System ready for posture tracking'
      }
    ];
  }

  private addActivity(type: string, title: string, description: string) {
    const activity = {
      id: Date.now(),
      timestamp: Date.now(),
      type,
      title,
      description
    };

    this.activityFeed.unshift(activity);

    // Keep only last 10 activities
    if (this.activityFeed.length > 10) {
      this.activityFeed = this.activityFeed.slice(0, 10);
    }
  }

  // Body Part Colors
  getBodyPartColor(part: string): string {
    const scores: { [key: string]: number } = {
      'head': 8,
      'neck': this.neckScore,
      'shoulders': this.shoulderScore,
      'back': this.backScore,
      'hips': this.hipScore,
      'arms': 7,
      'legs': 8
    };

    const score = scores[part] || 7;

    if (score >= 9) return '#10b981'; // Excellent - Green
    if (score >= 7) return '#22c55e'; // Good - Light Green
    if (score >= 5) return '#f59e0b'; // Fair - Yellow
    return '#ef4444'; // Poor - Red
  }

  // Overall Status Methods
  getOverallScore(): number {
    return Math.round((this.neckScore + this.shoulderScore + this.backScore + this.hipScore) * 2.5);
  }

  getOverallStatusClass(): string {
    const score = this.getOverallScore();
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  }

  getOverallStatusText(): string {
    const score = this.getOverallScore();
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  }

  getOverallStatusIcon(): string {
    const score = this.getOverallScore();
    if (score >= 70) return 'checkmark-circle-outline';
    if (score >= 50) return 'alert-circle-outline';
    return 'warning-outline';
  }

  getOverallStatusColor(): string {
    const score = this.getOverallScore();
    if (score >= 90) return 'success';
    if (score >= 70) return 'success';
    if (score >= 50) return 'warning';
    return 'danger';
  }

  // Metric Status Methods
  getMetricStatusClass(score: number): string {
    if (score >= 9) return 'excellent';
    if (score >= 7) return 'good';
    if (score >= 5) return 'fair';
    return 'poor';
  }

  getMetricColor(score: number): string {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'danger';
  }

  getStatusText(score: number): string {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  }

  // Recommendation Methods
  getNeckRecommendation(): string {
    if (this.neckScore >= 8) return 'Excellent neck position! Keep it up.';
    if (this.neckScore >= 6) return 'Good posture. Try to keep your head more aligned.';
    return 'Adjust monitor height and keep head in neutral position.';
  }

  getShoulderRecommendation(): string {
    if (this.shoulderScore >= 8) return 'Perfect shoulder alignment!';
    if (this.shoulderScore >= 6) return 'Good posture. Relax shoulders slightly.';
    return 'Lower and relax your shoulders to reduce tension.';
  }

  getBackRecommendation(): string {
    if (this.backScore >= 8) return 'Excellent spinal alignment!';
    if (this.backScore >= 6) return 'Good posture. Ensure lower back support.';
    return 'Sit back in chair and use lumbar support if available.';
  }

  getHipRecommendation(): string {
    if (this.hipScore >= 8) return 'Perfect hip positioning!';
    if (this.hipScore >= 6) return 'Good alignment. Keep feet flat on floor.';
    return 'Adjust seat height and keep hips at 90-degree angle.';
  }

  // Activity Feed Methods
  getActivityIcon(type: string): string {
    switch (type) {
      case 'success': return 'checkmark-circle-outline';
      case 'warning': return 'alert-circle-outline';
      case 'danger': return 'warning-outline';
      default: return 'information-circle-outline';
    }
  }

  trackByActivity(index: number, item: any): any {
    return item.id;
  }

  // Utility Methods
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
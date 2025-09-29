import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
  IonItem,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trendingUpOutline,
  trendingDownOutline,
  removeOutline,
  analyticsOutline,
  barChartOutline,
  pieChartOutline,
  calendarOutline,
  timeOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  warningOutline,
  eyeOutline,
  bodyOutline,
  phonePortraitOutline,
  downloadOutline,
  refreshOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonBadge,
    IonItem,
    IonSelect,
    IonSelectOption
  ],
  template: `
    <ion-content class="analytics-content">
      <div class="analytics-container">

        <!-- Header Section -->
        <div class="analytics-header">
          <div class="header-content">
            <div class="header-info">
              <h1 class="page-title">Analytics Dashboard</h1>
              <p class="page-subtitle">Comprehensive posture monitoring insights</p>
            </div>
            <div class="header-actions">
              <ion-button fill="outline" class="action-btn" (click)="refreshData()">
                <ion-icon name="refresh-outline" slot="start"></ion-icon>
                Refresh
              </ion-button>
              <ion-button fill="outline" class="action-btn" (click)="exportData()">
                <ion-icon name="download-outline" slot="start"></ion-icon>
                Export
              </ion-button>
            </div>
          </div>
        </div>

        <!-- Time Period Selector -->
        <div class="period-selector">
          <ion-segment [(ngModel)]="selectedPeriod" class="period-segment" (ionChange)="onPeriodChange($event)">
            <ion-segment-button value="day">
              <ion-label>Today</ion-label>
            </ion-segment-button>
            <ion-segment-button value="week">
              <ion-label>Week</ion-label>
            </ion-segment-button>
            <ion-segment-button value="month">
              <ion-label>Month</ion-label>
            </ion-segment-button>
            <ion-segment-button value="year">
              <ion-label>Year</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>

        <!-- Key Metrics Overview -->
        <div class="metrics-overview">
          <div class="metric-card">
            <div class="metric-icon success">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{overallScore}}</div>
              <div class="metric-label">Overall Score</div>
              <div class="metric-change positive">
                <ion-icon name="trending-up-outline"></ion-icon>
                <span>+{{scoreImprovement}}% vs last {{selectedPeriod}}</span>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon warning">
              <ion-icon name="alert-circle-outline"></ion-icon>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{alertsCount}}</div>
              <div class="metric-label">Alerts Today</div>
              <div class="metric-change negative">
                <ion-icon name="trending-down-outline"></ion-icon>
                <span>-{{alertsReduction}}% vs yesterday</span>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon primary">
              <ion-icon name="time-outline"></ion-icon>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{monitoringHours}}h</div>
              <div class="metric-label">Monitoring Time</div>
              <div class="metric-change positive">
                <ion-icon name="trending-up-outline"></ion-icon>
                <span>+{{timeIncrease}}h vs last {{selectedPeriod}}</span>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon info">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{sessionCount}}</div>
              <div class="metric-label">Sessions</div>
              <div class="metric-change neutral">
                <ion-icon name="remove-outline"></ion-icon>
                <span>Same as last {{selectedPeriod}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-section">

          <!-- Main Trend Chart -->
          <div class="chart-card main-chart">
            <div class="chart-header">
              <div class="chart-title-wrapper">
                <ion-icon name="analytics-outline" class="chart-icon"></ion-icon>
                <div class="chart-title-info">
                  <h3 class="chart-title">Posture Trend Analysis</h3>
                  <p class="chart-subtitle">{{selectedPeriod === 'day' ? 'Hourly' : selectedPeriod === 'week' ? 'Daily' : selectedPeriod === 'month' ? 'Weekly' : 'Monthly'}} performance overview</p>
                </div>
              </div>
              <div class="chart-controls">
                <ion-select [(ngModel)]="chartType" class="chart-type-select">
                  <ion-select-option value="line">Line Chart</ion-select-option>
                  <ion-select-option value="bar">Bar Chart</ion-select-option>
                  <ion-select-option value="area">Area Chart</ion-select-option>
                </ion-select>
              </div>
            </div>
            <div class="chart-container">
              <canvas #mainChart class="chart-canvas" width="800" height="400"></canvas>
            </div>
          </div>

          <!-- Secondary Charts Grid -->
          <div class="secondary-charts">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title-wrapper">
                  <ion-icon name="pie-chart-outline" class="chart-icon"></ion-icon>
                  <h4 class="chart-title">Posture Distribution</h4>
                </div>
              </div>
              <div class="chart-container">
                <canvas #postureChart class="chart-canvas" width="300" height="300"></canvas>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title-wrapper">
                  <ion-icon name="bar-chart-outline" class="chart-icon"></ion-icon>
                  <h4 class="chart-title">Alert Frequency</h4>
                </div>
              </div>
              <div class="chart-container">
                <canvas #alertChart class="chart-canvas" width="300" height="300"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Insights & Recommendations -->
        <div class="insights-section">
          <div class="insights-card">
            <div class="insights-header">
              <h3 class="insights-title">AI-Powered Insights</h3>
              <p class="insights-subtitle">Personalized recommendations based on your data</p>
            </div>
            <div class="insights-content">

              <!-- Priority Issues -->
              <div class="insight-category">
                <h4 class="category-title">
                  <ion-icon name="warning-outline" class="category-icon danger"></ion-icon>
                  Priority Issues
                </h4>
                <div class="insight-items">
                  <div class="insight-item priority-high">
                    <div class="insight-indicator"></div>
                    <div class="insight-content">
                      <h5>Forward Head Posture</h5>
                      <p>Detected 78% of monitoring time. Consider adjusting monitor height.</p>
                      <div class="insight-meta">
                        <span class="insight-frequency">↑35% vs last week</span>
                        <span class="insight-impact">High Impact</span>
                      </div>
                    </div>
                  </div>

                  <div class="insight-item priority-medium">
                    <div class="insight-indicator"></div>
                    <div class="insight-content">
                      <h5>Rounded Shoulders</h5>
                      <p>Increasingly common during afternoon sessions.</p>
                      <div class="insight-meta">
                        <span class="insight-frequency">↑15% vs last week</span>
                        <span class="insight-impact">Medium Impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Improvements -->
              <div class="insight-category">
                <h4 class="category-title">
                  <ion-icon name="checkmark-circle-outline" class="category-icon success"></ion-icon>
                  Improvements
                </h4>
                <div class="insight-items">
                  <div class="insight-item improvement">
                    <div class="insight-indicator"></div>
                    <div class="insight-content">
                      <h5>Break Frequency</h5>
                      <p>Great improvement in taking regular breaks!</p>
                      <div class="insight-meta">
                        <span class="insight-frequency">↑40% vs last week</span>
                        <span class="insight-impact">Positive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recommendations -->
              <div class="insight-category">
                <h4 class="category-title">
                  <ion-icon name="body-outline" class="category-icon info"></ion-icon>
                  Recommendations
                </h4>
                <div class="recommendation-grid">
                  <div class="recommendation-item">
                    <div class="recommendation-icon">
                      <ion-icon name="phone-portrait-outline"></ion-icon>
                    </div>
                    <div class="recommendation-content">
                      <h6>Monitor Height</h6>
                      <p>Raise monitor 2-3 inches to reduce neck strain</p>
                    </div>
                  </div>

                  <div class="recommendation-item">
                    <div class="recommendation-icon">
                      <ion-icon name="time-outline"></ion-icon>
                    </div>
                    <div class="recommendation-content">
                      <h6>Break Schedule</h6>
                      <p>Take a 30-second break every 20 minutes</p>
                    </div>
                  </div>

                  <div class="recommendation-item">
                    <div class="recommendation-icon">
                      <ion-icon name="body-outline"></ion-icon>
                    </div>
                    <div class="recommendation-content">
                      <h6>Shoulder Rolls</h6>
                      <p>Perform shoulder rolls every hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Statistics -->
        <div class="detailed-stats">
          <div class="stats-card">
            <div class="stats-header">
              <h3 class="stats-title">Detailed Statistics</h3>
              <p class="stats-subtitle">Comprehensive breakdown of your posture data</p>
            </div>
            <div class="stats-grid">
              <div class="stat-group">
                <h4 class="stat-group-title">Posture Quality</h4>
                <div class="stat-items">
                  <div class="stat-item">
                    <span class="stat-label">Excellent Posture</span>
                    <div class="stat-bar">
                      <div class="stat-fill excellent" style="width: 25%"></div>
                    </div>
                    <span class="stat-value">25%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Good Posture</span>
                    <div class="stat-bar">
                      <div class="stat-fill good" style="width: 45%"></div>
                    </div>
                    <span class="stat-value">45%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Fair Posture</span>
                    <div class="stat-bar">
                      <div class="stat-fill fair" style="width: 20%"></div>
                    </div>
                    <span class="stat-value">20%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Poor Posture</span>
                    <div class="stat-bar">
                      <div class="stat-fill poor" style="width: 10%"></div>
                    </div>
                    <span class="stat-value">10%</span>
                  </div>
                </div>
              </div>

              <div class="stat-group">
                <h4 class="stat-group-title">Activity Patterns</h4>
                <div class="stat-items">
                  <div class="stat-item">
                    <span class="stat-label">Morning Sessions</span>
                    <div class="stat-bar">
                      <div class="stat-fill primary" style="width: 30%"></div>
                    </div>
                    <span class="stat-value">30%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Afternoon Sessions</span>
                    <div class="stat-bar">
                      <div class="stat-fill primary" style="width: 50%"></div>
                    </div>
                    <span class="stat-value">50%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Evening Sessions</span>
                    <div class="stat-bar">
                      <div class="stat-fill primary" style="width: 20%"></div>
                    </div>
                    <span class="stat-value">20%</span>
                  </div>
                </div>
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
    .analytics-content {
      --background: var(--background-secondary);
      --color: var(--text-primary);
    }

    .analytics-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }

    /* ===== HEADER SECTION ===== */
    .analytics-header {
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
      align-items: flex-start;
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

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .action-btn {
      --color: var(--primary-color);
      --border-color: var(--primary-color);
      --border-radius: var(--radius-md);
      height: 40px;
      font-weight: 500;
    }

    /* ===== PERIOD SELECTOR ===== */
    .period-selector {
      margin-bottom: 32px;
      display: flex;
      justify-content: center;
    }

    .period-segment {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 4px;
      box-shadow: var(--shadow-sm);
      width: fit-content;
    }

    .period-segment ion-segment-button {
      --color: var(--text-secondary);
      --color-checked: var(--primary-color);
      --background-checked: var(--background-primary);
      --border-radius: var(--radius-lg);
      margin: 2px;
      font-weight: 500;
      min-width: 80px;
    }

    /* ===== METRICS OVERVIEW ===== */
    .metrics-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
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
      box-shadow: var(--shadow-sm);
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
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

    .metric-icon.success {
      background: linear-gradient(135deg, var(--success-color), #059669);
    }

    .metric-icon.warning {
      background: linear-gradient(135deg, var(--warning-color), #d97706);
    }

    .metric-icon.primary {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    }

    .metric-icon.info {
      background: linear-gradient(135deg, var(--info-color), #7c3aed);
    }

    .metric-content {
      flex: 1;
    }

    .metric-value {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 4px 0;
      line-height: 1;
    }

    .metric-label {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0 0 8px 0;
      font-weight: 500;
    }

    .metric-change {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .metric-change.positive {
      color: var(--success-color);
    }

    .metric-change.negative {
      color: var(--danger-color);
    }

    .metric-change.neutral {
      color: var(--text-light);
    }

    /* ===== CHARTS SECTION ===== */
    .charts-section {
      margin-bottom: 32px;
    }

    .chart-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 28px;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
    }

    .chart-card:hover {
      box-shadow: var(--shadow-md);
    }

    .main-chart {
      margin-bottom: 24px;
    }

    .secondary-charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    .chart-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 4px 0 0 0;
    }

    .chart-type-select {
      --color: var(--text-secondary);
      font-size: 14px;
    }

    .chart-container {
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .chart-canvas {
      max-width: 100%;
      height: auto;
    }

    /* ===== INSIGHTS SECTION ===== */
    .insights-section {
      margin-bottom: 32px;
    }

    .insights-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      box-shadow: var(--shadow-sm);
    }

    .insights-header {
      margin-bottom: 32px;
    }

    .insights-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .insights-subtitle {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0;
    }

    .insight-category {
      margin-bottom: 32px;
    }

    .category-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 20px 0;
    }

    .category-icon {
      font-size: 20px;
      width: 32px;
      height: 32px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-icon.danger {
      color: var(--danger-color);
      background: rgba(239, 68, 68, 0.1);
    }

    .category-icon.success {
      color: var(--success-color);
      background: rgba(16, 185, 129, 0.1);
    }

    .category-icon.info {
      color: var(--info-color);
      background: rgba(139, 92, 246, 0.1);
    }

    .insight-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .insight-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
      border-left: 4px solid;
    }

    .insight-item.priority-high {
      border-left-color: var(--danger-color);
    }

    .insight-item.priority-medium {
      border-left-color: var(--warning-color);
    }

    .insight-item.improvement {
      border-left-color: var(--success-color);
    }

    .insight-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }

    .priority-high .insight-indicator {
      background: var(--danger-color);
    }

    .priority-medium .insight-indicator {
      background: var(--warning-color);
    }

    .improvement .insight-indicator {
      background: var(--success-color);
    }

    .insight-content h5 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .insight-content p {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0 0 12px 0;
      line-height: 1.5;
    }

    .insight-meta {
      display: flex;
      gap: 16px;
      font-size: 12px;
      font-weight: 500;
    }

    .insight-frequency {
      color: var(--text-light);
    }

    .insight-impact {
      color: var(--primary-color);
    }

    .recommendation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .recommendation-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-light);
    }

    .recommendation-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .recommendation-content h6 {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .recommendation-content p {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* ===== DETAILED STATISTICS ===== */
    .detailed-stats {
      margin-bottom: 32px;
    }

    .stats-card {
      background: var(--background-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      box-shadow: var(--shadow-sm);
    }

    .stats-header {
      margin-bottom: 32px;
    }

    .stats-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .stats-subtitle {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 32px;
    }

    .stat-group {
      background: var(--background-secondary);
      border-radius: var(--radius-lg);
      padding: 24px;
    }

    .stat-group-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 20px 0;
    }

    .stat-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-secondary);
      min-width: 120px;
      font-weight: 500;
    }

    .stat-bar {
      flex: 1;
      height: 8px;
      background: var(--background-tertiary);
      border-radius: 4px;
      overflow: hidden;
    }

    .stat-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.6s ease;
    }

    .stat-fill.excellent {
      background: linear-gradient(90deg, var(--success-color), #059669);
    }

    .stat-fill.good {
      background: linear-gradient(90deg, #22c55e, var(--success-color));
    }

    .stat-fill.fair {
      background: linear-gradient(90deg, var(--warning-color), #d97706);
    }

    .stat-fill.poor {
      background: linear-gradient(90deg, var(--danger-color), #dc2626);
    }

    .stat-fill.primary {
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    }

    .stat-value {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      min-width: 40px;
      text-align: right;
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .analytics-container {
        padding: 16px;
      }

      .header-content {
        padding: 24px 20px;
        flex-direction: column;
        align-items: stretch;
        text-align: center;
      }

      .header-actions {
        justify-content: center;
      }

      .page-title {
        font-size: 24px;
      }

      .metrics-overview {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .secondary-charts {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .recommendation-grid {
        grid-template-columns: 1fr;
      }

      .chart-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }
    }

    @media (max-width: 480px) {
      .metric-card {
        flex-direction: column;
        text-align: center;
      }

      .period-segment {
        width: 100%;
      }

      .period-segment ion-segment-button {
        min-width: auto;
        flex: 1;
      }

      .insight-item {
        flex-direction: column;
        text-align: center;
      }

      .insight-meta {
        justify-content: center;
      }
    }
  `]
})
export class AnalyticsComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('mainChart', { static: false }) mainChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('postureChart', { static: false }) postureChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('alertChart', { static: false }) alertChart!: ElementRef<HTMLCanvasElement>;

  // Period Selection
  selectedPeriod: string = 'week';
  chartType: string = 'line';

  // Analytics Data
  overallScore: number = 78;
  scoreImprovement: number = 12;
  alertsCount: number = 5;
  alertsReduction: number = 25;
  monitoringHours: number = 8.5;
  timeIncrease: number = 1.2;
  sessionCount: number = 12;

  // Chart Data
  trendData: number[] = [65, 72, 80, 75, 85, 78, 90];
  postureDistribution: number[] = [25, 45, 20, 10]; // Excellent, Good, Fair, Poor
  alertFrequency: number[] = [12, 8, 15, 5, 3, 7, 9];

  // Chart instances
  mainChartInstance: any;
  postureChartInstance: any;
  alertChartInstance: any;

  private updateInterval: any;

  constructor() {
    addIcons({
      'trending-up-outline': trendingUpOutline,
      'trending-down-outline': trendingDownOutline,
      'remove-outline': removeOutline,
      'analytics-outline': analyticsOutline,
      'bar-chart-outline': barChartOutline,
      'pie-chart-outline': pieChartOutline,
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline,
      'alert-circle-outline': alertCircleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'warning-outline': warningOutline,
      'eye-outline': eyeOutline,
      'body-outline': bodyOutline,
      'phone-portrait-outline': phonePortraitOutline,
      'download-outline': downloadOutline,
      'refresh-outline': refreshOutline
    });
  }

  ngOnInit() {
    this.startDataSimulation();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  ngOnDestroy() {
    this.stopDataSimulation();
    this.destroyCharts();
  }

  onPeriodChange(event: any) {
    this.selectedPeriod = event.detail.value;
    this.updateChartsForPeriod();
  }

  refreshData() {
    this.generateNewData();
    this.updateAllCharts();
  }

  exportData() {
    // Implementation for data export
    console.log('Exporting analytics data...');
  }

  private initializeCharts() {
    this.drawMainChart();
    this.drawPostureChart();
    this.drawAlertChart();
  }

  private drawMainChart() {
    if (!this.mainChart?.nativeElement) return;

    const canvas = this.mainChart.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw trend line chart
    const padding = 60;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);

    // Draw grid
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw trend line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    this.trendData.forEach((value, index) => {
      const x = padding + (chartWidth / (this.trendData.length - 1)) * index;
      const y = padding + chartHeight - (value / 100) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#2563eb';
    this.trendData.forEach((value, index) => {
      const x = padding + (chartWidth / (this.trendData.length - 1)) * index;
      const y = padding + chartHeight - (value / 100) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index;
      ctx.fillText(label, x, height - 20);
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      const value = 100 - (i * 20);
      ctx.fillText(value.toString(), padding - 10, y + 4);
    }
  }

  private drawPostureChart() {
    if (!this.postureChart?.nativeElement) return;

    const canvas = this.postureChart.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = ['#10b981', '#22c55e', '#f59e0b', '#ef4444'];
    const labels = ['Excellent', 'Good', 'Fair', 'Poor'];

    let startAngle = -Math.PI / 2;

    this.postureDistribution.forEach((value, index) => {
      const sliceAngle = (value / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = colors[index];
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Draw score in center
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.overallScore}`, centerX, centerY + 8);
  }

  private drawAlertChart() {
    if (!this.alertChart?.nativeElement) return;

    const canvas = this.alertChart.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const barWidth = (width - padding * 2) / this.alertFrequency.length;
    const maxValue = Math.max(...this.alertFrequency);

    this.alertFrequency.forEach((value, index) => {
      const barHeight = (value / maxValue) * (height - padding * 2);
      const x = padding + index * barWidth;
      const y = height - padding - barHeight;

      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#dc2626');

      ctx.fillStyle = gradient;
      ctx.fillRect(x + barWidth * 0.2, y, barWidth * 0.6, barHeight);
    });
  }

  private updateChartsForPeriod() {
    // Generate new data based on selected period
    this.generateDataForPeriod(this.selectedPeriod);
    this.updateAllCharts();
  }

  private generateDataForPeriod(period: string) {
    switch (period) {
      case 'day':
        this.trendData = Array.from({length: 24}, () => Math.floor(Math.random() * 40) + 60);
        break;
      case 'week':
        this.trendData = Array.from({length: 7}, () => Math.floor(Math.random() * 40) + 60);
        break;
      case 'month':
        this.trendData = Array.from({length: 30}, () => Math.floor(Math.random() * 40) + 60);
        break;
      case 'year':
        this.trendData = Array.from({length: 12}, () => Math.floor(Math.random() * 40) + 60);
        break;
    }
  }

  private updateAllCharts() {
    this.drawMainChart();
    this.drawPostureChart();
    this.drawAlertChart();
  }

  private generateNewData() {
    this.overallScore = Math.floor(Math.random() * 30) + 70;
    this.scoreImprovement = Math.floor(Math.random() * 20) + 5;
    this.alertsCount = Math.floor(Math.random() * 10) + 1;
    this.alertsReduction = Math.floor(Math.random() * 30) + 10;
    this.monitoringHours = Math.round((Math.random() * 4 + 6) * 10) / 10;
    this.timeIncrease = Math.round((Math.random() * 2 + 0.5) * 10) / 10;
    this.sessionCount = Math.floor(Math.random() * 8) + 8;
  }

  private startDataSimulation() {
    this.updateInterval = setInterval(() => {
      this.generateNewData();
      this.updateAllCharts();
    }, 30000); // Update every 30 seconds
  }

  private stopDataSimulation() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private destroyCharts() {
    // Clean up chart instances if using Chart.js
    if (this.mainChartInstance) {
      this.mainChartInstance.destroy();
    }
    if (this.postureChartInstance) {
      this.postureChartInstance.destroy();
    }
    if (this.alertChartInstance) {
      this.alertChartInstance.destroy();
    }
  }
}
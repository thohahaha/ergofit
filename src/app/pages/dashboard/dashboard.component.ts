import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonButton, IonChip } from '@ionic/angular/standalone';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton, IonChip],
  template: `
    <ion-content class="dashboard">
      <!-- Header -->
      <div class="header">
        <div class="header-content">
          <div class="header-left">
            <h1>ErgoFit Dashboard</h1>
            <p>Real-time Workspace Analytics</p>
          </div>
          <div class="header-right">
            <div class="status-indicator" [class]="currentStatus">
              <div class="status-dot"></div>
              <span>{{currentStatusText}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Key Metrics Row -->
        <div class="metrics-row">
          <div class="metric-card primary">
            <div class="metric-header">
              <div class="metric-icon">
                <ion-icon name="analytics-outline"></ion-icon>
              </div>
              <div class="metric-trend positive">
                <ion-icon name="trending-up-outline"></ion-icon>
                <span>+5%</span>
              </div>
            </div>
            <div class="metric-value">{{postureScore}}<span class="unit">%</span></div>
            <div class="metric-label">Posture Score</div>
            <div class="metric-progress">
              <div class="progress-track">
                <div class="progress-fill" [style.width]="postureScore + '%'"></div>
              </div>
              <span class="progress-text">Excellent</span>
            </div>
          </div>

          <div class="metric-card secondary">
            <div class="metric-header">
              <div class="metric-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </div>
            <div class="metric-value">{{activeTime}}</div>
            <div class="metric-label">Active Time Today</div>
            <div class="metric-progress">
              <div class="progress-track">
                <div class="progress-fill" [style.width]="timeProgressPercent + '%'"></div>
              </div>
              <span class="progress-text">{{timeProgressPercent}}% of 8hr target</span>
            </div>
          </div>

          <div class="metric-card tertiary">
            <div class="metric-header">
              <div class="metric-icon">
                <ion-icon name="refresh-outline"></ion-icon>
              </div>
            </div>
            <div class="metric-value">{{breaksToday}}<span class="unit">/8</span></div>
            <div class="metric-label">Breaks Taken</div>
            <div class="break-indicators">
              <div *ngFor="let i of [1,2,3,4,5,6,7,8]"
                   class="break-dot" [class.completed]="i <= breaksToday"></div>
            </div>
          </div>

          <div class="metric-card warning" *ngIf="activeWarnings > 0">
            <div class="metric-header">
              <div class="metric-icon alert">
                <ion-icon name="warning-outline"></ion-icon>
              </div>
            </div>
            <div class="metric-value">{{activeWarnings}}</div>
            <div class="metric-label">Active Alerts</div>
            <div class="alert-message">{{latestWarningMessage}}</div>
          </div>
        </div>

        <!-- Alert Banner -->
        <div *ngIf="activeWarnings > 0" class="alert-banner">
          <div class="alert-content">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <div class="alert-text">
              <strong>Posture Alert</strong>
              <span>{{latestWarningMessage}} • {{formatTime(lastWarningTime)}}</span>
            </div>
            <ion-button fill="clear" size="small" class="alert-action">
              Take Break
            </ion-button>
          </div>
        </div>

        <!-- Statistics Section -->
        <div class="stats-section">
          <div class="section-header">
            <h2>Weekly Overview</h2>
            <div class="period-selector">
              <span class="active">7 Days</span>
              <span>30 Days</span>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="trophy-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{weeklyStats.averageScore}}%</div>
                <div class="stat-label">Average Score</div>
                <div class="stat-change positive">+2.3% vs last week</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="café-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{weeklyStats.totalBreaks}}</div>
                <div class="stat-label">Total Breaks</div>
                <div class="stat-change positive">+12% vs last week</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <ion-icon name="shield-checkmark-outline"></ion-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{weeklyStats.totalWarnings}}</div>
                <div class="stat-label">Alerts Resolved</div>
                <div class="stat-change negative">-8% vs last week</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h3>Quick Actions</h3>
          <div class="action-buttons">
            <ion-button class="action-btn primary" (click)="startQuickBreak()">
              <ion-icon name="pause-outline"></ion-icon>
              <span>Take Break</span>
            </ion-button>
            <ion-button class="action-btn secondary" fill="outline">
              <ion-icon name="settings-outline"></ion-icon>
              <span>Settings</span>
            </ion-button>
            <ion-button class="action-btn secondary" fill="outline">
              <ion-icon name="document-text-outline"></ion-icon>
              <span>Reports</span>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
    }

    .dashboard {
      --background: transparent !important;
    }

    /* Header Section */
    .header {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 2rem 0 1.5rem;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem;
      letter-spacing: -0.025em;
    }

    .header-left p {
      color: #64748b;
      font-size: 1rem;
      margin: 0;
      font-weight: 500;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.875rem;
      border: 1px solid;
    }

    .status-indicator.status-good {
      background: #f0fdf4;
      border-color: #22c55e;
      color: #15803d;
    }

    .status-indicator.status-warning {
      background: #fffbeb;
      border-color: #f59e0b;
      color: #d97706;
    }

    .status-indicator.status-danger {
      background: #fef2f2;
      border-color: #ef4444;
      color: #dc2626;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .status-good .status-dot { background: #22c55e; }
    .status-warning .status-dot { background: #f59e0b; }
    .status-danger .status-dot { background: #ef4444; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Main Content */
    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Metrics Row */
    .metrics-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 2rem;
      transition: all 0.3s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .metric-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .metric-card.primary { border-left: 4px solid #3b82f6; }
    .metric-card.secondary { border-left: 4px solid #10b981; }
    .metric-card.tertiary { border-left: 4px solid #8b5cf6; }
    .metric-card.warning { border-left: 4px solid #f59e0b; }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .metric-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .metric-card.primary .metric-icon { background: #3b82f6; }
    .metric-card.secondary .metric-icon { background: #10b981; }
    .metric-card.tertiary .metric-icon { background: #8b5cf6; }
    .metric-card.warning .metric-icon.alert { background: #f59e0b; }

    .metric-trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .metric-trend.positive { color: #22c55e; }
    .metric-trend.negative { color: #ef4444; }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1e293b;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .metric-value .unit {
      font-size: 1.5rem;
      color: #64748b;
      font-weight: 600;
    }

    .metric-label {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    .metric-progress {
      margin-top: 1rem;
    }

    .progress-track {
      height: 6px;
      background: #f1f5f9;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .metric-card.primary .progress-fill { background: #3b82f6; }
    .metric-card.secondary .progress-fill { background: #10b981; }
    .metric-card.tertiary .progress-fill { background: #8b5cf6; }

    .progress-text {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
    }

    .break-indicators {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .break-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #e2e8f0;
      transition: all 0.3s ease;
    }

    .break-dot.completed {
      background: #8b5cf6;
      box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
    }

    .alert-message {
      font-size: 0.875rem;
      color: #dc2626;
      font-weight: 500;
      margin-top: 0.5rem;
    }

    /* Alert Banner */
    .alert-banner {
      background: linear-gradient(90deg, #fef3c7, #fef9c3);
      border: 1px solid #f59e0b;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
    }

    .alert-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .alert-content ion-icon {
      color: #f59e0b;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .alert-text {
      flex: 1;
    }

    .alert-text strong {
      color: #92400e;
      font-weight: 700;
      display: block;
      margin-bottom: 0.25rem;
    }

    .alert-text span {
      color: #a16207;
      font-size: 0.875rem;
    }

    .alert-action {
      --color: #f59e0b;
      font-weight: 600;
    }

    /* Statistics Section */
    .stats-section {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .section-header h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .period-selector {
      display: flex;
      gap: 1rem;
    }

    .period-selector span {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .period-selector span.active {
      background: #3b82f6;
      color: white;
    }

    .period-selector span:not(.active) {
      color: #64748b;
    }

    .period-selector span:not(.active):hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #3b82f6;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .stat-change {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .stat-change.positive { color: #22c55e; }
    .stat-change.negative { color: #ef4444; }

    /* Quick Actions */
    .quick-actions {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .quick-actions h3 {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1.5rem;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-btn {
      --border-radius: 12px;
      --padding-start: 1.5rem;
      --padding-end: 1.5rem;
      height: 48px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .action-btn.primary {
      --background: #3b82f6;
      --color: white;
    }

    .action-btn.secondary {
      --border-color: #d1d5db;
      --color: #374151;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .main-content {
        padding: 1rem;
      }

      .metrics-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .metric-card {
        padding: 1.5rem;
      }

      .section-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-btn {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 1.5rem 0 1rem;
      }

      .header-content {
        padding: 0 1rem;
      }

      .header-left h1 {
        font-size: 1.5rem;
      }

      .metric-value {
        font-size: 2rem;
      }

      .stats-section,
      .quick-actions {
        padding: 1.5rem;
      }
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Basic data properties
  postureScore = 85;
  activeWarnings = 2;
  latestWarningMessage = 'Poor posture detected';
  lastWarningTime = new Date();
  activeTime = '6.5h';
  timeProgressPercent = 81;
  breaksToday = 5;
  currentStatus = 'status-good';
  currentStatusText = 'Good Posture';
  
  weeklyStats = {
    averageScore: 78,
    totalBreaks: 35,
    totalWarnings: 12
  };

  ngOnInit() {
    this.simulateRealTimeData();
  }

  ngOnDestroy() {}

  formatTime(date: Date): string {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  startQuickBreak() {
    console.log('Starting quick break...');
  }

  private simulateRealTimeData() {
    setInterval(() => {
      this.postureScore = Math.floor(Math.random() * 20) + 70;
      this.activeWarnings = Math.floor(Math.random() * 4);
      
      if (this.postureScore > 80) {
        this.currentStatus = 'status-good';
        this.currentStatusText = 'Good Posture';
      } else if (this.postureScore > 60) {
        this.currentStatus = 'status-warning';
        this.currentStatusText = 'Fair Posture';
      } else {
        this.currentStatus = 'status-danger';
        this.currentStatusText = 'Poor Posture';
      }
    }, 5000);
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
  shieldCheckmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton],
  template: `
    <ion-content class="dashboard futuristic-dashboard">
      <!-- Animated Background -->
      <div class="futuristic-bg">
        <div class="grid-overlay"></div>
        <div class="floating-particles">
          <div *ngFor="let i of particleArray" class="particle" [style.animation-delay]="i * 0.5 + 's'"></div>
        </div>
        <div class="neural-network">
          <div class="network-node" *ngFor="let node of networkNodes"
               [style.left]="node.x + '%'"
               [style.top]="node.y + '%'"
               [style.animation-delay]="node.delay + 's'"></div>
        </div>
      </div>

      <!-- Futuristic Header -->
      <div class="header futuristic-header">
        <div class="header-content">
          <div class="header-left">
            <div class="logo-container">
              <div class="logo-glow"></div>
              <h1 class="holographic-title">
                <span class="title-main">ErgoFit</span>
                <span class="title-sub">Smart Posture Monitor</span>
              </h1>
            </div>
            <div class="system-info">
              <div class="info-line">
                <span class="info-label">Status:</span>
                <span class="info-value">Active</span>
              </div>
              <div class="info-line">
                <span class="info-label">Sync:</span>
                <span class="info-value">{{neuralSyncStatus}}%</span>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="status-indicator futuristic-status" [class]="currentStatus">
              <div class="status-ring">
                <div class="status-core"></div>
              </div>
              <div class="status-text">
                <span class="status-label">{{currentStatusText}}</span>
                <span class="status-timestamp">{{getCurrentTime()}}</span>
              </div>
            </div>
            <div class="control-panel">
              <button class="holo-button" (click)="toggleScanMode()">
                <ion-icon name="refresh-outline"></ion-icon>
                <span>Refresh</span>
              </button>
              <button class="holo-button" (click)="openTerminal()">
                <ion-icon name="settings-outline"></ion-icon>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Menu -->
      <div class="quick-access-menu">
        <div class="menu-container">
          <div class="menu-item" *ngFor="let item of quickAccessItems"
               (click)="executeQuickAction(item.action)"
               [class.active]="item.active">
            <div class="menu-icon">
              <ion-icon [name]="item.icon"></ion-icon>
            </div>
            <span class="menu-label">{{item.label}}</span>
            <div class="menu-glow"></div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Key Metrics Row -->
        <div class="metrics-row">
          <div class="metric-card primary holo-card">
            <div class="card-border-animation"></div>
            <div class="metric-header">
              <div class="metric-icon holo-icon">
                <ion-icon name="analytics-outline"></ion-icon>
                <div class="icon-pulse"></div>
              </div>
              <div class="metric-trend positive">
                <ion-icon name="trending-up-outline"></ion-icon>
                <span>+{{trendValue}}%</span>
              </div>
            </div>
            <div class="metric-value holographic">
              <span class="value-digits">{{postureScore}}</span>
              <span class="unit">%</span>
              <div class="value-scanner"></div>
            </div>
            <div class="metric-label">Posture Score</div>
            <div class="metric-progress futuristic-progress">
              <div class="progress-track">
                <div class="progress-fill animated" [style.width]="postureScore + '%'"></div>
                <div class="progress-glow" [style.width]="postureScore + '%'"></div>
              </div>
              <span class="progress-text">{{getPostureStatus()}}</span>
            </div>
          </div>

          <div class="metric-card secondary holo-card">
            <div class="card-border-animation"></div>
            <div class="metric-header">
              <div class="metric-icon holo-icon">
                <ion-icon name="time-outline"></ion-icon>
                <div class="icon-pulse secondary"></div>
              </div>
            </div>
            <div class="metric-value holographic">
              <span class="value-digits">{{activeTime}}</span>
              <div class="value-scanner"></div>
            </div>
            <div class="metric-label">Active Time Today</div>
            <div class="metric-progress futuristic-progress">
              <div class="progress-track">
                <div class="progress-fill secondary animated" [style.width]="timeProgressPercent + '%'"></div>
                <div class="progress-glow secondary" [style.width]="timeProgressPercent + '%'"></div>
              </div>
              <span class="progress-text">{{timeProgressPercent}}% of 8hr target</span>
            </div>
          </div>

          <div class="metric-card tertiary holo-card">
            <div class="card-border-animation"></div>
            <div class="metric-header">
              <div class="metric-icon holo-icon">
                <ion-icon name="refresh-outline"></ion-icon>
                <div class="icon-pulse tertiary"></div>
              </div>
            </div>
            <div class="metric-value holographic">
              <span class="value-digits">{{breaksToday}}</span>
              <span class="unit">/8</span>
              <div class="value-scanner"></div>
            </div>
            <div class="metric-label">Breaks Taken</div>
            <div class="break-indicators futuristic-breaks">
              <div *ngFor="let i of [1,2,3,4,5,6,7,8]"
                   class="break-node"
                   [class.completed]="i <= breaksToday"
                   [class.active]="i === breaksToday + 1">
                <div class="node-core"></div>
                <div class="node-ring"></div>
              </div>
            </div>
          </div>

          <div class="metric-card warning holo-card alert-card" *ngIf="activeWarnings > 0">
            <div class="card-border-animation danger"></div>
            <div class="alert-pulse"></div>
            <div class="metric-header">
              <div class="metric-icon holo-icon alert">
                <ion-icon name="warning-outline"></ion-icon>
                <div class="icon-pulse danger"></div>
              </div>
            </div>
            <div class="metric-value holographic danger">
              <span class="value-digits">{{activeWarnings}}</span>
              <div class="value-scanner danger"></div>
            </div>
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
                <ion-icon name="cafe-outline"></ion-icon>
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
      color: #1e293b;
      overflow-x: hidden;
    }

    .futuristic-dashboard {
      --background: transparent !important;
      position: relative;
    }

    /* Subtle Background Effects */
    .futuristic-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
    }

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .floating-particles,
    .neural-network {
      display: none; /* Remove excessive animations */
    }

    /* Clean Modern Header */
    .futuristic-header {
      background: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem 0 1.5rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .logo-container {
      position: relative;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-glow {
      position: absolute;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle, #00ffff 0%, transparent 70%);
      border-radius: 50%;
      animation: logo-pulse 2s infinite;
      filter: blur(10px);
    }

    @keyframes logo-pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .holographic-title {
      font-family: 'Orbitron', monospace;
      margin: 0;
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .title-main {
      font-size: 2.2rem;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: -0.02em;
    }

    .title-sub {
      font-size: 0.9rem;
      color: #64748b;
      font-weight: 500;
      letter-spacing: 0.05em;
      margin-top: 0.3rem;
    }

    .system-info {
      margin-top: 1rem;
      font-family: 'Roboto Mono', monospace;
    }

    .info-line {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.3rem;
    }

    .info-label {
      color: #888;
      font-size: 0.7rem;
      min-width: 80px;
    }

    .info-value {
      color: #10b981;
      font-size: 0.75rem;
      font-weight: 600;
    }

    /* Clean Status Indicator */
    .futuristic-status {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 1.2rem;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .status-ring {
      position: relative;
      width: 32px;
      height: 32px;
      border: 2px solid #e2e8f0;
      border-radius: 50%;
    }

    .status-core {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .status-good .status-core { background: #10b981; }
    .status-warning .status-core { background: #f59e0b; }
    .status-danger .status-core { background: #ef4444; }

    .status-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .status-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1e293b;
    }

    .status-timestamp {
      font-size: 0.75rem;
      color: #64748b;
    }

    /* Control Panel */
    .control-panel {
      display: flex;
      gap: 0.5rem;
    }

    .holo-button {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #1e293b;
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }

    .holo-button:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .holo-button ion-icon {
      margin-right: 0.4rem;
      font-size: 1rem;
    }

    /* Simplified Quick Access Menu */
    .quick-access-menu {
      margin: 2rem 0;
    }

    .menu-container {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .menu-item {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .menu-item:hover,
    .menu-item.active {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .menu-item.active {
      border-color: #3b82f6;
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
    }

    .menu-icon {
      font-size: 1.2rem;
      color: #64748b;
      transition: all 0.2s ease;
    }

    .menu-item.active .menu-icon {
      color: #3b82f6;
    }

    .menu-label {
      font-size: 0.8rem;
      color: #1e293b;
      font-weight: 500;
    }

    .menu-glow {
      display: none; /* Remove glow effects */
    }

    /* Main Content */
    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Clean Modern Cards */
    .metrics-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .holo-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .holo-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .card-border-animation {
      display: none; /* Remove animated borders */
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .holo-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      background: #3b82f6;
    }

    .holo-icon.secondary {
      background: #10b981;
    }

    .holo-icon.tertiary {
      background: #8b5cf6;
    }

    .holo-icon.alert {
      background: #ef4444;
    }

    .icon-pulse {
      display: none; /* Remove pulse animations */
    }

    .metric-trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .metric-trend.positive { color: #22c55e; }
    .metric-trend.negative { color: #ef4444; }

    .holographic {
      margin-bottom: 1rem;
    }

    .value-digits {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1e293b;
      line-height: 1;
      display: inline-block;
    }

    .holographic .unit {
      font-size: 1.5rem;
      color: #64748b;
      font-weight: 600;
    }

    .value-scanner {
      display: none; /* Remove scanning animations */
    }

    .metric-label {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    .futuristic-progress {
      margin-top: 1rem;
    }

    .futuristic-progress .progress-track {
      height: 6px;
      background: #f1f5f9;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress-fill.animated {
      height: 100%;
      background: #3b82f6;
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .progress-fill.secondary {
      background: #10b981;
    }

    .progress-fill.tertiary {
      background: #8b5cf6;
    }

    .progress-glow {
      display: none; /* Remove glow effects */
    }

    .progress-text {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
    }

    .futuristic-breaks {
      display: flex;
      gap: 0.8rem;
      margin-top: 1rem;
      justify-content: center;
    }

    .break-node {
      position: relative;
      width: 16px;
      height: 16px;
    }

    .node-core {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(0, 255, 255, 0.3);
      border: 1px solid #00ffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
    }

    .node-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      border: 1px solid rgba(0, 255, 255, 0.2);
      border-radius: 50%;
    }

    .break-node.completed .node-core {
      background: #8844ff;
      border-color: #8844ff;
      box-shadow: 0 0 10px #8844ff;
    }

    .break-node.active .node-core {
      background: #ffff00;
      border-color: #ffff00;
      box-shadow: 0 0 15px #ffff00;
      animation: active-node 1.5s infinite;
    }

    @keyframes active-node {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.3); }
    }

    .alert-card {
      position: relative;
    }

    .alert-pulse {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid #ff4444;
      animation: alert-pulse-anim 1s infinite;
      pointer-events: none;
    }

    @keyframes alert-pulse-anim {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.02); }
      100% { opacity: 1; transform: scale(1); }
    }

    .alert-message {
      font-size: 0.8rem;
      color: #ff4444;
      font-weight: 600;
      margin-top: 0.5rem;
      font-family: 'Roboto Mono', monospace;
      text-transform: uppercase;
      animation: alert-text 2s infinite;
    }

    @keyframes alert-text {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
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
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .action-btn {
        width: 100%;
        justify-content: center;
        height: 52px;
        font-size: 1rem;
      }

      /* Better mobile metric cards */
      .metric-header {
        margin-bottom: 1rem;
      }

      .metric-icon {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }

      .metric-value {
        font-size: 2rem;
        line-height: 1.1;
      }

      /* Compact alert banner for mobile */
      .alert-content {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
      }

      .alert-action {
        width: 100%;
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

  constructor() {
    // Add icons to the icon registry
    addIcons({
      'analytics-outline': analyticsOutline,
      'time-outline': timeOutline,
      'refresh-outline': refreshOutline,
      'warning-outline': warningOutline,
      'trending-up-outline': trendingUpOutline,
      'alert-circle-outline': alertCircleOutline,
      'settings-outline': settingsOutline,
      'person-outline': personOutline,
      'notifications-outline': notificationsOutline,
      'help-outline': helpOutline,
      'scan-outline': scanOutline,
      'terminal-outline': terminalOutline,
      'pause-outline': pauseOutline,
      'document-text-outline': documentTextOutline,
      'trophy-outline': trophyOutline,
      'cafe-outline': cafeOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline
    });

    console.log('ErgoFit Dashboard initialized with icons');
  }

  // Futuristic UI properties
  neuralSyncStatus = 97;
  trendValue = 5.2;
  particleArray = Array.from({length: 20}, (_, i) => i);
  networkNodes = [
    {x: 10, y: 20, delay: 0},
    {x: 30, y: 50, delay: 1},
    {x: 60, y: 30, delay: 2},
    {x: 80, y: 70, delay: 1.5},
    {x: 45, y: 80, delay: 0.5},
    {x: 70, y: 15, delay: 2.5}
  ];

  quickAccessItems = [
    {icon: 'analytics-outline', label: 'Analytics', action: 'analyze', active: true},
    {icon: 'person-outline', label: 'Profile', action: 'profile', active: false},
    {icon: 'notifications-outline', label: 'Alerts', action: 'alerts', active: false},
    {icon: 'settings-outline', label: 'Settings', action: 'config', active: false},
    {icon: 'help-outline', label: 'Help', action: 'help', active: false}
  ];

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

  // Futuristic UI methods
  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getPostureStatus(): string {
    if (this.postureScore >= 85) return 'OPTIMAL';
    if (this.postureScore >= 70) return 'STABLE';
    if (this.postureScore >= 50) return 'DEGRADED';
    return 'CRITICAL';
  }

  toggleScanMode() {
    console.log('Scan mode toggled');
    // Add scan mode logic here
  }

  openTerminal() {
    console.log('Terminal opened');
    // Add terminal logic here
  }

  executeQuickAction(action: string) {
    // Update active state
    this.quickAccessItems.forEach(item => item.active = item.action === action);
    console.log('Executing action:', action);
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
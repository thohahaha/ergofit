import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonButton, IonChip } from '@ionic/angular/standalone';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton, IonChip],
  template: `
    <ion-content class="futuristic-dashboard">
      <!-- Futuristic Hero Section -->
      <div class="hero-section">
        <div class="hero-background"></div>
        <div class="hero-content">
          <div class="status-indicator">
            <div class="pulse-ring"></div>
            <div class="pulse-dot"></div>
          </div>
          <h1 class="hero-title">ErgoFit Dashboard</h1>
          <p class="hero-subtitle">Real-time Ergonomic Monitoring</p>
          <ion-chip class="status-chip" [class]="currentStatus">
            {{currentStatusText}}
          </ion-chip>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <!-- Posture Score Card -->
        <div class="metric-card primary-metric">
          <div class="metric-header">
            <div class="metric-icon posture-icon">
              <ion-icon name="body-outline"></ion-icon>
            </div>
            <div class="trend-indicator">
              <ion-icon name="trending-up-outline" class="trend-up"></ion-icon>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{postureScore}}<span class="metric-unit">%</span></div>
            <div class="metric-label">Posture Score</div>
            <div class="metric-progress">
              <div class="progress-circle" [style.--progress]="postureScore"></div>
            </div>
          </div>
        </div>

        <!-- Warnings Card -->
        <div class="metric-card warning-metric">
          <div class="metric-header">
            <div class="metric-icon warning-icon">
              <ion-icon name="warning-outline"></ion-icon>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{activeWarnings}}</div>
            <div class="metric-label">Active Warnings</div>
            <div class="warning-list" *ngIf="activeWarnings > 0">
              <div class="warning-item">
                <ion-icon name="alert-circle-outline"></ion-icon>
                <span>{{latestWarningMessage}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Time Card -->
        <div class="metric-card time-metric">
          <div class="metric-header">
            <div class="metric-icon time-icon">
              <ion-icon name="time-outline"></ion-icon>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{activeTime}}</div>
            <div class="metric-label">Active Time</div>
            <div class="time-progress">
              <div class="progress-bar" [style.width]="timeProgressPercent + '%'"></div>
            </div>
            <div class="time-target">Target: 8 hours</div>
          </div>
        </div>

        <!-- Breaks Card -->
        <div class="metric-card break-metric">
          <div class="metric-header">
            <div class="metric-icon break-icon">
              <ion-icon name="refresh-outline"></ion-icon>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{breaksToday}}<span class="metric-unit">/8</span></div>
            <div class="metric-label">Breaks Today</div>
            <div class="break-indicators">
              <div class="break-dot" 
                   *ngFor="let i of [1,2,3,4,5,6,7,8]" 
                   [class.completed]="i <= breaksToday">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert Banner -->
      <div class="alert-banner" *ngIf="activeWarnings > 0">
        <ion-icon name="alert-circle-outline" class="alert-icon"></ion-icon>
        <div class="alert-content">
          <strong>Real-time Warning:</strong> {{latestWarningMessage}}
        </div>
        <div class="alert-time">{{formatTime(lastWarningTime)}}</div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-section">
        <h2>Quick Stats</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{weeklyStats.averageScore}}%</div>
            <div class="stat-label">Avg Score</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{weeklyStats.totalBreaks}}</div>
            <div class="stat-label">Total Breaks</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{weeklyStats.totalWarnings}}</div>
            <div class="stat-label">Warnings</div>
          </div>
        </div>
      </div>

      <!-- FAB -->
      <div class="fab-container">
        <ion-button class="fab-button" (click)="startQuickBreak()">
          <ion-icon name="pause-outline"></ion-icon>
        </ion-button>
      </div>

      <div class="content-spacer"></div>
    </ion-content>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);overflow-x:hidden}
    .futuristic-dashboard{--background:transparent!important}
    .hero-section{position:relative;padding:2rem 1rem;text-align:center;background:rgba(106,90,205,.1);border-radius:0 0 30px 30px;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);margin-bottom:2rem}
    .hero-background{position:absolute;inset:0;background:radial-gradient(circle at 20% 30%,rgba(120,119,198,.3) 0%,transparent 50%);animation:backgroundShift 8s ease-in-out infinite}
    @keyframes backgroundShift{0%,100%{transform:translateX(0)}50%{transform:translateX(20px)}}
    .hero-content{position:relative;z-index:2}
    .status-indicator{position:relative;display:inline-block;margin-bottom:1rem}
    .pulse-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border:3px solid rgba(0,255,127,.6);border-radius:50%;animation:pulse-ring 2s infinite}
    .pulse-dot{width:20px;height:20px;background:linear-gradient(45deg,#00ff7f,#32cd32);border-radius:50%;box-shadow:0 0 20px rgba(0,255,127,.8);animation:pulse-dot 2s infinite}
    @keyframes pulse-ring{0%{transform:translate(-50%,-50%) scale(.8);opacity:1}100%{transform:translate(-50%,-50%) scale(2.5);opacity:0}}
    @keyframes pulse-dot{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
    .hero-title{font-size:2.5rem;font-weight:700;background:linear-gradient(135deg,#fff,#e0e0e0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.5rem}
    .hero-subtitle{color:rgba(255,255,255,.7);font-size:1.1rem;margin-bottom:1.5rem}
    .status-chip{--background:rgba(255,255,255,.1);--color:white;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2)}
    .status-good{--background:rgba(0,255,127,.2)}
    .status-warning{--background:rgba(255,193,7,.2)}
    .status-danger{--background:rgba(244,67,54,.2)}
    .metrics-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;padding:0 1rem;margin-bottom:2rem}
    .metric-card{background:rgba(255,255,255,.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:1.5rem;transition:all .4s ease;position:relative;cursor:pointer}
    .metric-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 40px rgba(0,0,0,.3);background:rgba(255,255,255,.08)}
    .metric-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gradient-start),var(--gradient-end))}
    .primary-metric{--gradient-start:#6c63ff;--gradient-end:#9c88ff}
    .warning-metric{--gradient-start:#ff6b35;--gradient-end:#ffa500}
    .time-metric{--gradient-start:#00d4aa;--gradient-end:#00ffcc}
    .break-metric{--gradient-start:#667eea;--gradient-end:#764ba2}
    .metric-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
    .metric-icon{width:50px;height:50px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;position:relative}
    .metric-icon::before{content:'';position:absolute;inset:0;background:linear-gradient(45deg,var(--icon-color-1),var(--icon-color-2));opacity:.2}
    .posture-icon{--icon-color-1:#6c63ff;--icon-color-2:#9c88ff;color:#9c88ff}
    .warning-icon{--icon-color-1:#ff6b35;--icon-color-2:#ffa500;color:#ffa500}
    .time-icon{--icon-color-1:#00d4aa;--icon-color-2:#00ffcc;color:#00ffcc}
    .break-icon{--icon-color-1:#667eea;--icon-color-2:#764ba2;color:#764ba2}
    .trend-up{color:#00ff7f}
    .metric-content{color:white}
    .metric-value{font-size:2.5rem;font-weight:700;margin-bottom:.5rem;background:linear-gradient(135deg,#fff,#e0e0e0);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .metric-unit{font-size:1rem;opacity:.7}
    .metric-label{color:rgba(255,255,255,.8);font-size:.9rem;margin-bottom:1rem}
    .metric-progress{position:relative;width:80px;height:80px;margin:1rem auto 0}
    .progress-circle{width:100%;height:100%;border-radius:50%;background:conic-gradient(from 0deg,#6c63ff 0deg,#6c63ff calc(var(--progress)*3.6deg),rgba(255,255,255,.1) calc(var(--progress)*3.6deg));position:relative}
    .progress-circle::before{content:'';position:absolute;inset:8px;border-radius:50%;background:rgba(26,26,46,.9)}
    .warning-list{margin-top:1rem}
    .warning-item{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:rgba(255,255,255,.8);margin-bottom:.3rem}
    .time-progress{height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin:1rem 0 .5rem}
    .progress-bar{height:100%;background:linear-gradient(90deg,#00d4aa,#00ffcc);border-radius:4px;transition:width .3s ease}
    .time-target{font-size:.8rem;color:rgba(255,255,255,.6)}
    .break-indicators{display:flex;gap:.5rem;margin-top:1rem;justify-content:center}
    .break-dot{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.2);transition:all .3s ease}
    .break-dot.completed{background:linear-gradient(45deg,#667eea,#764ba2);box-shadow:0 0 10px rgba(102,126,234,.6)}
    .alert-banner{display:flex;align-items:center;gap:1rem;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3);border-radius:15px;padding:1rem 1.5rem;margin:0 1rem 2rem;backdrop-filter:blur(10px)}
    .alert-icon{color:#ffa500;font-size:1.5rem}
    .alert-content{flex:1;color:white}
    .alert-time{color:rgba(255,255,255,.7);font-size:.9rem}
    .stats-section{margin:0 1rem 2rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:1.5rem;backdrop-filter:blur(20px)}
    .stats-section h2{color:white;font-size:1.3rem;font-weight:600;margin:0 0 1rem}
    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
    .stat-item{text-align:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:15px;padding:1rem}
    .stat-value{font-size:1.5rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem}
    .stat-label{color:rgba(255,255,255,.8);font-size:.8rem}
    .fab-container{position:fixed;bottom:120px;right:20px;z-index:1000}
    .fab-button{width:56px;height:56px;border-radius:50%;--background:linear-gradient(135deg,#6c63ff,#9c88ff);--box-shadow:0 8px 25px rgba(0,0,0,.3);transition:all .3s ease}
    .fab-button:hover{transform:scale(1.1)}
    .content-spacer{height:120px}
    @media (max-width:768px){.hero-title{font-size:2rem}.metrics-grid{grid-template-columns:1fr;gap:1rem;padding:0 .5rem}.stats-grid{grid-template-columns:repeat(3,1fr)}.fab-container{bottom:100px;right:15px}}
    @media (max-width:480px){.hero-section{padding:1.5rem .5rem}.stats-section{margin:0 .5rem 1.5rem;padding:1rem}.stats-grid{grid-template-columns:1fr}}
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
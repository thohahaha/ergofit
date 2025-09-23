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
      <!-- Hero Section -->
      <div class="hero">
        <div class="pulse">
          <div class="ring"></div>
          <div class="dot"></div>
        </div>
        <h1>ErgoFit Dashboard</h1>
        <p>Real-time Ergonomic Monitoring</p>
        <ion-chip [class]="currentStatus">{{currentStatusText}}</ion-chip>
      </div>

      <!-- Metrics Grid -->
      <div class="metrics">
        <!-- Posture Score -->
        <div class="card primary">
          <div class="card-header">
            <ion-icon name="body-outline" class="icon"></ion-icon>
            <ion-icon name="trending-up-outline" color="success"></ion-icon>
          </div>
          <div class="value">{{postureScore}}%</div>
          <div class="label">Posture Score</div>
          <div class="progress">
            <div class="circle" [style.--progress]="postureScore"></div>
          </div>
        </div>

        <!-- Warnings -->
        <div class="card warning">
          <div class="card-header">
            <ion-icon name="warning-outline" class="icon"></ion-icon>
          </div>
          <div class="value">{{activeWarnings}}</div>
          <div class="label">Active Warnings</div>
          <div *ngIf="activeWarnings > 0" class="warning-text">
            <ion-icon name="alert-circle-outline"></ion-icon>
            {{latestWarningMessage}}
          </div>
        </div>

        <!-- Active Time -->
        <div class="card time">
          <div class="card-header">
            <ion-icon name="time-outline" class="icon"></ion-icon>
          </div>
          <div class="value">{{activeTime}}</div>
          <div class="label">Active Time</div>
          <div class="progress-bar">
            <div class="bar" [style.width]="timeProgressPercent + '%'"></div>
          </div>
          <div class="target">Target: 8 hours</div>
        </div>

        <!-- Breaks -->
        <div class="card break">
          <div class="card-header">
            <ion-icon name="refresh-outline" class="icon"></ion-icon>
          </div>
          <div class="value">{{breaksToday}}/8</div>
          <div class="label">Breaks Today</div>
          <div class="dots">
            <div *ngFor="let i of [1,2,3,4,5,6,7,8]" 
                 class="dot" [class.done]="i <= breaksToday"></div>
          </div>
        </div>
      </div>

      <!-- Alert -->
      <div *ngIf="activeWarnings > 0" class="alert">
        <ion-icon name="alert-circle-outline"></ion-icon>
        <div>
          <strong>Warning:</strong> {{latestWarningMessage}}
        </div>
        <small>{{formatTime(lastWarningTime)}}</small>
      </div>

      <!-- Stats -->
      <div class="stats">
        <h2>Quick Stats</h2>
        <div class="stats-grid">
          <div class="stat">
            <div class="stat-value">{{weeklyStats.averageScore}}%</div>
            <div class="stat-label">Avg Score</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{weeklyStats.totalBreaks}}</div>
            <div class="stat-label">Total Breaks</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{weeklyStats.totalWarnings}}</div>
            <div class="stat-label">Warnings</div>
          </div>
        </div>
      </div>

      <!-- FAB -->
      <ion-button class="fab" (click)="startQuickBreak()">
        <ion-icon name="pause-outline"></ion-icon>
      </ion-button>

      <div style="height:120px"></div>
    </ion-content>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)}
    .dashboard{--background:transparent!important}
    .hero{position:relative;padding:2rem 1rem;text-align:center;background:rgba(106,90,205,.1);border-radius:0 0 30px 30px;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);margin-bottom:2rem}
    .pulse{position:relative;display:inline-block;margin-bottom:1rem}
    .ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border:3px solid rgba(0,255,127,.6);border-radius:50%;animation:ring 2s infinite}
    .dot{width:20px;height:20px;background:linear-gradient(45deg,#00ff7f,#32cd32);border-radius:50%;animation:dot 2s infinite}
    @keyframes ring{0%{transform:translate(-50%,-50%) scale(.8);opacity:1}100%{transform:translate(-50%,-50%) scale(2.5);opacity:0}}
    @keyframes dot{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
    h1{font-size:2.5rem;font-weight:700;background:linear-gradient(135deg,#fff,#e0e0e0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:.5rem 0}
    p{color:rgba(255,255,255,.7);font-size:1.1rem;margin-bottom:1.5rem}
    ion-chip{--background:rgba(255,255,255,.1);--color:white;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2)}
    .status-good{--background:rgba(0,255,127,.2)}
    .status-warning{--background:rgba(255,193,7,.2)}
    .status-danger{--background:rgba(244,67,54,.2)}
    .metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;padding:0 1rem;margin-bottom:2rem}
    .card{background:rgba(255,255,255,.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:1.5rem;transition:transform .3s;position:relative;cursor:pointer}
    .card:hover{transform:translateY(-8px);background:rgba(255,255,255,.08)}
    .card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--start),var(--end))}
    .primary{--start:#6c63ff;--end:#9c88ff}
    .warning{--start:#ff6b35;--end:#ffa500}
    .time{--start:#00d4aa;--end:#00ffcc}
    .break{--start:#667eea;--end:#764ba2}
    .card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
    .icon{width:50px;height:50px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:1.5rem}
    .value{font-size:2.5rem;font-weight:700;margin-bottom:.5rem;background:linear-gradient(135deg,#fff,#e0e0e0);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .label{color:rgba(255,255,255,.8);font-size:.9rem;margin-bottom:1rem}
    .progress{position:relative;width:80px;height:80px;margin:1rem auto 0}
    .circle{width:100%;height:100%;border-radius:50%;background:conic-gradient(from 0deg,#6c63ff 0deg,#6c63ff calc(var(--progress)*3.6deg),rgba(255,255,255,.1) calc(var(--progress)*3.6deg));position:relative}
    .circle::before{content:'';position:absolute;inset:8px;border-radius:50%;background:rgba(26,26,46,.9)}
    .warning-text{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:rgba(255,255,255,.8);margin-top:1rem}
    .progress-bar{height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin:1rem 0 .5rem}
    .bar{height:100%;background:linear-gradient(90deg,#00d4aa,#00ffcc);border-radius:4px;transition:width .3s}
    .target{font-size:.8rem;color:rgba(255,255,255,.6)}
    .dots{display:flex;gap:.5rem;margin-top:1rem;justify-content:center}
    .dots .dot{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.2);transition:all .3s;animation:none}
    .dots .dot.done{background:linear-gradient(45deg,#667eea,#764ba2)}
    .alert{display:flex;align-items:center;gap:1rem;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3);border-radius:15px;padding:1rem 1.5rem;margin:0 1rem 2rem;backdrop-filter:blur(10px);color:white}
    .alert ion-icon{color:#ffa500;font-size:1.5rem}
    .alert small{color:rgba(255,255,255,.7);font-size:.9rem}
    .stats{margin:0 1rem 2rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:1.5rem;backdrop-filter:blur(20px)}
    .stats h2{color:white;font-size:1.3rem;font-weight:600;margin:0 0 1rem}
    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
    .stat{text-align:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:15px;padding:1rem}
    .stat-value{font-size:1.5rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem}
    .stat-label{color:rgba(255,255,255,.8);font-size:.8rem}
    .fab{position:fixed;bottom:120px;right:20px;width:56px;height:56px;border-radius:50%;--background:linear-gradient(135deg,#6c63ff,#9c88ff);z-index:1000;transition:transform .3s}
    .fab:hover{transform:scale(1.1)}
    @media (max-width:768px){h1{font-size:2rem}.metrics{grid-template-columns:1fr;gap:1rem;padding:0 .5rem}.fab{bottom:100px;right:15px}}
    @media (max-width:480px){.hero{padding:1.5rem .5rem}.stats{margin:0 .5rem 1.5rem;padding:1rem}.stats-grid{grid-template-columns:1fr}}
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
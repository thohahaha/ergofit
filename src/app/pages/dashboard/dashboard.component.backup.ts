import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  trigger, 
  state, 
  style, 
  transition, 
  animate, 
  keyframes,
  stagger,
  query
} from '@angular/animations';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonChip,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  alertCircleOutline,
  trendingUpOutline,
  trendingDownOutline,
  pulseOutline,
  timeOutline,
  eyeOutline,
  bodyOutline,
  fitnessOutline,
  statsChartOutline,
  flashOutline,
  refreshOutline,
  playOutline,
  pauseOutline,
  checkmarkCircleOutline,
  ellipseOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonButton,
    IonChip,
    IonBadge
  ],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <ion-content class="ion-padding futuristic-dashboard" [fullscreen]="true">
      <!-- Hero Section dengan Live Status -->
      <div class="hero-section">
        <div class="hero-background"></div>
        <div class="hero-content">
          <div class="status-indicator">
            <div class="pulse-ring"></div>
            <div class="pulse-dot"></div>
          </div>
          <h1 class="hero-title">ErgoFit Dashboard</h1>
          <p class="hero-subtitle">Monitoring postur Anda secara real-time</p>
          <ion-chip class="status-chip" [class]="'status-' + (postureScore > 80 ? 'good' : postureScore > 60 ? 'warning' : 'danger')">
            <ion-icon name="pulse-outline"></ion-icon>
            <span>{{postureStatus}}</span>
          </ion-chip>
        </div>
      </div>

      <!-- Primary Metrics Grid -->
      <div class="metrics-grid">
        <!-- Posture Score Card -->
        <div class="metric-card primary-metric" (click)="onPostureCheck()">
          <div class="metric-header">
            <div class="metric-icon posture-icon">
              <ion-icon name="body-outline"></ion-icon>
            </div>
            <div class="metric-trend" [class]="'trend-' + (postureScore > lastPostureScore ? 'up' : 'down')">
              <ion-icon [name]="postureScore > lastPostureScore ? 'trending-up-outline' : 'trending-down-outline'"></ion-icon>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{postureScore}}<span class="metric-unit">/100</span></div>
            <div class="metric-label">Skor Postur</div>
            <div class="metric-progress">
              <div class="progress-ring" [style.--progress]="postureScore + '%'">
                <div class="progress-circle"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Warnings Card -->
        <div class="metric-card warning-metric">
          <div class="metric-header">
            <div class="metric-icon warning-icon">
              <ion-icon name="warning-outline"></ion-icon>
            </div>
            <ion-badge class="metric-badge" [color]="activeWarnings > 0 ? 'danger' : 'success'">
              {{activeWarnings}}
            </ion-badge>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{activeWarnings}}</div>
            <div class="metric-label">Peringatan Aktif</div>
            <div class="warning-list" *ngIf="activeWarnings > 0">
              <div class="warning-item" *ngFor="let warning of currentWarnings">
                <ion-icon name="ellipse-outline" color="warning"></ion-icon>
                <span>{{warning}}</span>
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
            <div class="time-status">
              <ion-icon [name]="isActiveSession ? 'play-outline' : 'pause-outline'" 
                       [color]="isActiveSession ? 'success' : 'medium'"></ion-icon>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{activeTime}}</div>
            <div class="metric-label">Waktu Aktif</div>
            <div class="time-progress">
              <div class="progress-bar" [style.width]="timeProgressPercent + '%'"></div>
            </div>
            <div class="time-target">Target: 8 jam</div>
          </div>
        </div>

        <!-- Breaks Today Card -->
        <div class="metric-card break-metric">
          <div class="metric-header">
            <div class="metric-icon break-icon">
              <ion-icon name="refresh-outline"></ion-icon>
            </div>
            <div class="break-completion">
              <span>{{Math.round((breaksToday / 8) * 100)}}%</span>
            </div>
          </div>
          <div class="metric-content">
            <div class="metric-value">{{breaksToday}}<span class="metric-unit">/8</span></div>
            <div class="metric-label">Istirahat Hari Ini</div>
            <div class="break-indicators">
              <div class="break-dot" 
                   *ngFor="let i of [1,2,3,4,5,6,7,8]" 
                   [class.completed]="i <= breaksToday">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Real-time Alert Banner -->
      <div class="alert-banner" *ngIf="activeWarnings > 0" [@slideIn]>
        <div class="alert-icon">
          <ion-icon name="alert-circle-outline"></ion-icon>
        </div>
        <div class="alert-content">
          <strong>Peringatan Real-time:</strong>
          <span>{{latestWarningMessage}}</span>
        </div>
        <div class="alert-time">{{formatTime(lastWarningTime)}}</div>
      </div>

      <!-- Advanced Progress Section -->
      <div class="progress-section">
        <div class="section-header">
          <h2>Progress Hari Ini</h2>
          <ion-button fill="clear" size="small" (click)="refreshData()">
            <ion-icon name="refresh-outline"></ion-icon>
          </ion-button>
        </div>
        
        <div class="progress-cards">
          <div class="progress-card">
            <div class="progress-header">
              <span class="progress-title">Postur Baik</span>
              <span class="progress-percentage">{{goodPosturePercent}}%</span>
            </div>
            <div class="advanced-progress">
              <div class="progress-track">
                <div class="progress-fill success" [style.width]="goodPosturePercent + '%'"></div>
              </div>
              <div class="progress-markers">
                <span class="marker" style="left: 25%">25%</span>
                <span class="marker" style="left: 50%">50%</span>
                <span class="marker" style="left: 75%">75%</span>
              </div>
            </div>
          </div>

          <div class="progress-card">
            <div class="progress-header">
              <span class="progress-title">Target Istirahat</span>
              <span class="progress-percentage">{{breakTargetPercent}}%</span>
            </div>
            <div class="advanced-progress">
              <div class="progress-track">
                <div class="progress-fill primary" [style.width]="breakTargetPercent + '%'"></div>
              </div>
              <div class="progress-markers">
                <span class="marker" style="left: 25%">25%</span>
                <span class="marker" style="left: 50%">50%</span>
                <span class="marker" style="left: 75%">75%</span>
              </div>
            </div>
          </div>

          <div class="progress-card">
            <div class="progress-header">
              <span class="progress-title">Aktivitas Harian</span>
              <span class="progress-percentage">{{activityPercent}}%</span>
            </div>
            <div class="advanced-progress">
              <div class="progress-track">
                <div class="progress-fill warning" [style.width]="activityPercent + '%'"></div>
              </div>
              <div class="progress-markers">
                <span class="marker" style="left: 25%">25%</span>
                <span class="marker" style="left: 50%">50%</span>
                <span class="marker" style="left: 75%">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Grid -->
      <div class="stats-section">
        <div class="section-header">
          <h2>Statistik Mingguan</h2>
          <ion-chip color="primary" size="small">
            <ion-icon name="stats-chart-outline"></ion-icon>
            <span>Analitik</span>
          </ion-chip>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <ion-icon name="trending-up-outline" color="success"></ion-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{weeklyStats.averageScore}}<span>/100</span></div>
              <div class="stat-label">Rata-rata Skor</div>
              <div class="stat-change positive">+{{weeklyStats.scoreImprovement}}% minggu ini</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <ion-icon name="warning-outline" color="warning"></ion-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{weeklyStats.totalWarnings}}</div>
              <div class="stat-label">Total Peringatan</div>
              <div class="stat-change negative">-{{weeklyStats.warningReduction}}% dari minggu lalu</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <ion-icon name="time-outline" color="primary"></ion-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{weeklyStats.productiveTime}}</div>
              <div class="stat-label">Waktu Produktif</div>
              <div class="stat-change positive">+{{weeklyStats.timeIncrease}}h minggu ini</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <ion-icon name="checkmark-circle-outline" color="success"></ion-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{weeklyStats.breaksCompleted}}<span>/{{weeklyStats.breaksTarget}}</span></div>
              <div class="stat-label">Istirahat Selesai</div>
              <div class="stat-change positive">{{Math.round((weeklyStats.breaksCompleted/weeklyStats.breaksTarget)*100)}}% completion rate</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Smart Tips Section -->
      <div class="tips-section">
        <div class="section-header">
          <h2>Rekomendasi Cerdas</h2>
          <ion-chip color="secondary" size="small">
            <ion-icon name="flash-outline"></ion-icon>
            <span>AI Tips</span>
          </ion-chip>
        </div>

        <div class="tips-container">
          <div class="tip-card featured" *ngFor="let tip of smartTips; let i = index" [class.active]="i === activeTipIndex">
            <div class="tip-icon">
              <ion-icon [name]="tip.icon"></ion-icon>
            </div>
            <div class="tip-content">
              <h3>{{tip.title}}</h3>
              <p>{{tip.description}}</p>
              <div class="tip-metadata">
                <span class="tip-priority" [class]="'priority-' + tip.priority">{{tip.priority}}</span>
                <span class="tip-timing">{{tip.timing}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Timeline -->
      <div class="timeline-section">
        <div class="section-header">
          <h2>Timeline Aktivitas</h2>
          <ion-button fill="clear" size="small" (click)="toggleTimelineView()">
            <ion-icon name="eye-outline"></ion-icon>
            <span>{{timelineExpanded ? 'Ringkas' : 'Detail'}}</span>
          </ion-button>
        </div>

        <div class="timeline-container" [class.expanded]="timelineExpanded">
          <div class="timeline-item" *ngFor="let activity of recentActivities; let i = index" 
               [class]="'timeline-' + activity.type" [@fadeInUp]="i">
            <div class="timeline-marker">
              <ion-icon [name]="activity.icon"></ion-icon>
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-title">{{activity.title}}</span>
                <span class="timeline-time">{{formatTime(activity.timestamp)}}</span>
              </div>
              <div class="timeline-description">{{activity.description}}</div>
              <div class="timeline-metadata" *ngIf="activity.metadata">
                <ion-chip size="small" [color]="activity.chipColor">
                  {{activity.metadata}}
                </ion-chip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Action Buttons -->
      <div class="fab-container">
        <ion-button class="fab-button primary" (click)="startQuickBreak()">
          <ion-icon name="pause-outline"></ion-icon>
        </ion-button>
        <ion-button class="fab-button secondary" (click)="runPostureCheck()">
          <ion-icon name="body-outline"></ion-icon>
        </ion-button>
      </div>

      <!-- Bottom Spacer -->
      <div class="content-spacer"></div>
    </ion-content>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);overflow-x:hidden}
    .futuristic-dashboard{--background:transparent!important}
    .hero-section{position:relative;padding:2rem 1rem;text-align:center;background:rgba(106,90,205,.1);border-radius:0 0 30px 30px;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);margin-bottom:2rem}
    .hero-background{position:absolute;inset:0;background:radial-gradient(circle at 20% 30%,rgba(120,119,198,.3) 0%,transparent 50%);animation:backgroundShift 10s ease-in-out infinite}
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
    .trend-down{color:#ff6b6b}
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
    .section-base{margin:0 1rem 2rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:1.5rem;backdrop-filter:blur(20px)}
    .section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
    .section-header h2{color:white;font-size:1.3rem;font-weight:600;margin:0}
    .card-base{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:15px;padding:1.5rem;transition:all .3s ease}
    .card-base:hover{background:rgba(255,255,255,.08)}
    .fab-container{position:fixed;bottom:120px;right:20px;display:flex;flex-direction:column;gap:1rem;z-index:1000}
    .fab-button{width:56px;height:56px;border-radius:50%;--box-shadow:0 8px 25px rgba(0,0,0,.3);transition:all .3s ease}
    .fab-button:hover{transform:scale(1.1)}
    .fab-button.primary{--background:linear-gradient(135deg,#6c63ff,#9c88ff)}
    .fab-button.secondary{--background:linear-gradient(135deg,#667eea,#764ba2)}
    .content-spacer{height:120px}
    @media (max-width:768px){.hero-title{font-size:2rem}.metrics-grid{grid-template-columns:1fr;gap:1rem;padding:0 .5rem}.fab-container{bottom:100px;right:15px}}
    @media (max-width:480px){.hero-section{padding:1.5rem .5rem}.section-base{margin:0 .5rem 1.5rem;padding:1rem}}
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Enhanced Data Properties
  postureScore: number = 85;
  lastPostureScore: number = 82;
  postureStatus: string = 'Baik';
  activeWarnings: number = 2;
  activeTime: string = '6h 30m';
  breaksToday: number = 5;
  goodPosturePercent: number = 78;
  breakTargetPercent: number = 62;
  activityPercent: number = 73;
  
  // Session State
  isActiveSession: boolean = true;
  timeProgressPercent: number = 81;
  lastWarningTime: Date = new Date();
  latestWarningMessage: string = 'Postur membungkuk terdeteksi selama 15 menit';
  
  // Current Warnings Array
  currentWarnings: string[] = [
    'Postur membungkuk',
    'Monitor terlalu dekat'
  ];

  // Weekly Statistics
  weeklyStats = {
    averageScore: 82,
    scoreImprovement: 5,
    totalWarnings: 15,
    warningReduction: 23,
    productiveTime: '45h 20m',
    timeIncrease: 3.5,
    breaksCompleted: 42,
    breaksTarget: 56
  };

  // Smart Tips with AI-like recommendations
  smartTips = [
    {
      title: 'Perbaikan Postur Urgent',
      description: 'Berdasarkan analisis 15 menit terakhir, Anda perlu menyesuaikan posisi punggung.',
      icon: 'body-outline',
      priority: 'high',
      timing: 'Segera'
    },
    {
      title: 'Waktu Istirahat Optimal',
      description: 'Skor produktivitas menunjukkan Anda perlu istirahat dalam 10 menit ke depan.',
      icon: 'time-outline',
      priority: 'medium',
      timing: '10 menit'
    },
    {
      title: 'Penyesuaian Layar',
      description: 'AI mendeteksi jarak mata ke layar tidak optimal. Sesuaikan posisi monitor.',
      icon: 'eye-outline',
      priority: 'medium',
      timing: 'Saat memungkinkan'
    }
  ];

  // Activity Timeline
  recentActivities = [
    {
      title: 'Peringatan Postur',
      description: 'Postur membungkuk terdeteksi - silakan perbaiki posisi duduk',
      type: 'warning',
      icon: 'warning-outline',
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      metadata: '15 menit',
      chipColor: 'warning'
    },
    {
      title: 'Sesi Postur Baik',
      description: 'Postur optimal dipertahankan dengan baik',
      type: 'success',
      icon: 'checkmark-circle-outline',
      timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      metadata: '30 menit',
      chipColor: 'success'
    },
    {
      title: 'Istirahat Selesai',
      description: 'Istirahat micro-break 5 menit berhasil diselesaikan',
      type: 'break',
      icon: 'refresh-outline',
      timestamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
      metadata: '5 menit',
      chipColor: 'tertiary'
    },
    {
      title: 'Peringatan Jarak Layar',
      description: 'Monitor terdeteksi terlalu dekat dengan mata',
      type: 'warning',
      icon: 'eye-outline',
      timestamp: new Date(Date.now() - 35 * 60000), // 35 minutes ago
      metadata: 'Resolved',
      chipColor: 'medium'
    },
    {
      title: 'Sesi Monitoring Dimulai',
      description: 'Sistem monitoring postur dimulai untuk hari ini',
      type: 'info',
      icon: 'play-outline',
      timestamp: new Date(Date.now() - 6 * 60 * 60000), // 6 hours ago
      metadata: 'Hari ini',
      chipColor: 'primary'
    }
  ];

  // UI State
  activeTipIndex: number = 0;
  timelineExpanded: boolean = false;

  // Data Update Control
  private dataInterval: any;
  private tipRotationInterval: any;
  updateFrequency: number = 3000;
  tipRotationFrequency: number = 5000;

  // Math utility for template
  Math = Math;

  constructor() {
    addIcons({
      'warning-outline': warningOutline,
      'alert-circle-outline': alertCircleOutline,
      'trending-up-outline': trendingUpOutline,
      'trending-down-outline': trendingDownOutline,
      'pulse-outline': pulseOutline,
      'time-outline': timeOutline,
      'eye-outline': eyeOutline,
      'body-outline': bodyOutline,
      'fitness-outline': fitnessOutline,
      'stats-chart-outline': statsChartOutline,
      'flash-outline': flashOutline,
      'refresh-outline': refreshOutline,
      'play-outline': playOutline,
      'pause-outline': pauseOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'ellipse-outline': ellipseOutline
    });
  }

  ngOnInit() {
    this.startDataSimulation();
    this.startTipRotation();
  }

  ngOnDestroy() {
    this.stopDataSimulation();
    this.stopTipRotation();
  }

  // Enhanced Methods
  onPostureCheck() {
    console.log('Starting enhanced posture check...');
    this.lastPostureScore = this.postureScore;
    setTimeout(() => {
      this.postureScore = Math.floor(Math.random() * 30) + 70;
      this.updatePostureStatus();
      this.addActivityLog('Posture Check', 'Manual posture analysis completed');
    }, 2000);
  }

  startQuickBreak() {
    console.log('Starting quick break...');
    this.addActivityLog('Quick Break Started', 'User initiated 5-minute break');
    // Simulate break completion
    setTimeout(() => {
      this.breaksToday++;
      this.addActivityLog('Quick Break Completed', 'Break successfully completed');
    }, 300000); // 5 minutes
  }

  runPostureCheck() {
    this.onPostureCheck();
  }

  refreshData() {
    console.log('Refreshing dashboard data...');
    this.updateData();
    this.addActivityLog('Data Refresh', 'Dashboard data manually refreshed');
  }

  toggleTimelineView() {
    this.timelineExpanded = !this.timelineExpanded;
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return date.toLocaleDateString('id-ID');
  }

  private startDataSimulation() {
    this.dataInterval = setInterval(() => {
      this.updateData();
    }, this.updateFrequency);
  }

  private stopDataSimulation() {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
      this.dataInterval = null;
    }
  }

  private startTipRotation() {
    this.tipRotationInterval = setInterval(() => {
      this.activeTipIndex = (this.activeTipIndex + 1) % this.smartTips.length;
    }, this.tipRotationFrequency);
  }

  private stopTipRotation() {
    if (this.tipRotationInterval) {
      clearInterval(this.tipRotationInterval);
      this.tipRotationInterval = null;
    }
  }

  private updateData() {
    // Store previous score for trend analysis
    this.lastPostureScore = this.postureScore;
    
    // Update posture score with realistic variation
    this.postureScore = Math.max(60, Math.min(95, 
      this.postureScore + Math.floor(Math.random() * 11 - 5)
    ));
    
    // Update warnings based on posture score
    const oldWarnings = this.activeWarnings;
    if (this.postureScore < 70) {
      this.activeWarnings = Math.min(5, this.activeWarnings + 1);
    } else if (this.postureScore > 85) {
      this.activeWarnings = Math.max(0, this.activeWarnings - 1);
    }

    // Add new warning to log if warnings increased
    if (this.activeWarnings > oldWarnings) {
      this.lastWarningTime = new Date();
      this.latestWarningMessage = this.getRandomWarningMessage();
      this.addActivityLog('New Warning', this.latestWarningMessage);
    }

    // Update time progress
    const timeMatch = this.activeTime.match(/(\d+)h (\d+)m/);
    if (timeMatch) {
      const hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const totalMinutes = hours * 60 + minutes;
      this.timeProgressPercent = Math.min(100, (totalMinutes / (8 * 60)) * 100);
      
      // Occasionally increment time
      if (Math.random() < 0.3) {
        const newTotalMinutes = Math.min(8 * 60, totalMinutes + Math.floor(Math.random() * 3 + 1));
        const newHours = Math.floor(newTotalMinutes / 60);
        const newMinutes = newTotalMinutes % 60;
        this.activeTime = `${newHours}h ${newMinutes}m`;
      }
    }

    // Update progress percentages
    this.goodPosturePercent = Math.max(30, Math.min(95, 
      this.goodPosturePercent + Math.floor(Math.random() * 7 - 3)
    ));
    this.breakTargetPercent = Math.max(20, Math.min(100, 
      this.breakTargetPercent + Math.floor(Math.random() * 5 - 2)
    ));
    this.activityPercent = Math.max(40, Math.min(100, 
      this.activityPercent + Math.floor(Math.random() * 9 - 4)
    ));

    // Update warnings array
    this.updateCurrentWarnings();
    
    // Update posture status
    this.updatePostureStatus();

    // Occasionally add automatic break
    if (Math.random() < 0.1 && this.breaksToday < 8) {
      this.breaksToday++;
      this.addActivityLog('Auto Break', 'Automatic break reminder triggered');
    }
  }

  private updatePostureStatus() {
    if (this.postureScore >= 85) {
      this.postureStatus = 'Sangat Baik';
    } else if (this.postureScore >= 70) {
      this.postureStatus = 'Baik';
    } else if (this.postureScore >= 50) {
      this.postureStatus = 'Perlu Perbaikan';
    } else {
      this.postureStatus = 'Buruk';
    }
  }

  private updateCurrentWarnings() {
    const possibleWarnings = [
      'Postur membungkuk',
      'Monitor terlalu dekat',
      'Posisi keyboard tidak ergonomis',
      'Kaki tidak menyentuh lantai',
      'Punggung tidak tersandar',
      'Bahu tidak rileks'
    ];

    this.currentWarnings = possibleWarnings
      .sort(() => Math.random() - 0.5)
      .slice(0, this.activeWarnings);
  }

  private getRandomWarningMessage(): string {
    const messages = [
      'Postur membungkuk terdeteksi selama 15 menit',
      'Monitor terlalu dekat dengan mata',
      'Posisi duduk tidak ergonomis',
      'Ketegangan bahu terdeteksi',
      'Posisi kaki perlu diperbaiki',
      'Sudut pandang layar tidak optimal'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private addActivityLog(title: string, description: string) {
    const newActivity = {
      title,
      description,
      type: title.toLowerCase().includes('warning') ? 'warning' : 
            title.toLowerCase().includes('break') ? 'break' : 'info',
      icon: this.getActivityIcon(title),
      timestamp: new Date(),
      metadata: 'Baru',
      chipColor: this.getActivityChipColor(title)
    };

    this.recentActivities.unshift(newActivity);
    if (this.recentActivities.length > 10) {
      this.recentActivities.pop();
    }
  }

  private getActivityIcon(title: string): string {
    if (title.toLowerCase().includes('warning')) return 'warning-outline';
    if (title.toLowerCase().includes('break')) return 'refresh-outline';
    if (title.toLowerCase().includes('postur')) return 'body-outline';
    if (title.toLowerCase().includes('check')) return 'checkmark-circle-outline';
    return 'ellipse-outline';
  }

  private getActivityChipColor(title: string): string {
    if (title.toLowerCase().includes('warning')) return 'warning';
    if (title.toLowerCase().includes('break')) return 'success';
    if (title.toLowerCase().includes('check')) return 'primary';
    return 'medium';
  }
}
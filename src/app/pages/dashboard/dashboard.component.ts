import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonProgressBar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  alertCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonProgressBar
  ],
  template: `
    <ion-content class="ion-padding ergofit-content" [fullscreen]="true">
      <!-- Grid untuk 4 Kartu Ringkasan -->
      <div class="ergofit-grid ergofit-grid-auto">
        <div class="ergofit-card" style="background: white !important; background-color: white !important;">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Skor Postur</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h1>{{postureScore}}/100</h1>
              <p>{{postureStatus}}</p>
            </div>
          </div>
        </div>

        <div class="ergofit-card" style="background: white !important; background-color: white !important;">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Peringatan Aktif</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-flex-center" style="gap: var(--ergofit-spacing-sm);">
              <div class="metric-icon">
                <ion-icon name="warning-outline" color="warning"></ion-icon>
              </div>
              <div class="ergofit-metric">
                <h2>{{activeWarnings}}</h2>
                <p>peringatan aktif</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ergofit-card" style="background: white !important; background-color: white !important;">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Waktu Aktif</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h2>{{activeTime}}</h2>
              <p>dari target 8 jam</p>
            </div>
          </div>
        </div>

        <div class="ergofit-card" style="background: white !important; background-color: white !important;">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Istirahat Hari Ini</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h2>{{breaksToday}}</h2>
              <p>dari target 8 istirahat</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner Peringatan -->
      <div class="ergofit-warning-banner">
        <ion-icon name="alert-circle-outline" color="warning"></ion-icon>
        <span><strong>Peringatan:</strong> Postur membungkuk terdeteksi selama 15 menit</span>
      </div>

      <!-- Progress Bars -->
      <div class="ergofit-card" style="background: white !important; background-color: white !important;">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Progress Hari Ini</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="ergofit-progress-section">
            <div class="ergofit-progress-item">
              <div class="ergofit-progress-label">
                <span>Postur Baik</span>
                <span class="ergofit-progress-value">{{goodPosturePercent}}%</span>
              </div>
              <ion-progress-bar [value]="goodPosturePercent / 100" class="success"></ion-progress-bar>
            </div>

            <div class="ergofit-progress-item">
              <div class="ergofit-progress-label">
                <span>Target Istirahat</span>
                <span class="ergofit-progress-value">{{breakTargetPercent}}%</span>
              </div>
              <ion-progress-bar [value]="breakTargetPercent / 100"></ion-progress-bar>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistik Mingguan -->
      <div class="ergofit-card" style="background: white !important; background-color: white !important;">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Statistik Mingguan</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="ergofit-grid ergofit-grid-2">
            <div class="stat-item">
              <h4>Rata-rata Skor</h4>
              <p class="stat-value">82/100</p>
            </div>
            <div class="stat-item">
              <h4>Total Peringatan</h4>
              <p class="stat-value">15</p>
            </div>
            <div class="stat-item">
              <h4>Waktu Produktif</h4>
              <p class="stat-value">45h 20m</p>
            </div>
            <div class="stat-item">
              <h4>Istirahat Diambil</h4>
              <p class="stat-value">42/56</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Hari Ini -->
      <div class="ergofit-card" style="background: white !important; background-color: white !important;">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Tips Ergonomi Hari Ini</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="tip-item">
            <h4>💺 Posisi Duduk</h4>
            <p>Pastikan kaki Anda menapak rata di lantai dan punggung tersandar dengan baik di kursi.</p>
          </div>
          <div class="tip-item">
            <h4>👀 Jarak Monitor</h4>
            <p>Monitor harus berjarak 50-70 cm dari mata Anda, dengan bagian atas monitor sejajar dengan mata.</p>
          </div>
          <div class="tip-item">
            <h4>⏰ Istirahat Reguler</h4>
            <p>Lakukan istirahat setiap 30-60 menit untuk berdiri dan meregangkan tubuh.</p>
          </div>
        </div>
      </div>

      <!-- Aktivitas Terbaru -->
      <div class="ergofit-card" style="background: white !important; background-color: white !important;">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Aktivitas Terbaru</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-time">10:30</div>
              <div class="activity-content">
                <span class="activity-type warning">Peringatan</span>
                <p>Postur membungkuk terdeteksi</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-time">10:15</div>
              <div class="activity-content">
                <span class="activity-type success">Istirahat</span>
                <p>Istirahat 5 menit selesai</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-time">09:45</div>
              <div class="activity-content">
                <span class="activity-type info">Postur</span>
                <p>Postur baik selama 30 menit</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-time">09:30</div>
              <div class="activity-content">
                <span class="activity-type warning">Peringatan</span>
                <p>Monitor terlalu dekat dengan mata</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-time">09:00</div>
              <div class="activity-content">
                <span class="activity-type success">Mulai</span>
                <p>Sesi monitoring dimulai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spacer untuk memastikan konten tidak tertutup navbar -->
      <div class="content-spacer"></div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--ergofit-background-subtle) !important;
    }

    ion-content {
      --background: var(--ergofit-background-subtle) !important;
      background: var(--ergofit-background-subtle) !important;
    }

    ion-content::part(background) {
      background: var(--ergofit-background-subtle) !important;
    }

    ion-content::part(scroll) {
      background: var(--ergofit-background-subtle) !important;
    }

    /* Force card backgrounds to be white */
    .ergofit-card,
    div.ergofit-card,
    ion-content .ergofit-card {
      background: white !important;
      background-color: white !important;
    }

    .ergofit-warning-banner {
      background: rgba(255, 193, 7, 0.1) !important;
      border: 1px solid rgba(255, 193, 7, 0.2);
      color: #333 !important;
    }

    .metric-icon {
      background: linear-gradient(135deg, rgba(255, 193, 7, 0.3), rgba(255, 152, 0, 0.3));
      border-radius: 50%;
      padding: var(--ergofit-spacing-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }

    ion-progress-bar {
      --progress-background: linear-gradient(90deg, var(--ergofit-primary), var(--ergofit-accent));
      --background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      height: 8px;
    }

    ion-progress-bar.success {
      --progress-background: linear-gradient(90deg, var(--ergofit-success), #8bc34a);
    }

    .ergofit-card-title,
    .ergofit-card h3 {
      color: var(--ergofit-primary) !important;
    }

    .ergofit-metric h1,
    .ergofit-metric h2 {
      color: var(--ergofit-primary) !important;
    }

    .ergofit-metric p {
      color: #666 !important;
    }

    .ergofit-progress-label span {
      color: #333 !important;
    }

    .ergofit-progress-value {
      color: var(--ergofit-primary) !important;
    }

    .content-spacer {
      height: 100px; /* Extra space untuk memastikan konten tidak tertutup navbar */
    }

    .stat-item {
      text-align: center;
      padding: var(--ergofit-spacing-md);
      background: var(--ergofit-card-background-alt);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
      margin-bottom: var(--ergofit-spacing-sm);
    }

    .stat-item h4 {
      color: #666 !important;
      font-size: 0.9rem;
      margin-bottom: var(--ergofit-spacing-xs);
    }

    .stat-value {
      color: var(--ergofit-primary) !important;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .tip-item {
      margin-bottom: var(--ergofit-spacing-lg);
      padding: var(--ergofit-spacing-md);
      background: var(--ergofit-card-background-alt);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
      border-left: 4px solid var(--ergofit-primary);
    }

    .tip-item h4 {
      color: var(--ergofit-primary) !important;
      margin-bottom: var(--ergofit-spacing-sm);
    }

    .tip-item p {
      color: #666 !important;
      margin: 0;
      line-height: 1.5;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-md);
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: var(--ergofit-spacing-md);
      padding: var(--ergofit-spacing-md);
      background: var(--ergofit-card-background-alt);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
    }

    .activity-time {
      color: #666 !important;
      font-size: 0.9rem;
      font-weight: 500;
      min-width: 50px;
    }

    .activity-content {
      flex: 1;
    }

    .activity-type {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: var(--ergofit-spacing-xs);
      display: inline-block;
    }

    .activity-type.warning {
      background: rgba(255, 193, 7, 0.2);
      color: #f57c00 !important;
    }

    .activity-type.success {
      background: rgba(76, 175, 80, 0.2);
      color: #388e3c !important;
    }

    .activity-type.info {
      background: rgba(33, 150, 243, 0.2);
      color: #1976d2 !important;
    }

    .activity-content p {
      color: #666 !important;
      margin: 0;
      font-size: 0.9rem;
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Data Properties
  postureScore: number = 85;
  postureStatus: string = 'Baik';
  activeWarnings: number = 2;
  activeTime: string = '6h 30m';
  breaksToday: number = 5;
  goodPosturePercent: number = 78;
  breakTargetPercent: number = 62;

  // Data Update Control
  private dataInterval: any;
  updateFrequency: number = 2500;

  constructor() {
    addIcons({
      'warning-outline': warningOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit() {
    this.startDataSimulation();
  }

  ngOnDestroy() {
    this.stopDataSimulation();
  }

  onPostureCheck() {
    console.log('Starting posture check...');
    setTimeout(() => {
      this.postureScore = Math.floor(Math.random() * 30) + 70;
      this.updatePostureStatus();
    }, 2000);
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

  private updateData() {
    this.postureScore = Math.floor(Math.random() * (95 - 65 + 1) + 65);
    this.activeWarnings = Math.floor(Math.random() * 6);

    const currentMinutes = parseInt(this.activeTime.split('h ')[1].split('m')[0]);
    const newMinutes = Math.max(0, currentMinutes + Math.floor(Math.random() * 3 - 1));
    const hours = Math.floor(newMinutes / 60) + parseInt(this.activeTime.split('h')[0]);
    this.activeTime = `${Math.min(hours, 8)}h ${newMinutes % 60}m`;

    this.breaksToday = Math.max(0, this.breaksToday + Math.floor(Math.random() * 3 - 1));
    this.goodPosturePercent = Math.max(30, Math.min(95, this.goodPosturePercent + Math.floor(Math.random() * 11 - 5)));
    this.breakTargetPercent = Math.max(20, Math.min(100, this.breakTargetPercent + Math.floor(Math.random() * 7 - 3)));

    this.updatePostureStatus();
  }

  private updatePostureStatus() {
    if (this.postureScore >= 85) {
      this.postureStatus = 'Sangat Baik';
    } else if (this.postureScore >= 70) {
      this.postureStatus = 'Baik';
    } else {
      this.postureStatus = 'Perlu Perbaikan';
    }
  }
}
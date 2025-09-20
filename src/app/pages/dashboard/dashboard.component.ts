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
    <ion-content class="ion-padding ergofit-content">
      <!-- Grid untuk 4 Kartu Ringkasan -->
      <div class="ergofit-grid ergofit-grid-auto">
        <div class="ergofit-card">
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

        <div class="ergofit-card">
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

        <div class="ergofit-card">
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

        <div class="ergofit-card">
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
      <div class="ergofit-card">
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
    </ion-content>
  `,
  styles: [`
    .metric-icon {
      background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2));
      border-radius: 50%;
      padding: var(--ergofit-spacing-sm);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ion-progress-bar {
      --progress-background: linear-gradient(90deg, var(--ergofit-primary), var(--ergofit-accent));
      --background: rgba(103, 58, 183, 0.1);
      border-radius: 8px;
      height: 8px;
    }

    ion-progress-bar.success {
      --progress-background: linear-gradient(90deg, var(--ergofit-success), #8bc34a);
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
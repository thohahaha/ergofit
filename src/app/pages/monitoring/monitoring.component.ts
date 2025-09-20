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
  IonChip,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  alertCircleOutline,
  warningOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-monitoring',
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
    IonChip,
    IonIcon,
    IonLabel
  ],
  template: `
    <ion-content class="ergofit-content">
      <!-- SVG Figure Manusia -->
      <div class="body-figure-container">
        <svg width="200" height="300" viewBox="0 0 200 300" class="body-figure">
          <!-- Head -->
          <circle cx="100" cy="40" r="25" [attr.fill]="getBodyPartColor('head')" stroke="#333" stroke-width="2"/>

          <!-- Neck -->
          <rect x="95" y="65" width="10" height="20" [attr.fill]="getBodyPartColor('neck')" stroke="#333" stroke-width="2"/>

          <!-- Shoulders -->
          <rect x="70" y="85" width="60" height="15" [attr.fill]="getBodyPartColor('shoulders')" stroke="#333" stroke-width="2" rx="7"/>

          <!-- Back/Spine -->
          <rect x="95" y="100" width="10" height="80" [attr.fill]="getBodyPartColor('back')" stroke="#333" stroke-width="2"/>

          <!-- Hips -->
          <rect x="85" y="180" width="30" height="20" [attr.fill]="getBodyPartColor('hips')" stroke="#333" stroke-width="2" rx="10"/>

          <!-- Arms -->
          <rect x="50" y="90" width="15" height="60" [attr.fill]="getBodyPartColor('arms')" stroke="#333" stroke-width="2" rx="7"/>
          <rect x="135" y="90" width="15" height="60" [attr.fill]="getBodyPartColor('arms')" stroke="#333" stroke-width="2" rx="7"/>

          <!-- Legs -->
          <rect x="90" y="200" width="8" height="80" [attr.fill]="getBodyPartColor('legs')" stroke="#333" stroke-width="2"/>
          <rect x="102" y="200" width="8" height="80" [attr.fill]="getBodyPartColor('legs')" stroke="#333" stroke-width="2"/>
        </svg>
      </div>

      <!-- Status Chip -->
      <div class="status-chip-container">
        <ion-chip [color]="postureChipColor" class="status-chip">
          <ion-icon [name]="postureIcon"></ion-icon>
          <ion-label>{{postureStatus}}</ion-label>
        </ion-chip>
      </div>

      <!-- Grid 4 Kartu Metrik -->
      <div class="ergofit-grid ergofit-grid-4">
        <div class="ergofit-card">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Leher</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h2 [style.color]="getMetricColor(neckScore)">{{neckScore}}/10</h2>
              <p>{{getNeckStatus()}}</p>
            </div>
          </div>
        </div>

        <div class="ergofit-card">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Punggung</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h2 [style.color]="getMetricColor(backScore)">{{backScore}}/10</h2>
              <p>{{getBackStatus()}}</p>
            </div>
          </div>
        </div>

        <div class="ergofit-card">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Bahu</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h2 [style.color]="getMetricColor(shoulderScore)">{{shoulderScore}}/10</h2>
              <p>{{getShoulderStatus()}}</p>
            </div>
          </div>
        </div>

        <div class="ergofit-card">
          <div class="ergofit-card-header">
            <h3 class="ergofit-card-title">Pinggul</h3>
          </div>
          <div class="ergofit-card-content">
            <div class="ergofit-metric">
              <h2 [style.color]="getMetricColor(hipScore)">{{hipScore}}/10</h2>
              <p>{{getHipStatus()}}</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .body-figure-container {
      text-align: center;
      margin: var(--ergofit-spacing-lg) 0;
      padding: var(--ergofit-spacing-lg);
      background: rgba(255, 255, 255, 0.1);
      border-radius: var(--ergofit-card-radius-lg);
      backdrop-filter: blur(10px);
    }

    .body-figure {
      filter: drop-shadow(0 4px 12px rgba(103, 58, 183, 0.3));
      transition: all 0.3s ease;
    }

    .body-figure:hover {
      transform: scale(1.02);
    }

    .status-chip-container {
      text-align: center;
      margin: var(--ergofit-spacing-lg) 0;
    }

    .status-chip {
      padding: var(--ergofit-spacing-sm) var(--ergofit-spacing-lg);
      font-size: var(--ergofit-font-size-md);
      font-weight: 600;
      --background: var(--ergofit-primary);
      --color: white;
      border-radius: var(--ergofit-card-radius-lg);
      box-shadow: 0 2px 8px rgba(108, 99, 255, 0.3);
    }

    @media (max-width: 480px) {
      .body-figure-container {
        margin: var(--ergofit-spacing-md) 0;
        padding: var(--ergofit-spacing-md);
      }

      .status-chip-container {
        margin: var(--ergofit-spacing-md) 0;
      }

      svg {
        width: 160px;
        height: 240px;
      }
    }
  `]
})
export class MonitoringComponent implements OnInit, OnDestroy {
  // Monitoring Data Properties
  neckScore: number = 7;
  backScore: number = 6;
  shoulderScore: number = 8;
  hipScore: number = 7;
  postureChipColor: string = 'success';
  postureIcon: string = 'checkmark-circle-outline';
  postureStatus: string = 'Baik';

  // Data Update Control
  private dataInterval: any;
  updateFrequency: number = 3000;

  constructor() {
    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'alert-circle-outline': alertCircleOutline,
      'warning-outline': warningOutline
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
      this.updateAllScores();
      this.updatePostureStatus();
    }, 2000);
  }

  // SVG Body Part Color Methods
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

    if (score >= 8) return '#10dc60'; // Green - Good
    if (score >= 6) return '#ffce00'; // Yellow - Fair
    return '#f04141'; // Red - Poor
  }

  // Metric Color Methods
  getMetricColor(score: number): string {
    if (score >= 8) return '#10dc60';
    if (score >= 6) return '#ffce00';
    return '#f04141';
  }

  getNeckStatus(): string {
    if (this.neckScore >= 8) return 'Sangat Baik';
    if (this.neckScore >= 6) return 'Baik';
    return 'Perlu Perbaikan';
  }

  getBackStatus(): string {
    if (this.backScore >= 8) return 'Sangat Baik';
    if (this.backScore >= 6) return 'Baik';
    return 'Perlu Perbaikan';
  }

  getShoulderStatus(): string {
    if (this.shoulderScore >= 8) return 'Sangat Baik';
    if (this.shoulderScore >= 6) return 'Baik';
    return 'Perlu Perbaikan';
  }

  getHipStatus(): string {
    if (this.hipScore >= 8) return 'Sangat Baik';
    if (this.hipScore >= 6) return 'Baik';
    return 'Perlu Perbaikan';
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
    // Update Body Part Scores with gradual changes
    this.neckScore = Math.max(1, Math.min(10, this.neckScore + Math.floor(Math.random() * 3 - 1)));
    this.backScore = Math.max(1, Math.min(10, this.backScore + Math.floor(Math.random() * 3 - 1)));
    this.shoulderScore = Math.max(1, Math.min(10, this.shoulderScore + Math.floor(Math.random() * 3 - 1)));
    this.hipScore = Math.max(1, Math.min(10, this.hipScore + Math.floor(Math.random() * 3 - 1)));

    this.updatePostureStatus();
  }

  private updateAllScores() {
    this.neckScore = Math.floor(Math.random() * 10) + 1;
    this.backScore = Math.floor(Math.random() * 10) + 1;
    this.shoulderScore = Math.floor(Math.random() * 10) + 1;
    this.hipScore = Math.floor(Math.random() * 10) + 1;
  }

  private updatePostureStatus() {
    const averageScore = (this.neckScore + this.backScore + this.shoulderScore + this.hipScore) / 4;

    if (averageScore >= 8) {
      this.postureStatus = 'Sangat Baik';
      this.postureChipColor = 'success';
      this.postureIcon = 'checkmark-circle-outline';
    } else if (averageScore >= 6) {
      this.postureStatus = 'Baik';
      this.postureChipColor = 'warning';
      this.postureIcon = 'alert-circle-outline';
    } else {
      this.postureStatus = 'Perlu Perbaikan';
      this.postureChipColor = 'danger';
      this.postureIcon = 'warning-outline';
    }
  }
}
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
    <ion-content class="ergofit-content" [fullscreen]="true" [scrollEvents]="true">
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

      <!-- Detail Monitoring per Bagian Tubuh -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Detail Monitoring</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="monitoring-details">
            <div class="detail-item">
              <div class="detail-header">
                <h4>🦴 Posisi Leher</h4>
                <span class="detail-score" [style.color]="getMetricColor(neckScore)">{{neckScore}}/10</span>
              </div>
              <p class="detail-description">
                Leher Anda saat ini dalam posisi {{getNeckStatus().toLowerCase()}}. 
                {{neckScore >= 8 ? 'Pertahankan posisi ini!' : neckScore >= 6 ? 'Sedikit tegakkan kepala.' : 'Segera perbaiki postur leher Anda.'}}
              </p>
            </div>

            <div class="detail-item">
              <div class="detail-header">
                <h4>🫸 Posisi Punggung</h4>
                <span class="detail-score" [style.color]="getMetricColor(backScore)">{{backScore}}/10</span>
              </div>
              <p class="detail-description">
                Punggung Anda menunjukkan kondisi {{getBackStatus().toLowerCase()}}.
                {{backScore >= 8 ? 'Postur punggung sangat baik!' : backScore >= 6 ? 'Pastikan punggung tersandar di kursi.' : 'Hindari membungkuk terlalu lama.'}}
              </p>
            </div>

            <div class="detail-item">
              <div class="detail-header">
                <h4>💪 Posisi Bahu</h4>
                <span class="detail-score" [style.color]="getMetricColor(shoulderScore)">{{shoulderScore}}/10</span>
              </div>
              <p class="detail-description">
                Bahu Anda dalam kondisi {{getShoulderStatus().toLowerCase()}}.
                {{shoulderScore >= 8 ? 'Bahu rileks dan sejajar!' : shoulderScore >= 6 ? 'Rilekskan bahu sedikit.' : 'Bahu terlalu tegang, perlu relaksasi.'}}
              </p>
            </div>

            <div class="detail-item">
              <div class="detail-header">
                <h4>🪑 Posisi Pinggul</h4>
                <span class="detail-score" [style.color]="getMetricColor(hipScore)">{{hipScore}}/10</span>
              </div>
              <p class="detail-description">
                Pinggul Anda menunjukkan kondisi {{getHipStatus().toLowerCase()}}.
                {{hipScore >= 8 ? 'Posisi duduk sempurna!' : hipScore >= 6 ? 'Duduk lebih tegak.' : 'Perbaiki posisi duduk Anda.'}}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rekomendasi Real-time -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Rekomendasi Saat Ini</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="recommendations-list">
            <div class="recommendation-item priority" *ngIf="getAverageScore() < 6">
              <div class="recommendation-icon">🚨</div>
              <div class="recommendation-content">
                <h4>Prioritas Tinggi</h4>
                <p>Postur Anda memerlukan perbaikan segera. Luangkan waktu untuk memperbaiki posisi duduk.</p>
              </div>
            </div>

            <div class="recommendation-item" *ngIf="neckScore < 7">
              <div class="recommendation-icon">🦴</div>
              <div class="recommendation-content">
                <h4>Perbaiki Postur Leher</h4>
                <p>Tegakkan kepala dan pastikan monitor sejajar dengan mata untuk mengurangi tekanan pada leher.</p>
              </div>
            </div>

            <div class="recommendation-item" *ngIf="backScore < 7">
              <div class="recommendation-icon">🫸</div>
              <div class="recommendation-content">
                <h4>Dukungan Punggung</h4>
                <p>Sandarkan punggung dengan baik ke kursi dan hindari membungkuk terlalu lama.</p>
              </div>
            </div>

            <div class="recommendation-item" *ngIf="shoulderScore < 7">
              <div class="recommendation-icon">💪</div>
              <div class="recommendation-content">
                <h4>Relaksasi Bahu</h4>
                <p>Rilekskan bahu dan hindari mengangkat bahu terlalu tinggi saat mengetik.</p>
              </div>
            </div>

            <div class="recommendation-item success" *ngIf="getAverageScore() >= 8">
              <div class="recommendation-icon">✅</div>
              <div class="recommendation-content">
                <h4>Postur Sangat Baik!</h4>
                <p>Pertahankan postur yang baik ini. Anda sedang berada dalam kondisi ergonomi yang optimal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Riwayat Monitoring -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Riwayat 1 Jam Terakhir</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="history-timeline">
            <div class="timeline-item">
              <div class="timeline-time">14:45</div>
              <div class="timeline-content">
                <div class="timeline-scores">
                  <span class="score-badge good">L:8</span>
                  <span class="score-badge fair">P:6</span>
                  <span class="score-badge good">B:9</span>
                  <span class="score-badge fair">H:7</span>
                </div>
                <p>Postur membaik setelah istirahat</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-time">14:30</div>
              <div class="timeline-content">
                <div class="timeline-scores">
                  <span class="score-badge poor">L:4</span>
                  <span class="score-badge poor">P:5</span>
                  <span class="score-badge fair">B:6</span>
                  <span class="score-badge fair">H:6</span>
                </div>
                <p>Peringatan: Postur buruk terdeteksi</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-time">14:15</div>
              <div class="timeline-content">
                <div class="timeline-scores">
                  <span class="score-badge good">L:8</span>
                  <span class="score-badge good">P:8</span>
                  <span class="score-badge good">B:9</span>
                  <span class="score-badge good">H:8</span>
                </div>
                <p>Postur sangat baik - kondisi optimal</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-time">14:00</div>
              <div class="timeline-content">
                <div class="timeline-scores">
                  <span class="score-badge fair">L:7</span>
                  <span class="score-badge fair">P:7</span>
                  <span class="score-badge good">B:8</span>
                  <span class="score-badge good">H:8</span>
                </div>
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

    .body-figure-container {
      text-align: center;
      margin: var(--ergofit-spacing-lg) 0;
      padding: var(--ergofit-spacing-lg);
      background: rgba(108, 99, 255, 0.05);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-lg);
    }

    .body-figure {
      filter: drop-shadow(0 4px 12px rgba(108, 99, 255, 0.15));
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
      box-shadow: 0 4px 16px rgba(108, 99, 255, 0.2);
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

    .content-spacer {
      height: 100px; /* Extra space untuk memastikan konten tidak tertutup navbar */
    }

    .monitoring-details {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-lg);
    }

    .detail-item {
      padding: var(--ergofit-spacing-md);
      background: var(--ergofit-card-background-alt);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
      border-left: 4px solid var(--ergofit-primary);
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--ergofit-spacing-sm);
    }

    .detail-header h4 {
      color: var(--ergofit-primary) !important;
      margin: 0;
      font-size: 1rem;
    }

    .detail-score {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .detail-description {
      color: #666 !important;
      margin: 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .recommendations-list {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-md);
    }

    .recommendation-item {
      display: flex;
      align-items: flex-start;
      gap: var(--ergofit-spacing-md);
      padding: var(--ergofit-spacing-md);
      background: var(--ergofit-card-background-alt);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
      border-left: 4px solid var(--ergofit-primary);
    }

    .recommendation-item.priority {
      border-left-color: #f04141;
      background: rgba(240, 65, 65, 0.05);
      border-color: rgba(240, 65, 65, 0.1);
    }

    .recommendation-item.success {
      border-left-color: #10dc60;
      background: rgba(16, 220, 96, 0.05);
      border-color: rgba(16, 220, 96, 0.1);
    }

    .recommendation-icon {
      font-size: 1.5rem;
      min-width: 40px;
      text-align: center;
    }

    .recommendation-content h4 {
      color: var(--ergofit-primary) !important;
      margin: 0 0 var(--ergofit-spacing-xs) 0;
      font-size: 1rem;
    }

    .recommendation-content p {
      color: #666 !important;
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .history-timeline {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-md);
    }

    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: var(--ergofit-spacing-md);
      padding: var(--ergofit-spacing-md);
      background: var(--ergofit-card-background-alt);
      border: 1px solid rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
    }

    .timeline-time {
      color: #666 !important;
      font-size: 0.9rem;
      font-weight: 500;
      min-width: 50px;
    }

    .timeline-content {
      flex: 1;
    }

    .timeline-scores {
      display: flex;
      gap: var(--ergofit-spacing-xs);
      margin-bottom: var(--ergofit-spacing-xs);
      flex-wrap: wrap;
    }

    .score-badge {
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 500;
      color: white !important;
    }

    .score-badge.good {
      background: #10dc60;
    }

    .score-badge.fair {
      background: #ffce00;
    }

    .score-badge.poor {
      background: #f04141;
    }

    .timeline-content p {
      color: #666 !important;
      margin: 0;
      font-size: 0.9rem;
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

  getAverageScore(): number {
    return (this.neckScore + this.backScore + this.shoulderScore + this.hipScore) / 4;
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
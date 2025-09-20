import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trendingUpOutline,
  bodyOutline,
  statsChartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonBadge
  ],
  template: `
    <ion-content class="ergofit-content">
      <!-- Chart Canvas -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Tren Postur Mingguan</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="chart-container">
            <canvas #barChart width="400" height="200"></canvas>
          </div>
        </div>
      </div>

      <!-- Area yang Perlu Diperbaiki -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Area yang Perlu Diperbaiki</h3>
        </div>
        <div class="ergofit-card-content">
          <ion-list>
            <ion-item>
              <ion-icon name="trending-up-outline" slot="start" color="danger"></ion-icon>
              <ion-label>
                <h3>Postur Leher</h3>
                <p>Cenderung menunduk terlalu lama (↑35%)</p>
              </ion-label>
              <ion-badge color="danger" slot="end">Prioritas</ion-badge>
            </ion-item>
            <ion-item>
              <ion-icon name="body-outline" slot="start" color="warning"></ion-icon>
              <ion-label>
                <h3>Postur Punggung</h3>
                <p>Sering membungkuk (↑15%)</p>
              </ion-label>
              <ion-badge color="warning" slot="end">Sedang</ion-badge>
            </ion-item>
            <ion-item>
              <ion-icon name="stats-chart-outline" slot="start" color="medium"></ion-icon>
              <ion-label>
                <h3>Istirahat</h3>
                <p>Frekuensi istirahat menurun (↓10%)</p>
              </ion-label>
              <ion-badge color="medium" slot="end">Rendah</ion-badge>
            </ion-item>
          </ion-list>
        </div>
      </div>

      <!-- Weekly Summary Stats -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Ringkasan Mingguan</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="ergofit-grid ergofit-grid-4">
            <div class="stat-item">
              <h3>{{weeklyAverage}}</h3>
              <p>Rata-rata Skor</p>
            </div>
            <div class="stat-item">
              <h3>{{bestDay}}</h3>
              <p>Hari Terbaik</p>
            </div>
            <div class="stat-item">
              <h3>{{improvementPercent}}%</h3>
              <p>Peningkatan</p>
            </div>
            <div class="stat-item">
              <h3>{{totalHours}}h</h3>
              <p>Total Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .chart-container {
      padding: var(--ergofit-spacing-md) 0;
      text-align: center;
    }

    canvas {
      max-width: 100%;
      height: auto;
      border-radius: var(--ergofit-spacing-sm);
    }

    ion-list {
      background: transparent;
    }

    ion-item {
      --background: var(--ergofit-card-background-alt);
      --border-color: rgba(103, 58, 183, 0.1);
      border-radius: var(--ergofit-spacing-sm);
      margin: var(--ergofit-spacing-sm) 0;
      backdrop-filter: blur(10px);
    }

    ion-badge {
      --background: var(--ergofit-primary);
      --color: white;
      border-radius: var(--ergofit-card-radius-sm);
      font-weight: 500;
    }

    .stat-item {
      text-align: center;
      padding: var(--ergofit-spacing-md);
      background: rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(108, 99, 255, 0.2);
    }

    .stat-item h3 {
      font-size: var(--ergofit-font-size-xl);
      font-weight: 700;
      margin: 0 0 var(--ergofit-spacing-xs) 0;
      color: var(--ergofit-primary);
    }

    .stat-item p {
      font-size: var(--ergofit-font-size-sm);
      margin: 0;
      opacity: 0.8;
    }

    @media (max-width: 480px) {
      .stat-item h3 {
        font-size: var(--ergofit-font-size-lg);
      }

      .stat-item {
        padding: var(--ergofit-spacing-sm);
      }
    }
  `]
})
export class AnalyticsComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;

  // Analytics Data
  weeklyAverage: number = 78;
  bestDay: string = 'Minggu';
  improvementPercent: number = 12;
  totalHours: number = 56;

  // Chart Data
  dailyPostureData: number[] = [65, 72, 80, 75, 85, 78, 90];
  weeklyLabels: string[] = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  // Chart instance
  chart: any;
  private chartUpdateInterval: any;

  constructor() {
    addIcons({
      'trending-up-outline': trendingUpOutline,
      'body-outline': bodyOutline,
      'stats-chart-outline': statsChartOutline
    });
  }

  ngOnInit() {
    this.startAnalyticsSimulation();
  }

  ngAfterViewInit() {
    // Initialize chart
    setTimeout(() => this.initChart(), 100);
  }

  ngOnDestroy() {
    this.stopAnalyticsSimulation();
    if (this.chart) {
      this.chart.destroy();
    }
  }


  initChart() {
    if (this.barChart && this.barChart.nativeElement) {
      const ctx = this.barChart.nativeElement.getContext('2d');

      if (ctx) {
        // Check if Chart.js is available
        if (typeof (window as any).Chart !== 'undefined') {
          try {
            this.chart = new (window as any).Chart(ctx, {
              type: 'bar',
              data: {
                labels: this.weeklyLabels,
                datasets: [{
                  label: 'Skor Postur Harian',
                  data: [...this.dailyPostureData],
                  backgroundColor: [
                    'rgba(108, 99, 255, 0.8)',
                    'rgba(156, 136, 255, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(108, 99, 255, 0.8)',
                    'rgba(156, 136, 255, 0.8)',
                    'rgba(118, 75, 162, 0.8)'
                  ],
                  borderColor: [
                    'rgb(108, 99, 255)',
                    'rgb(156, 136, 255)',
                    'rgb(118, 75, 162)',
                    'rgb(102, 126, 234)',
                    'rgb(108, 99, 255)',
                    'rgb(156, 136, 255)',
                    'rgb(118, 75, 162)'
                  ],
                  borderWidth: 2,
                  borderRadius: 8
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      color: 'rgba(108, 99, 255, 0.1)'
                    },
                    ticks: {
                      color: '#666'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#666'
                    }
                  }
                }
              }
            });
          } catch (error) {
            console.warn('Chart.js initialization failed:', error);
            this.drawFallbackChart(ctx);
          }
        } else {
          console.warn('Chart.js not available, drawing fallback chart');
          this.drawFallbackChart(ctx);
        }
      }
    }
  }

  private drawFallbackChart(ctx: CanvasRenderingContext2D) {
    // Draw a simple fallback chart using Canvas API
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set colors
    const primaryColor = '#6C63FF';
    const accentColor = '#9c88ff';

    // Draw bars
    const barWidth = width / (this.dailyPostureData.length + 1);
    const maxValue = Math.max(...this.dailyPostureData);

    this.dailyPostureData.forEach((value, index) => {
      const barHeight = (value / 100) * (height - 40);
      const x = (index + 0.5) * barWidth;
      const y = height - barHeight - 20;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, accentColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(x - barWidth * 0.3, y, barWidth * 0.6, barHeight);

      // Draw day labels
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(this.weeklyLabels[index], x, height - 5);

      // Draw values
      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 10px Arial';
      ctx.fillText(value.toString(), x, y - 5);
    });

    // Draw title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Skor Postur Mingguan', width / 2, 20);
  }

  private startAnalyticsSimulation() {
    // Update chart data every 10 seconds
    this.chartUpdateInterval = setInterval(() => {
      this.updateChartData();
      this.updateAnalyticsStats();
    }, 10000);
  }

  private stopAnalyticsSimulation() {
    if (this.chartUpdateInterval) {
      clearInterval(this.chartUpdateInterval);
      this.chartUpdateInterval = null;
    }
  }

  private updateChartData() {
    // Shift array left and add new data point
    this.dailyPostureData.shift();
    const newScore = Math.floor(Math.random() * 35) + 65; // 65-100
    this.dailyPostureData.push(newScore);

    if (this.chart) {
      // Update Chart.js chart
      this.chart.data.datasets[0].data = [...this.dailyPostureData];
      this.chart.update('none');
    } else if (this.barChart && this.barChart.nativeElement) {
      // Update fallback chart
      const ctx = this.barChart.nativeElement.getContext('2d');
      if (ctx) {
        this.drawFallbackChart(ctx);
      }
    }
  }

  private updateAnalyticsStats() {
    // Update weekly average
    this.weeklyAverage = Math.floor(this.dailyPostureData.reduce((a, b) => a + b, 0) / this.dailyPostureData.length);

    // Find best day
    const maxScore = Math.max(...this.dailyPostureData);
    const maxIndex = this.dailyPostureData.indexOf(maxScore);
    this.bestDay = this.weeklyLabels[maxIndex];

    // Update improvement percentage
    this.improvementPercent = Math.max(0, Math.min(25, this.improvementPercent + Math.floor(Math.random() * 5 - 2)));

    // Update total hours
    this.totalHours = Math.min(168, this.totalHours + Math.floor(Math.random() * 3));
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonCheckbox,
  IonProgressBar,
  IonChip
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  playCircleOutline,
  checkmarkCircleOutline,
  starOutline,
  star,
  timeOutline,
  bodyOutline,
  eyeOutline,
  desktopOutline,
  trendingUpOutline,
  heartOutline,
  flashOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonCheckbox,
    IonProgressBar,
    IonChip
  ],
  template: `
    <ion-content class="content" [fullscreen]="true">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="title-section">
            <div class="title-icon">
              <ion-icon name="heart-outline"></ion-icon>
            </div>
            <div class="title-info">
              <h1>Rekomendasi Ergonomis</h1>
              <p>Panduan dan saran untuk meningkatkan postur dan kesehatan Anda</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Category Filter -->
      <div class="filter-section">
        <ion-segment [(ngModel)]="selectedCategory" class="category-segment">
          <ion-segment-button value="all">
            <ion-label>Semua</ion-label>
          </ion-segment-button>
          <ion-segment-button value="exercises">
            <ion-label>Latihan</ion-label>
          </ion-segment-button>
          <ion-segment-button value="workstation">
            <ion-label>Workstation</ion-label>
          </ion-segment-button>
          <ion-segment-button value="routine">
            <ion-label>Rutinitas</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <!-- Progress Overview -->
      <div class="progress-overview" *ngIf="selectedCategory === 'all'">
        <ion-card class="progress-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="trending-up-outline"></ion-icon>
              Progress Harian
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="progress-stats">
              <div class="stat-item">
                <div class="stat-value">{{ completedExercises }}/{{ totalExercises }}</div>
                <div class="stat-label">Latihan Selesai</div>
                <ion-progress-bar [value]="completedExercises / totalExercises" class="stat-progress"></ion-progress-bar>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ currentStreak }}</div>
                <div class="stat-label">Hari Berturut-turut</div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Exercise Recommendations -->
      <div class="recommendations-section" *ngIf="selectedCategory === 'all' || selectedCategory === 'exercises'">
        <div class="section-header">
          <h2>
            <ion-icon name="body-outline"></ion-icon>
            Latihan Ergonomis
          </h2>
          <ion-chip color="primary">{{ getExerciseProgress() }}% Selesai</ion-chip>
        </div>

        <div class="exercise-grid">
          <ion-card class="exercise-card" *ngFor="let exercise of exercises; let i = index"
                   [class.completed]="exercise.completed"
                   (click)="toggleExercise(i)">
            <ion-card-content>
              <div class="exercise-header">
                <div class="exercise-icon" [style.background-color]="exercise.color">
                  <ion-icon [name]="exercise.icon"></ion-icon>
                </div>
                <div class="exercise-info">
                  <h3>{{ exercise.name }}</h3>
                  <p class="exercise-duration">{{ exercise.duration }}</p>
                </div>
                <ion-checkbox [(ngModel)]="exercise.completed"
                             (ngModelChange)="updateProgress()"
                             class="exercise-checkbox"></ion-checkbox>
              </div>
              <p class="exercise-description">{{ exercise.description }}</p>
              <div class="exercise-benefits">
                <ion-chip *ngFor="let benefit of exercise.benefits"
                         size="small"
                         color="light">{{ benefit }}</ion-chip>
              </div>
              <div class="exercise-actions" *ngIf="!exercise.completed">
                <ion-button fill="clear" size="small" (click)="startExercise(exercise); $event.stopPropagation()">
                  <ion-icon name="play-circle-outline" slot="start"></ion-icon>
                  Mulai
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <!-- Workstation Setup -->
      <div class="recommendations-section" *ngIf="selectedCategory === 'all' || selectedCategory === 'workstation'">
        <div class="section-header">
          <h2>
            <ion-icon name="desktop-outline"></ion-icon>
            Setup Workstation
          </h2>
          <ion-chip color="secondary">{{ getWorkstationProgress() }}% Optimal</ion-chip>
        </div>

        <div class="workstation-grid">
          <ion-card class="workstation-card" *ngFor="let item of workstationItems">
            <ion-card-content>
              <div class="workstation-header">
                <div class="workstation-icon">
                  <ion-icon [name]="item.icon"></ion-icon>
                </div>
                <h3>{{ item.title }}</h3>
                <ion-badge [color]="item.status === 'optimal' ? 'success' : 'warning'">
                  {{ item.status === 'optimal' ? 'Optimal' : 'Perlu Perbaikan' }}
                </ion-badge>
              </div>
              <p class="workstation-description">{{ item.description }}</p>
              <div class="workstation-tips">
                <div class="tip" *ngFor="let tip of item.tips">
                  <ion-icon name="checkmark-circle-outline" color="success"></ion-icon>
                  <span>{{ tip }}</span>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <!-- Daily Routine -->
      <div class="recommendations-section" *ngIf="selectedCategory === 'all' || selectedCategory === 'routine'">
        <div class="section-header">
          <h2>
            <ion-icon name="time-outline"></ion-icon>
            Rutinitas Harian
          </h2>
          <ion-chip color="tertiary">Hari Ini</ion-chip>
        </div>

        <div class="routine-timeline">
          <div class="timeline-item" *ngFor="let routine of dailyRoutines; let i = index"
               [class.completed]="routine.completed"
               [class.current]="routine.current">
            <div class="timeline-time">
              <div class="time-badge" [class.active]="routine.current">
                {{ routine.time }}
              </div>
            </div>
            <div class="timeline-content">
              <ion-card class="routine-card">
                <ion-card-content>
                  <div class="routine-header">
                    <h4>{{ routine.activity }}</h4>
                    <div class="routine-status">
                      <ion-icon *ngIf="routine.completed"
                               name="checkmark-circle-outline"
                               color="success"></ion-icon>
                      <ion-icon *ngIf="routine.current && !routine.completed"
                               name="flash-outline"
                               color="warning"></ion-icon>
                    </div>
                  </div>
                  <p>{{ routine.description }}</p>
                  <div class="routine-actions" *ngIf="routine.current && !routine.completed">
                    <ion-button fill="solid" size="small" (click)="completeRoutine(i)">
                      <ion-icon name="checkmark-circle-outline" slot="start"></ion-icon>
                      Selesai
                    </ion-button>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
          </div>
        </div>
      </div>

      <!-- Personalized Insights -->
      <div class="insights-section" *ngIf="selectedCategory === 'all'">
        <div class="section-header">
          <h2>
            <ion-icon name="star-outline"></ion-icon>
            Insight Personal
          </h2>
        </div>

        <ion-card class="insights-card">
          <ion-card-content>
            <div class="insight-item" *ngFor="let insight of personalInsights">
              <div class="insight-icon" [style.background-color]="insight.color">
                <ion-icon [name]="insight.icon"></ion-icon>
              </div>
              <div class="insight-content">
                <h4>{{ insight.title }}</h4>
                <p>{{ insight.message }}</p>
              </div>
              <ion-badge [color]="insight.priority">{{ insight.type }}</ion-badge>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      --primary-color: #2563eb;
      --primary-light: #3b82f6;
      --primary-dark: #1d4ed8;
      --secondary-color: #10b981;
      --tertiary-color: #f59e0b;
      --accent-color: #8b5cf6;
      --success-color: #22c55e;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --dark-color: #1f2937;
      --light-color: #f8fafc;
      --background-color: #f1f5f9;
      --surface-color: #ffffff;
      --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      --card-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
      --border-radius: 12px;
      --border-radius-sm: 8px;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
    }

    /* Page Header Styles */
    .page-header {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      padding: var(--spacing-xl);
      margin-bottom: var(--spacing-lg);
      box-shadow: var(--card-shadow);
      border: 1px solid rgba(37, 99, 235, 0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .title-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      box-shadow: var(--card-shadow);
    }

    .title-info h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--dark-color);
      margin: 0 0 var(--spacing-sm) 0;
      letter-spacing: -0.025em;
    }

    .title-info p {
      font-size: 1.125rem;
      color: var(--primary-color);
      margin: 0;
      opacity: 0.8;
    }

    /* Content Layout */
    .content {
      --background: var(--background-color);
      padding: var(--spacing-md);
    }

    /* Mobile Responsive for Page Header */
    @media (max-width: 768px) {
      .page-header {
        padding: var(--spacing-lg);
        margin: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
        border-radius: var(--border-radius);
      }

      .title-section {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
      }

      .title-icon {
        width: 56px;
        height: 56px;
        font-size: 1.75rem;
      }

      .title-info h1 {
        font-size: 1.875rem;
        text-align: center;
      }

      .title-info p {
        font-size: 1rem;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .page-header {
        padding: var(--spacing-md);
        margin: var(--spacing-sm) var(--spacing-sm) var(--spacing-md);
      }

      .title-section {
        gap: var(--spacing-sm);
      }

      .title-icon {
        width: 48px;
        height: 48px;
        font-size: 1.5rem;
      }

      .title-info h1 {
        font-size: 1.5rem;
      }

      .title-info p {
        font-size: 0.95rem;
      }
    }

    /* Filter Section */
    .filter-section {
      margin-bottom: var(--spacing-lg);
    }

    .category-segment {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
      padding: var(--spacing-xs);
    }

    .category-segment ion-segment-button {
      --background-checked: var(--primary-color);
      --color-checked: white;
      --border-radius: var(--border-radius-sm);
      min-height: 40px;
    }

    /* Progress Overview */
    .progress-overview {
      margin-bottom: var(--spacing-lg);
    }

    .progress-card {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
      color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
    }

    .progress-card ion-card-title {
      color: white;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .progress-stats {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--spacing-lg);
      margin-top: var(--spacing-md);
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      opacity: 0.9;
      font-size: 0.9rem;
      margin-bottom: var(--spacing-sm);
    }

    .stat-progress {
      --background: rgba(255, 255, 255, 0.2);
      --progress-background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
    }

    /* Section Headers */
    .recommendations-section,
    .insights-section {
      margin-bottom: var(--spacing-xl);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .section-header h2 {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--dark-color);
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }

    .section-header h2 ion-icon {
      color: var(--primary-color);
      font-size: 1.8rem;
    }

    /* Exercise Grid */
    .exercise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--spacing-md);
    }

    .exercise-card {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
      cursor: pointer;
      border: 2px solid transparent;
    }

    .exercise-card:hover {
      box-shadow: var(--card-shadow-hover);
      transform: translateY(-2px);
    }

    .exercise-card.completed {
      border-color: var(--success-color);
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    }

    .exercise-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }

    .exercise-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
    }

    .exercise-info {
      flex: 1;
    }

    .exercise-info h3 {
      color: var(--dark-color);
      font-weight: 600;
      margin: 0 0 var(--spacing-xs) 0;
      font-size: 1.1rem;
    }

    .exercise-duration {
      color: var(--primary-color);
      font-weight: 500;
      font-size: 0.9rem;
      margin: 0;
    }

    .exercise-checkbox {
      --background-checked: var(--success-color);
      --border-color-checked: var(--success-color);
    }

    .exercise-description {
      color: var(--dark-color);
      line-height: 1.5;
      margin-bottom: var(--spacing-md);
    }

    .exercise-benefits {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-md);
    }

    .exercise-actions {
      display: flex;
      justify-content: flex-end;
    }

    /* Workstation Grid */
    .workstation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--spacing-md);
    }

    .workstation-card {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
    }

    .workstation-card:hover {
      box-shadow: var(--card-shadow-hover);
      transform: translateY(-2px);
    }

    .workstation-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }

    .workstation-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
    }

    .workstation-header h3 {
      flex: 1;
      color: var(--dark-color);
      font-weight: 600;
      margin: 0;
    }

    .workstation-description {
      color: var(--dark-color);
      line-height: 1.5;
      margin-bottom: var(--spacing-md);
    }

    .workstation-tips {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .tip {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      background: rgba(34, 197, 94, 0.1);
      border-radius: var(--border-radius-sm);
      color: var(--dark-color);
    }

    /* Routine Timeline */
    .routine-timeline {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .timeline-item {
      display: flex;
      gap: var(--spacing-md);
      position: relative;
    }

    .timeline-item:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 32px;
      top: 60px;
      bottom: -16px;
      width: 2px;
      background: linear-gradient(to bottom, var(--primary-color), transparent);
    }

    .timeline-time {
      flex-shrink: 0;
    }

    .time-badge {
      background: var(--light-color);
      color: var(--dark-color);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      border: 2px solid var(--primary-color);
      font-weight: 600;
      font-size: 0.9rem;
      text-align: center;
      min-width: 64px;
      transition: all 0.3s ease;
    }

    .time-badge.active {
      background: var(--primary-color);
      color: white;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
    }

    .timeline-content {
      flex: 1;
    }

    .routine-card {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
    }

    .timeline-item.completed .routine-card {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-left: 4px solid var(--success-color);
    }

    .timeline-item.current .routine-card {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 4px solid var(--warning-color);
    }

    .routine-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-sm);
    }

    .routine-header h4 {
      color: var(--dark-color);
      font-weight: 600;
      margin: 0;
    }

    .routine-card p {
      color: var(--dark-color);
      line-height: 1.5;
      margin-bottom: var(--spacing-md);
    }

    .routine-actions {
      display: flex;
      justify-content: flex-end;
    }

    /* Insights Section */
    .insights-card {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
    }

    .insight-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .insight-item:last-child {
      border-bottom: none;
    }

    .insight-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
    }

    .insight-content {
      flex: 1;
    }

    .insight-content h4 {
      color: var(--dark-color);
      font-weight: 600;
      margin: 0 0 var(--spacing-xs) 0;
    }

    .insight-content p {
      color: var(--dark-color);
      line-height: 1.5;
      margin: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .content {
        padding: var(--spacing-sm);
      }

      .exercise-grid,
      .workstation-grid {
        grid-template-columns: 1fr;
      }

      .progress-stats {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
      }

      .timeline-item {
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .timeline-item::after {
        display: none;
      }

      .insight-item {
        flex-direction: column;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .exercise-header {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }

      .exercise-checkbox {
        align-self: flex-start;
      }

      .workstation-header {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }
    }
  `]
})
export class RecommendationsComponent implements OnInit {
  selectedCategory: string = 'all';
  completedExercises: number = 0;
  totalExercises: number = 0;
  currentStreak: number = 5;

  exercises = [
    {
      name: 'Peregangan Leher',
      duration: '2 menit',
      description: 'Putar kepala perlahan ke kiri dan kanan, tahan 10 detik untuk mengurangi ketegangan otot leher',
      benefits: ['Relaksasi otot', 'Postur baik', 'Kurangi nyeri'],
      icon: 'body-outline',
      color: '#2563eb',
      completed: false
    },
    {
      name: 'Peregangan Bahu',
      duration: '3 menit',
      description: 'Angkat bahu ke telinga, tahan 5 detik, lalu turunkan untuk melepaskan ketegangan',
      benefits: ['Fleksibilitas', 'Sirkulasi darah', 'Relaksasi'],
      icon: 'body-outline',
      color: '#10b981',
      completed: true
    },
    {
      name: 'Peregangan Punggung',
      duration: '3 menit',
      description: 'Duduk tegak, putar tubuh ke kiri dan kanan untuk menjaga fleksibilitas tulang belakang',
      benefits: ['Mobilitas tulang', 'Postur tegak', 'Kurangi kaku'],
      icon: 'body-outline',
      color: '#f59e0b',
      completed: false
    },
    {
      name: 'Istirahat Mata',
      duration: '1 menit',
      description: 'Fokus ke objek jauh selama 20 detik, ikuti aturan 20-20-20 untuk kesehatan mata',
      benefits: ['Kesehatan mata', 'Kurangi kelelahan', 'Fokus lebih baik'],
      icon: 'eye-outline',
      color: '#8b5cf6',
      completed: false
    },
    {
      name: 'Peregangan Pergelangan',
      duration: '2 menit',
      description: 'Gerakan memutar dan fleksi pergelangan tangan untuk mencegah carpal tunnel syndrome',
      benefits: ['Mobilitas tangan', 'Pencegahan cedera', 'Sirkulasi'],
      icon: 'body-outline',
      color: '#ef4444',
      completed: false
    },
    {
      name: 'Breathing Exercise',
      duration: '5 menit',
      description: 'Teknik pernapasan 4-7-8: tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik',
      benefits: ['Relaksasi', 'Oksigenasi', 'Mengurangi stres'],
      icon: 'heart-outline',
      color: '#06b6d4',
      completed: false
    }
  ];

  workstationItems = [
    {
      title: 'Monitor',
      description: 'Posisi dan pengaturan layar untuk kenyamanan visual optimal',
      icon: 'desktop-outline',
      status: 'optimal',
      tips: [
        'Bagian atas layar sejajar dengan mata',
        'Jarak 50-70 cm dari mata',
        'Kemiringan 10-20 derajat ke belakang',
        'Hindari pantulan cahaya'
      ]
    },
    {
      title: 'Keyboard & Mouse',
      description: 'Pengaturan input device untuk kenyamanan tangan dan pergelangan',
      icon: 'body-outline',
      status: 'needs_improvement',
      tips: [
        'Siku membentuk sudut 90 derajat',
        'Pergelangan dalam posisi netral',
        'Gunakan wrist rest jika perlu',
        'Mouse sejajar dengan keyboard'
      ]
    },
    {
      title: 'Kursi Ergonomis',
      description: 'Pengaturan kursi untuk dukungan postur yang optimal',
      icon: 'body-outline',
      status: 'optimal',
      tips: [
        'Penyangga lumbar yang tepat',
        'Tinggi kursi sesuai meja',
        'Kaki menapak rata di lantai',
        'Sandaran lengan mendukung siku'
      ]
    },
    {
      title: 'Pencahayaan',
      description: 'Pengaturan cahaya untuk mengurangi kelelahan mata',
      icon: 'body-outline',
      status: 'needs_improvement',
      tips: [
        'Cahaya tidak langsung ke mata',
        'Hindari silau dari jendela',
        'Gunakan lampu meja jika perlu',
        'Sesuaikan brightness monitor'
      ]
    },
    {
      title: 'Posisi Dokumen',
      description: 'Pengaturan material kerja untuk mengurangi gerakan leher',
      icon: 'body-outline',
      status: 'optimal',
      tips: [
        'Sejajar dengan monitor',
        'Gunakan document holder',
        'Jarak baca yang nyaman',
        'Hindari menunduk berlebihan'
      ]
    }
  ];

  dailyRoutines = [
    {
      time: '09:00',
      activity: 'Setup Workstation',
      description: 'Atur posisi monitor, kursi, dan peralatan kerja sebelum memulai aktivitas',
      completed: true,
      current: false
    },
    {
      time: '10:30',
      activity: 'Peregangan Pagi',
      description: 'Lakukan peregangan leher dan bahu untuk memulai hari dengan fresh',
      completed: true,
      current: false
    },
    {
      time: '12:00',
      activity: 'Break Makan Siang',
      description: 'Istirahat makan dengan berjalan kaki ringan untuk sirkulasi darah',
      completed: false,
      current: true
    },
    {
      time: '14:30',
      activity: 'Micro Break',
      description: 'Berdiri, peregangan ringan, dan istirahat mata selama 5 menit',
      completed: false,
      current: false
    },
    {
      time: '16:00',
      activity: 'Hydration Break',
      description: 'Minum air dan lakukan breathing exercise untuk refresh',
      completed: false,
      current: false
    },
    {
      time: '17:30',
      activity: 'Evaluasi Postur',
      description: 'Review postur harian dan catat area yang perlu diperbaiki',
      completed: false,
      current: false
    }
  ];

  personalInsights = [
    {
      title: 'Pola Duduk Terlalu Lama',
      message: 'Anda duduk rata-rata 6 jam tanpa break. Cobalah berdiri setiap 1 jam.',
      icon: 'time-outline',
      color: '#f59e0b',
      type: 'Warning',
      priority: 'warning'
    },
    {
      title: 'Progress Peregangan Bagus',
      message: 'Anda konsisten melakukan peregangan 4 dari 5 hari terakhir. Pertahankan!',
      icon: 'trending-up-outline',
      color: '#22c55e',
      type: 'Success',
      priority: 'success'
    },
    {
      title: 'Postur Monitor Perlu Perbaikan',
      message: 'Monitor Anda terlalu rendah. Naikkan hingga bagian atas sejajar dengan mata.',
      icon: 'desktop-outline',
      color: '#ef4444',
      type: 'Action',
      priority: 'danger'
    }
  ];

  constructor() {
    addIcons({
      playCircleOutline,
      checkmarkCircleOutline,
      starOutline,
      star,
      timeOutline,
      bodyOutline,
      eyeOutline,
      desktopOutline,
      trendingUpOutline,
      heartOutline,
      flashOutline
    });
  }

  ngOnInit() {
    this.updateProgress();
  }

  updateProgress() {
    this.completedExercises = this.exercises.filter(ex => ex.completed).length;
    this.totalExercises = this.exercises.length;
  }

  getExerciseProgress(): number {
    if (this.totalExercises === 0) return 0;
    return Math.round((this.completedExercises / this.totalExercises) * 100);
  }

  getWorkstationProgress(): number {
    const optimalItems = this.workstationItems.filter(item => item.status === 'optimal').length;
    return Math.round((optimalItems / this.workstationItems.length) * 100);
  }

  toggleExercise(index: number) {
    this.exercises[index].completed = !this.exercises[index].completed;
    this.updateProgress();
  }

  startExercise(exercise: any) {
    console.log('Starting exercise:', exercise.name);
    // Here you could implement exercise timer, instructions, etc.
  }

  completeRoutine(index: number) {
    this.dailyRoutines[index].completed = true;
    this.dailyRoutines[index].current = false;

    // Move to next routine
    if (index + 1 < this.dailyRoutines.length) {
      this.dailyRoutines[index + 1].current = true;
    }
  }
}
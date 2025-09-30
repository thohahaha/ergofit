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
  IonChip,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg
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
  flashOutline,
  fitnessOutline,
  settingsOutline,
  sparklesOutline,
  shieldCheckmarkOutline,
  medalOutline,
  timerOutline,
  refreshOutline,
  trophyOutline,
  warningOutline,
  informationCircleOutline
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
    IonChip,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonImg
  ],
  template: `
    <ion-content class="recommendations-content">
      <!-- Background Decoration -->
      <div class="background-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>

      <div class="page-container">
        <!-- Page Header -->
        <header class="page-header">
          <div class="header-content">
            <div class="brand-logo">
              <ion-img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image"></ion-img>
            </div>
            <div class="title-section">
              <div class="title-icon">
                <ion-icon name="sparkles-outline"></ion-icon>
              </div>
              <div class="title-info">
                <h1 class="page-title">Rekomendasi AI</h1>
                <p class="page-subtitle">Panduan personal untuk postur dan kesehatan optimal</p>
              </div>
            </div>
            <div class="header-stats">
              <div class="stat-badge">
                <ion-icon name="trophy-outline"></ion-icon>
                <span>{{currentStreak}} Hari</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Category Filter -->
        <section class="filter-section">
          <div class="filter-container">
            <h2 class="filter-title">Kategori</h2>
            <ion-segment [(ngModel)]="selectedCategory" class="category-segment">
              <ion-segment-button value="all">
                <ion-icon name="sparkles-outline"></ion-icon>
                <ion-label>Semua</ion-label>
              </ion-segment-button>
              <ion-segment-button value="exercises">
                <ion-icon name="fitness-outline"></ion-icon>
                <ion-label>Latihan</ion-label>
              </ion-segment-button>
              <ion-segment-button value="workstation">
                <ion-icon name="desktop-outline"></ion-icon>
                <ion-label>Workstation</ion-label>
              </ion-segment-button>
              <ion-segment-button value="routine">
                <ion-icon name="timer-outline"></ion-icon>
                <ion-label>Rutinitas</ion-label>
              </ion-segment-button>
            </ion-segment>
          </div>
        </section>

        <!-- Progress Overview -->
        <section class="progress-section" *ngIf="selectedCategory === 'all'">
          <div class="progress-grid">
            <div class="progress-card primary-gradient">
              <div class="progress-header">
                <div class="progress-icon">
                  <ion-icon name="trending-up-outline"></ion-icon>
                </div>
                <h3>Progress Harian</h3>
              </div>
              <div class="progress-stats">
                <div class="main-stat">
                  <div class="stat-value">{{ completedExercises }}/{{ totalExercises }}</div>
                  <div class="stat-label">Latihan Selesai</div>
                  <div class="progress-bar-container">
                    <ion-progress-bar [value]="completedExercises / totalExercises" class="modern-progress"></ion-progress-bar>
                    <span class="progress-percentage">{{getExerciseProgress()}}%</span>
                  </div>
                </div>
                <div class="side-stat">
                  <div class="streak-value">{{ currentStreak }}</div>
                  <div class="streak-label">Hari Berturut-turut</div>
                  <ion-icon name="flame-outline" class="streak-icon"></ion-icon>
                </div>
              </div>
            </div>

            <div class="progress-card secondary-gradient">
              <div class="progress-header">
                <div class="progress-icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </div>
                <h3>Setup Workstation</h3>
              </div>
              <div class="workstation-summary">
                <div class="workstation-score">{{getWorkstationProgress()}}%</div>
                <div class="workstation-status">
                  <span class="status-text">{{getWorkstationStatus()}}</span>
                  <ion-icon [name]="getWorkstationIcon()" [color]="getWorkstationColor()"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Exercise Recommendations -->
        <section class="recommendations-section" *ngIf="selectedCategory === 'all' || selectedCategory === 'exercises'">
          <div class="section-header">
            <h2 class="section-title">
              <ion-icon name="fitness-outline"></ion-icon>
              Latihan Ergonomis
            </h2>
            <div class="section-actions">
              <ion-chip class="progress-chip" [color]="getProgressColor()">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <ion-label>{{ getExerciseProgress() }}% Selesai</ion-label>
              </ion-chip>
              <ion-button fill="clear" size="small" (click)="refreshExercises()">
                <ion-icon name="refresh-outline"></ion-icon>
              </ion-button>
            </div>
          </div>

          <div class="exercise-grid">
            <div class="exercise-card" *ngFor="let exercise of exercises; let i = index"
                 [class.completed]="exercise.completed"
                 [class.featured]="exercise.featured"
                 (click)="toggleExercise(i)">
              <div class="exercise-content">
                <div class="exercise-header">
                  <div class="exercise-icon-container">
                    <div class="exercise-icon" [style.background]="exercise.gradient">
                      <ion-icon [name]="exercise.icon"></ion-icon>
                    </div>
                    <div class="difficulty-badge" [class]="exercise.difficulty">
                      {{getDifficultyText(exercise.difficulty)}}
                    </div>
                  </div>
                  <div class="exercise-info">
                    <h3 class="exercise-name">{{ exercise.name }}</h3>
                    <div class="exercise-meta">
                      <span class="exercise-duration">
                        <ion-icon name="timer-outline"></ion-icon>
                        {{ exercise.duration }}
                      </span>
                      <span class="exercise-calories">
                        <ion-icon name="flame-outline"></ion-icon>
                        {{ exercise.calories }} kal
                      </span>
                    </div>
                  </div>
                  <div class="exercise-status">
                    <ion-checkbox [(ngModel)]="exercise.completed"
                                 (ngModelChange)="updateProgress(); $event.stopPropagation()"
                                 class="modern-checkbox"></ion-checkbox>
                  </div>
                </div>

                <p class="exercise-description">{{ exercise.description }}</p>

                <div class="exercise-benefits">
                  <ion-chip *ngFor="let benefit of exercise.benefits"
                           size="small"
                           class="benefit-chip">
                    {{ benefit }}
                  </ion-chip>
                </div>

                <div class="exercise-actions" *ngIf="!exercise.completed">
                  <ion-button expand="block" fill="solid" class="start-btn"
                              (click)="startExercise(exercise); $event.stopPropagation()">
                    <ion-icon name="play-circle-outline" slot="start"></ion-icon>
                    Mulai Latihan
                  </ion-button>
                </div>

                <div class="completed-overlay" *ngIf="exercise.completed">
                  <div class="completion-badge">
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    <span>Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Workstation Setup -->
        <section class="recommendations-section" *ngIf="selectedCategory === 'all' || selectedCategory === 'workstation'">
          <div class="section-header">
            <h2 class="section-title">
              <ion-icon name="desktop-outline"></ion-icon>
              Setup Workstation
            </h2>
            <div class="section-actions">
              <ion-chip class="progress-chip" [color]="getWorkstationProgressColor()">
                <ion-icon name="settings-outline"></ion-icon>
                <ion-label>{{ getWorkstationProgress() }}% Optimal</ion-label>
              </ion-chip>
            </div>
          </div>

          <div class="workstation-grid">
            <div class="workstation-card" *ngFor="let item of workstationItems"
                 [class.optimal]="item.status === 'optimal'"
                 [class.needs-improvement]="item.status === 'needs_improvement'">
              <div class="workstation-content">
                <div class="workstation-header">
                  <div class="workstation-icon-container">
                    <div class="workstation-icon">
                      <ion-icon [name]="item.icon"></ion-icon>
                    </div>
                  </div>
                  <div class="workstation-info">
                    <h3 class="workstation-title">{{ item.title }}</h3>
                    <p class="workstation-description">{{ item.description }}</p>
                  </div>
                  <div class="status-indicator">
                    <ion-badge [color]="item.status === 'optimal' ? 'success' : 'warning'"
                               class="status-badge">
                      <ion-icon [name]="item.status === 'optimal' ? 'checkmark-circle-outline' : 'warning-outline'"></ion-icon>
                      {{ item.status === 'optimal' ? 'Optimal' : 'Perlu Perbaikan' }}
                    </ion-badge>
                  </div>
                </div>

                <div class="workstation-tips">
                  <h4 class="tips-title">Tips Optimasi:</h4>
                  <div class="tips-list">
                    <div class="tip-item" *ngFor="let tip of item.tips">
                      <div class="tip-icon">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                      </div>
                      <span class="tip-text">{{ tip }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Daily Routine -->
        <section class="recommendations-section" *ngIf="selectedCategory === 'all' || selectedCategory === 'routine'">
          <div class="section-header">
            <h2 class="section-title">
              <ion-icon name="timer-outline"></ion-icon>
              Rutinitas Harian
            </h2>
            <div class="section-actions">
              <ion-chip class="progress-chip" color="tertiary">
                <ion-icon name="time-outline"></ion-icon>
                <ion-label>{{getCurrentTimeFormatted()}}</ion-label>
              </ion-chip>
            </div>
          </div>

          <div class="routine-timeline">
            <div class="timeline-item" *ngFor="let routine of dailyRoutines; let i = index"
                 [class.completed]="routine.completed"
                 [class.current]="routine.current"
                 [class.upcoming]="!routine.completed && !routine.current">
              <div class="timeline-connector" *ngIf="i < dailyRoutines.length - 1"></div>

              <div class="timeline-time">
                <div class="time-badge"
                     [class.active]="routine.current"
                     [class.completed]="routine.completed">
                  {{ routine.time }}
                </div>
              </div>

              <div class="timeline-content">
                <div class="routine-card">
                  <div class="routine-header">
                    <div class="routine-icon">
                      <ion-icon [name]="getRoutineIcon(routine)"></ion-icon>
                    </div>
                    <div class="routine-info">
                      <h4 class="routine-activity">{{ routine.activity }}</h4>
                      <p class="routine-description">{{ routine.description }}</p>
                    </div>
                    <div class="routine-status">
                      <ion-icon *ngIf="routine.completed"
                               name="checkmark-circle-outline"
                               color="success"
                               class="status-icon"></ion-icon>
                      <ion-icon *ngIf="routine.current && !routine.completed"
                               name="flash-outline"
                               color="warning"
                               class="status-icon pulse"></ion-icon>
                      <ion-icon *ngIf="!routine.completed && !routine.current"
                               name="time-outline"
                               color="medium"
                               class="status-icon"></ion-icon>
                    </div>
                  </div>

                  <div class="routine-actions" *ngIf="routine.current && !routine.completed">
                    <ion-button expand="block" fill="solid" class="complete-btn"
                                (click)="completeRoutine(i)">
                      <ion-icon name="checkmark-circle-outline" slot="start"></ion-icon>
                      Tandai Selesai
                    </ion-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Personalized Insights -->
        <section class="insights-section" *ngIf="selectedCategory === 'all'">
          <div class="section-header">
            <h2 class="section-title">
              <ion-icon name="sparkles-outline"></ion-icon>
              AI Insights Personal
            </h2>
            <div class="section-actions">
              <ion-chip class="progress-chip" color="primary">
                <ion-icon name="star-outline"></ion-icon>
                <ion-label>{{personalInsights.length}} Insight</ion-label>
              </ion-chip>
            </div>
          </div>

          <div class="insights-grid">
            <div class="insight-card" *ngFor="let insight of personalInsights"
                 [class]="insight.priority">
              <div class="insight-content">
                <div class="insight-header">
                  <div class="insight-icon" [style.background]="insight.gradient">
                    <ion-icon [name]="insight.icon"></ion-icon>
                  </div>
                  <div class="insight-info">
                    <h4 class="insight-title">{{ insight.title }}</h4>
                    <p class="insight-message">{{ insight.message }}</p>
                  </div>
                  <div class="insight-badge">
                    <ion-badge [color]="insight.priority" class="priority-badge">
                      {{ insight.type }}
                    </ion-badge>
                  </div>
                </div>

                <div class="insight-actions" *ngIf="insight.actionable">
                  <ion-button fill="clear" size="small" class="insight-action-btn">
                    <ion-icon name="information-circle-outline" slot="start"></ion-icon>
                    Pelajari Lebih
                  </ion-button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="page-footer">
          <div class="footer-content">
            <div class="footer-stats">
              <div class="footer-stat">
                <ion-icon name="trophy-outline"></ion-icon>
                <span>{{completedExercises}} Latihan Selesai</span>
              </div>
              <div class="footer-stat">
                <ion-icon name="flame-outline"></ion-icon>
                <span>{{currentStreak}} Hari Streak</span>
              </div>
            </div>
            <p class="footer-text">© 2024 ErgoFit AI. Rekomendasi cerdas untuk hidup yang lebih sehat.</p>
          </div>
        </footer>
      </div>
    </ion-content>
  `,
  styles: [`
    /* ===== CSS VARIABLES ===== */
    :host {
      --primary-color: #2563eb;
      --primary-light: #3b82f6;
      --primary-dark: #1e40af;
      --secondary-color: #059669;
      --tertiary-color: #d97706;
      --accent-color: #7c3aed;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
      --background-color: #f8fafc;
      --surface-color: #ffffff;
      --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --card-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --border-radius: 16px;
      --border-radius-sm: 12px;
      --border-radius-lg: 20px;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;

      display: block;
      height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* ===== CONTENT BASE ===== */
    .recommendations-content {
      --background: var(--background-color);
      --color: var(--gray-900);
      position: relative;
      overflow-x: hidden;
    }

    /* ===== BACKGROUND DECORATION ===== */
    .background-decoration {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      opacity: 0.02;
      animation: float 35s ease-in-out infinite;
    }

    .circle-1 {
      width: 320px;
      height: 320px;
      top: -160px;
      right: -160px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 240px;
      height: 240px;
      bottom: -120px;
      left: -120px;
      animation-delay: -18s;
    }

    .circle-3 {
      width: 180px;
      height: 180px;
      top: 50%;
      left: -90px;
      animation-delay: -9s;
    }

    /* ===== PAGE CONTAINER ===== */
    .page-container {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-lg);
      min-height: 100vh;
    }

    /* ===== PAGE HEADER ===== */
    .page-header {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow-lg);
      padding: var(--spacing-xl);
      margin-bottom: var(--spacing-xl);
      overflow: hidden;
      position: relative;
    }

    .page-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--secondary-color));
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-xl);
    }

    .brand-logo {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      flex-shrink: 0;
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      flex: 1;
    }

    .title-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.75rem;
      box-shadow: var(--card-shadow);
    }

    .page-title {
      font-size: 2.25rem;
      font-weight: 800;
      margin: 0 0 var(--spacing-xs) 0;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.025em;
    }

    .page-subtitle {
      font-size: 1.125rem;
      color: var(--gray-600);
      margin: 0;
      font-weight: 500;
    }

    .header-stats {
      display: flex;
      gap: var(--spacing-md);
      flex-shrink: 0;
    }

    .stat-badge {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      background: var(--gray-100);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      font-weight: 600;
      color: var(--gray-700);
      border: 1px solid var(--gray-200);
    }

    .stat-badge ion-icon {
      color: var(--warning-color);
      font-size: 1.125rem;
    }

    /* ===== FILTER SECTION ===== */
    .filter-section {
      margin-bottom: var(--spacing-xl);
    }

    .filter-container {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      padding: var(--spacing-lg);
    }

    .filter-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-md) 0;
    }

    .category-segment {
      --background: var(--gray-100);
      border-radius: var(--border-radius-sm);
      padding: var(--spacing-xs);
    }

    .category-segment ion-segment-button {
      --background-checked: var(--primary-color);
      --color-checked: white;
      --border-radius: var(--border-radius-sm);
      --color: var(--gray-600);
      font-weight: 500;
      min-height: 48px;
      transition: all 0.2s ease;
    }

    .category-segment ion-segment-button ion-icon {
      font-size: 1.125rem;
      margin-bottom: var(--spacing-xs);
    }

    /* ===== PROGRESS SECTION ===== */
    .progress-section {
      margin-bottom: var(--spacing-xl);
    }

    .progress-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--spacing-lg);
    }

    .progress-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow-lg);
      padding: var(--spacing-xl);
      color: white;
      position: relative;
      overflow: hidden;
    }

    .progress-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.1;
      background-size: 20px 20px;
      background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
    }

    .primary-gradient {
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    }

    .secondary-gradient {
      background: linear-gradient(135deg, var(--secondary-color), var(--success-color));
    }

    .progress-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);
    }

    .progress-icon {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .progress-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    .progress-stats {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .main-stat {
      flex: 1;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: var(--spacing-xs);
      line-height: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.9;
      margin-bottom: var(--spacing-md);
    }

    .progress-bar-container {
      position: relative;
      margin-bottom: var(--spacing-sm);
    }

    .modern-progress {
      --background: rgba(255, 255, 255, 0.2);
      --progress-background: rgba(255, 255, 255, 0.9);
      border-radius: var(--spacing-xs);
      height: 8px;
    }

    .progress-percentage {
      position: absolute;
      right: 0;
      top: -24px;
      font-size: 0.75rem;
      font-weight: 600;
      opacity: 0.9;
    }

    .side-stat {
      text-align: center;
      position: relative;
    }

    .streak-value {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: var(--spacing-xs);
    }

    .streak-label {
      font-size: 0.75rem;
      opacity: 0.9;
    }

    .streak-icon {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 1.5rem;
      color: var(--warning-color);
    }

    .workstation-summary {
      text-align: center;
    }

    .workstation-score {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: var(--spacing-sm);
    }

    .workstation-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
    }

    .status-text {
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* ===== SECTIONS ===== */
    .recommendations-section,
    .insights-section {
      margin-bottom: var(--spacing-2xl);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
      flex-wrap: wrap;
      gap: var(--spacing-md);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0;
    }

    .section-title ion-icon {
      font-size: 2rem;
      color: var(--primary-color);
    }

    .section-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .progress-chip {
      --background: var(--gray-100);
      --color: var(--gray-700);
      font-weight: 600;
    }

    /* ===== EXERCISE GRID ===== */
    .exercise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: var(--spacing-lg);
    }

    .exercise-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
      position: relative;
    }

    .exercise-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-shadow-lg);
      border-color: var(--primary-color);
    }

    .exercise-card.completed {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-color: var(--success-color);
    }

    .exercise-card.featured {
      border-color: var(--accent-color);
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.02), rgba(37, 99, 235, 0.02));
    }

    .exercise-content {
      padding: var(--spacing-xl);
    }

    .exercise-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .exercise-icon-container {
      position: relative;
    }

    .exercise-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      box-shadow: var(--card-shadow);
    }

    .difficulty-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      font-size: 0.625rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .difficulty-badge.easy {
      background: var(--success-color);
      color: white;
    }

    .difficulty-badge.medium {
      background: var(--warning-color);
      color: white;
    }

    .difficulty-badge.hard {
      background: var(--danger-color);
      color: white;
    }

    .exercise-info {
      flex: 1;
    }

    .exercise-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .exercise-meta {
      display: flex;
      gap: var(--spacing-md);
    }

    .exercise-duration,
    .exercise-calories {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: 0.875rem;
      color: var(--gray-600);
      font-weight: 500;
    }

    .exercise-duration ion-icon,
    .exercise-calories ion-icon {
      font-size: 1rem;
    }

    .exercise-status {
      flex-shrink: 0;
    }

    .modern-checkbox {
      --background-checked: var(--success-color);
      --border-color-checked: var(--success-color);
      --checkmark-color: white;
      transform: scale(1.2);
    }

    .exercise-description {
      font-size: 0.975rem;
      color: var(--gray-600);
      line-height: 1.6;
      margin-bottom: var(--spacing-lg);
    }

    .exercise-benefits {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
    }

    .benefit-chip {
      --background: var(--gray-100);
      --color: var(--gray-700);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .exercise-actions {
      margin-top: var(--spacing-lg);
    }

    .start-btn {
      --background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      --color: white;
      --border-radius: var(--border-radius-sm);
      font-weight: 600;
      height: 48px;
      transition: all 0.2s ease;
    }

    .start-btn:hover {
      transform: translateY(-1px);
    }

    .completed-overlay {
      position: absolute;
      top: var(--spacing-md);
      right: var(--spacing-md);
    }

    .completion-badge {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      background: var(--success-color);
      color: white;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      box-shadow: var(--card-shadow);
    }

    /* ===== WORKSTATION GRID ===== */
    .workstation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: var(--spacing-lg);
    }

    .workstation-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .workstation-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-shadow-lg);
    }

    .workstation-card.optimal {
      border-left: 4px solid var(--success-color);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.02), rgba(5, 150, 105, 0.02));
    }

    .workstation-card.needs-improvement {
      border-left: 4px solid var(--warning-color);
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.02), rgba(217, 119, 6, 0.02));
    }

    .workstation-content {
      padding: var(--spacing-xl);
    }

    .workstation-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .workstation-icon-container {
      flex-shrink: 0;
    }

    .workstation-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--gray-600), var(--gray-700));
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
    }

    .workstation-info {
      flex: 1;
    }

    .workstation-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .workstation-description {
      font-size: 0.875rem;
      color: var(--gray-600);
      line-height: 1.5;
      margin: 0;
    }

    .status-indicator {
      flex-shrink: 0;
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: 0.75rem;
      font-weight: 600;
      padding: var(--spacing-xs) var(--spacing-sm);
    }

    .workstation-tips {
      background: var(--gray-50);
      border-radius: var(--border-radius-sm);
      padding: var(--spacing-lg);
      border: 1px solid var(--gray-200);
    }

    .tips-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-md) 0;
    }

    .tips-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .tip-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }

    .tip-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .tip-icon ion-icon {
      font-size: 0.875rem;
      color: var(--success-color);
    }

    .tip-text {
      font-size: 0.875rem;
      color: var(--gray-700);
      line-height: 1.5;
    }

    /* ===== ROUTINE TIMELINE ===== */
    .routine-timeline {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .timeline-item {
      display: flex;
      gap: var(--spacing-lg);
      position: relative;
    }

    .timeline-connector {
      position: absolute;
      left: 42px;
      top: 72px;
      bottom: -24px;
      width: 2px;
      background: linear-gradient(to bottom, var(--primary-color), var(--gray-300));
      opacity: 0.3;
    }

    .timeline-time {
      flex-shrink: 0;
    }

    .time-badge {
      background: var(--surface-color);
      border: 2px solid var(--gray-300);
      color: var(--gray-600);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 0.875rem;
      text-align: center;
      min-width: 84px;
      transition: all 0.3s ease;
    }

    .time-badge.active {
      background: var(--warning-color);
      border-color: var(--warning-color);
      color: white;
      box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
      animation: pulse 2s infinite;
    }

    .time-badge.completed {
      background: var(--success-color);
      border-color: var(--success-color);
      color: white;
    }

    .timeline-content {
      flex: 1;
    }

    .routine-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      padding: var(--spacing-xl);
      transition: all 0.3s ease;
    }

    .timeline-item.completed .routine-card {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-color: var(--success-color);
    }

    .timeline-item.current .routine-card {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-color: var(--warning-color);
    }

    .routine-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .routine-icon {
      width: 40px;
      height: 40px;
      background: var(--gray-100);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray-600);
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .routine-info {
      flex: 1;
    }

    .routine-activity {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .routine-description {
      font-size: 0.875rem;
      color: var(--gray-600);
      line-height: 1.5;
      margin: 0;
    }

    .routine-status {
      flex-shrink: 0;
    }

    .status-icon {
      font-size: 1.5rem;
    }

    .pulse {
      animation: pulse 2s infinite;
    }

    .routine-actions {
      margin-top: var(--spacing-lg);
    }

    .complete-btn {
      --background: linear-gradient(135deg, var(--success-color), var(--secondary-color));
      --color: white;
      --border-radius: var(--border-radius-sm);
      font-weight: 600;
      height: 44px;
    }

    /* ===== INSIGHTS GRID ===== */
    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: var(--spacing-lg);
    }

    .insight-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
      overflow: hidden;
      position: relative;
    }

    .insight-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-shadow-lg);
    }

    .insight-card.success {
      border-left: 4px solid var(--success-color);
    }

    .insight-card.warning {
      border-left: 4px solid var(--warning-color);
    }

    .insight-card.danger {
      border-left: 4px solid var(--danger-color);
    }

    .insight-content {
      padding: var(--spacing-xl);
    }

    .insight-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .insight-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .insight-info {
      flex: 1;
    }

    .insight-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .insight-message {
      font-size: 0.875rem;
      color: var(--gray-600);
      line-height: 1.6;
      margin: 0;
    }

    .insight-badge {
      flex-shrink: 0;
    }

    .priority-badge {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .insight-actions {
      margin-top: var(--spacing-md);
    }

    .insight-action-btn {
      --color: var(--primary-color);
      font-weight: 500;
      font-size: 0.875rem;
    }

    /* ===== PAGE FOOTER ===== */
    .page-footer {
      margin-top: var(--spacing-2xl);
      padding-top: var(--spacing-xl);
      border-top: 1px solid var(--gray-200);
    }

    .footer-content {
      text-align: center;
    }

    .footer-stats {
      display: flex;
      justify-content: center;
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-lg);
    }

    .footer-stat {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--gray-600);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .footer-stat ion-icon {
      color: var(--primary-color);
    }

    .footer-text {
      font-size: 0.75rem;
      color: var(--gray-500);
      margin: 0;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-25px) rotate(2deg); }
      66% { transform: translateY(12px) rotate(-1deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 1024px) {
      .progress-grid {
        grid-template-columns: 1fr;
      }

      .exercise-grid,
      .workstation-grid,
      .insights-grid {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: var(--spacing-md);
      }

      .header-content {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-lg);
      }

      .title-section {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .page-title {
        font-size: 1.875rem;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
      }

      .progress-stats {
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      .timeline-item {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .timeline-connector {
        display: none;
      }

      .footer-stats {
        flex-direction: column;
        gap: var(--spacing-md);
      }
    }

    @media (max-width: 480px) {
      .page-container {
        padding: var(--spacing-sm);
      }

      .exercise-grid,
      .workstation-grid,
      .insights-grid {
        grid-template-columns: 1fr;
      }

      .exercise-header,
      .workstation-header,
      .insight-header {
        flex-direction: column;
        gap: var(--spacing-md);
        text-align: left;
      }

      .exercise-status,
      .status-indicator,
      .insight-badge {
        align-self: flex-start;
      }

      .brand-logo {
        width: 48px;
        height: 48px;
      }

      .title-icon {
        width: 48px;
        height: 48px;
        font-size: 1.5rem;
      }
    }

    /* ===== ACCESSIBILITY ===== */
    @media (prefers-reduced-motion: reduce) {
      .decoration-circle,
      .pulse {
        animation: none;
      }

      .exercise-card:hover,
      .workstation-card:hover,
      .insight-card:hover {
        transform: none;
      }
    }
  `]
})
export class RecommendationsComponent implements OnInit {
  selectedCategory: string = 'all';
  completedExercises: number = 0;
  totalExercises: number = 0;
  currentStreak: number = 7;

  exercises = [
    {
      name: 'Peregangan Leher 360°',
      duration: '3 menit',
      calories: 8,
      description: 'Gerakan memutar kepala perlahan ke segala arah untuk mengurangi ketegangan otot leher dan meningkatkan sirkulasi darah.',
      benefits: ['Relaksasi otot', 'Postur baik', 'Kurangi nyeri'],
      icon: 'body-outline',
      gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      difficulty: 'easy',
      completed: false,
      featured: true
    },
    {
      name: 'Dynamic Shoulder Rolls',
      duration: '4 menit',
      calories: 12,
      description: 'Gerakan memutar bahu ke depan dan belakang untuk melepaskan ketegangan dan meningkatkan mobilitas sendi.',
      benefits: ['Fleksibilitas', 'Sirkulasi darah', 'Relaksasi'],
      icon: 'fitness-outline',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      difficulty: 'easy',
      completed: true,
      featured: false
    },
    {
      name: 'Spinal Twist Stretch',
      duration: '5 menit',
      calories: 15,
      description: 'Rotasi tulang belakang dengan duduk tegak untuk menjaga fleksibilitas dan mengurangi kekakuan punggung.',
      benefits: ['Mobilitas tulang', 'Postur tegak', 'Kurangi kaku'],
      icon: 'body-outline',
      gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
      difficulty: 'medium',
      completed: false,
      featured: false
    },
    {
      name: '20-20-20 Eye Break',
      duration: '2 menit',
      calories: 5,
      description: 'Setiap 20 menit, lihat objek 20 kaki (6 meter) selama 20 detik untuk mengurangi kelelahan mata digital.',
      benefits: ['Kesehatan mata', 'Kurangi kelelahan', 'Fokus lebih baik'],
      icon: 'eye-outline',
      gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
      difficulty: 'easy',
      completed: false,
      featured: true
    },
    {
      name: 'Wrist & Finger Mobility',
      duration: '3 menit',
      calories: 10,
      description: 'Serangkaian gerakan pergelangan dan jari untuk mencegah carpal tunnel syndrome dan meningkatkan aliran darah.',
      benefits: ['Mobilitas tangan', 'Pencegahan cedera', 'Sirkulasi'],
      icon: 'body-outline',
      gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
      difficulty: 'easy',
      completed: false,
      featured: false
    },
    {
      name: 'Mindful Breathing 4-7-8',
      duration: '6 menit',
      calories: 18,
      description: 'Teknik pernapasan mindfulness: tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik untuk relaksasi mendalam.',
      benefits: ['Relaksasi', 'Oksigenasi', 'Mengurangi stres'],
      icon: 'heart-outline',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      difficulty: 'medium',
      completed: false,
      featured: false
    }
  ];

  workstationItems = [
    {
      title: 'Monitor Ergonomis',
      description: 'Posisi dan pengaturan layar untuk kenyamanan visual optimal dan kesehatan mata jangka panjang',
      icon: 'desktop-outline',
      status: 'optimal',
      tips: [
        'Bagian atas layar sejajar dengan mata atau sedikit di bawah',
        'Jarak optimal 50-70 cm dari mata (arm length)',
        'Kemiringan monitor 10-20 derajat ke belakang',
        'Hindari pantulan cahaya langsung dari jendela atau lampu'
      ]
    },
    {
      title: 'Keyboard & Mouse Setup',
      description: 'Pengaturan input device untuk kenyamanan tangan, pergelangan, dan mencegah RSI',
      icon: 'body-outline',
      status: 'needs_improvement',
      tips: [
        'Siku membentuk sudut 90-110 derajat saat mengetik',
        'Pergelangan dalam posisi netral, tidak menekuk',
        'Gunakan wrist rest berkualitas jika diperlukan',
        'Mouse sejajar dengan keyboard, hindari jangkauan berlebihan'
      ]
    },
    {
      title: 'Kursi Ergonomis Pro',
      description: 'Pengaturan kursi profesional untuk dukungan postur optimal dan kenyamanan sepanjang hari',
      icon: 'body-outline',
      status: 'optimal',
      tips: [
        'Penyangga lumbar mendukung lengkungan alami punggung',
        'Tinggi kursi memungkinkan kaki rata di lantai',
        'Kedalaman kursi mendukung paha tanpa tekanan lutut',
        'Sandaran lengan mendukung siku dan bahu rileks'
      ]
    },
    {
      title: 'Pencahayaan Optimal',
      description: 'Setup pencahayaan yang mengurangi kelelahan mata dan meningkatkan produktivitas',
      icon: 'flashOutline',
      status: 'needs_improvement',
      tips: [
        'Hindari cahaya langsung mengenai layar (glare)',
        'Gunakan pencahayaan ambient yang merata',
        'Lampu tugas (task lighting) untuk dokumen',
        'Sesuaikan brightness monitor dengan lingkungan'
      ]
    },
    {
      title: 'Document Positioning',
      description: 'Pengaturan material kerja untuk mengurangi gerakan leher dan meningkatkan efisiensi',
      icon: 'body-outline',
      status: 'optimal',
      tips: [
        'Posisikan dokumen sejajar dengan monitor',
        'Gunakan document holder adjustable',
        'Jarak baca yang nyaman tanpa membungkuk',
        'Pencahayaan yang memadai untuk membaca dokumen'
      ]
    }
  ];

  dailyRoutines = [
    {
      time: '08:30',
      activity: 'Morning Setup',
      description: 'Atur workstation dan lakukan check postur sebelum memulai aktivitas kerja',
      completed: true,
      current: false
    },
    {
      time: '10:00',
      activity: 'Energizing Stretch',
      description: 'Peregangan pagi untuk memulai hari dengan energi dan fleksibilitas optimal',
      completed: true,
      current: false
    },
    {
      time: '12:00',
      activity: 'Active Lunch Break',
      description: 'Istirahat makan dengan aktivitas ringan untuk melancarkan sirkulasi darah',
      completed: false,
      current: true
    },
    {
      time: '14:30',
      activity: 'Micro Movement',
      description: 'Micro break 5 menit: berdiri, peregangan ringan, dan refresh mental',
      completed: false,
      current: false
    },
    {
      time: '16:00',
      activity: 'Hydration & Breathing',
      description: 'Minum air yang cukup dan lakukan breathing exercise untuk re-energize',
      completed: false,
      current: false
    },
    {
      time: '17:30',
      activity: 'Daily Review',
      description: 'Evaluasi postur harian dan catat improvement area untuk esok hari',
      completed: false,
      current: false
    }
  ];

  personalInsights = [
    {
      title: 'Pola Duduk Perlu Perhatian',
      message: 'Analisis menunjukkan Anda duduk rata-rata 6.5 jam tanpa break. Cobalah berdiri setiap 45-60 menit.',
      icon: 'time-outline',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      type: 'Warning',
      priority: 'warning',
      actionable: true
    },
    {
      title: 'Progress Peregangan Excellent',
      message: 'Konsistensi luar biasa! Anda telah melakukan peregangan 6 dari 7 hari terakhir. Keep it up!',
      icon: 'trending-up-outline',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      type: 'Achievement',
      priority: 'success',
      actionable: false
    },
    {
      title: 'Monitor Height Alert',
      message: 'Monitor Anda 15° terlalu rendah. Naikkan hingga bagian atas sejajar dengan garis mata untuk postur optimal.',
      icon: 'desktop-outline',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      type: 'Action Required',
      priority: 'danger',
      actionable: true
    },
    {
      title: 'Hydration Reminder',
      message: 'Pattern analysis menunjukkan asupan air kurang optimal. Target 8 gelas per hari untuk performa terbaik.',
      icon: 'sparkles-outline',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      type: 'Health Tip',
      priority: 'primary',
      actionable: true
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
      flashOutline,
      fitnessOutline,
      settingsOutline,
      sparklesOutline,
      shieldCheckmarkOutline,
      medalOutline,
      timerOutline,
      refreshOutline,
      trophyOutline,
      warningOutline,
      informationCircleOutline
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

  getProgressColor(): string {
    const progress = this.getExerciseProgress();
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'primary';
  }

  getWorkstationProgress(): number {
    const optimalItems = this.workstationItems.filter(item => item.status === 'optimal').length;
    return Math.round((optimalItems / this.workstationItems.length) * 100);
  }

  getWorkstationProgressColor(): string {
    const progress = this.getWorkstationProgress();
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'warning';
    return 'danger';
  }

  getWorkstationStatus(): string {
    const progress = this.getWorkstationProgress();
    if (progress >= 80) return 'Excellent';
    if (progress >= 60) return 'Good';
    return 'Needs Improvement';
  }

  getWorkstationIcon(): string {
    const progress = this.getWorkstationProgress();
    if (progress >= 80) return 'checkmark-circle-outline';
    if (progress >= 60) return 'warning-outline';
    return 'warning-outline';
  }

  getWorkstationColor(): string {
    const progress = this.getWorkstationProgress();
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'warning';
    return 'danger';
  }

  getDifficultyText(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return 'Mudah';
      case 'medium': return 'Sedang';
      case 'hard': return 'Sulit';
      default: return 'Mudah';
    }
  }

  getCurrentTimeFormatted(): string {
    return new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  getRoutineIcon(routine: any): string {
    const hour = parseInt(routine.time.split(':')[0]);
    if (hour < 10) return 'sparkles-outline';
    if (hour < 13) return 'fitness-outline';
    if (hour < 15) return 'body-outline';
    if (hour < 17) return 'timer-outline';
    return 'checkmark-circle-outline';
  }

  toggleExercise(index: number) {
    this.exercises[index].completed = !this.exercises[index].completed;
    this.updateProgress();
  }

  startExercise(exercise: any) {
    console.log('Starting exercise:', exercise.name);
    // Here you could implement exercise timer, instructions, etc.
    alert(`Memulai latihan: ${exercise.name}\nDurasi: ${exercise.duration}\nKalori: ${exercise.calories} kal`);
  }

  refreshExercises() {
    // Reset all exercises to create a fresh start
    this.exercises.forEach(exercise => exercise.completed = false);
    this.updateProgress();
    console.log('Exercise progress refreshed');
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
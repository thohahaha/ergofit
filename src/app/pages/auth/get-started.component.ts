import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonText,
  IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  bodyOutline,
  analyticsOutline,
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
  flashOutline,
  trendingUpOutline,
  eyeOutline,
  personOutline,
  logInOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonText,
    IonImg
  ],
  template: `
    <ion-content class="get-started-content">
      <!-- Background Decoration -->
      <div class="background-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>

      <div class="page-container">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="logo-container">
            <div class="app-logo">
              <ion-img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image"></ion-img>
            </div>
            <h1 class="brand-name">ErgoFit</h1>
            <p class="brand-tagline">Smart Posture Intelligence</p>
          </div>

          <div class="hero-content">
            <h2 class="hero-title">Revolusi Kesehatan Postur Anda</h2>
            <p class="hero-description">
              Teknologi AI terdepan untuk monitoring postur real-time, analisis mendalam,
              dan rekomendasi personal yang meningkatkan produktivitas dan kesehatan Anda.
            </p>
          </div>

          <!-- Stats Bar -->
          <div class="stats-bar">
            <div class="stat-item">
              <div class="stat-number">95%</div>
              <div class="stat-label">Akurasi</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Monitoring</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">AI</div>
              <div class="stat-label">Powered</div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
          <div class="section-header">
            <h3 class="section-title">Fitur Unggulan</h3>
            <p class="section-subtitle">Teknologi canggih untuk kesehatan postur optimal</p>
          </div>

          <div class="features-grid">
            <div class="feature-card primary-feature">
              <div class="feature-icon-container">
                <div class="feature-icon icon-monitoring">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
              </div>
              <div class="feature-content">
                <h4 class="feature-title">Real-time Monitoring</h4>
                <p class="feature-description">Pantau postur tubuh secara kontinyu dengan teknologi computer vision AI yang presisi</p>
                <div class="feature-badge">
                  <ion-icon name="flash-outline"></ion-icon>
                  <span>Instant</span>
                </div>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon-container">
                <div class="feature-icon icon-analytics">
                  <ion-icon name="analytics-outline"></ion-icon>
                </div>
              </div>
              <div class="feature-content">
                <h4 class="feature-title">Smart Analytics</h4>
                <p class="feature-description">Dashboard analitik komprehensif dengan insights dan tren kesehatan postur</p>
                <div class="feature-badge">
                  <ion-icon name="trending-up-outline"></ion-icon>
                  <span>Insights</span>
                </div>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon-container">
                <div class="feature-icon icon-recommendations">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>
              </div>
              <div class="feature-content">
                <h4 class="feature-title">Personal AI Coach</h4>
                <p class="feature-description">Rekomendasi dan latihan yang dipersonalisasi berdasarkan pola postur individual</p>
                <div class="feature-badge">
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                  <span>Personalized</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Benefits Section -->
        <section class="benefits-section">
          <div class="benefits-grid">
            <div class="benefit-item">
              <ion-icon name="body-outline" class="benefit-icon"></ion-icon>
              <span class="benefit-text">Postur Lebih Baik</span>
            </div>
            <div class="benefit-item">
              <ion-icon name="trending-up-outline" class="benefit-icon"></ion-icon>
              <span class="benefit-text">Produktivitas Meningkat</span>
            </div>
            <div class="benefit-item">
              <ion-icon name="checkmark-circle-outline" class="benefit-icon"></ion-icon>
              <span class="benefit-text">Kesehatan Optimal</span>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
          <div class="cta-content">
            <h3 class="cta-title">Mulai Perjalanan Kesehatan Anda</h3>
            <p class="cta-subtitle">Bergabung dengan ribuan pengguna yang telah merasakan manfaatnya</p>
          </div>

          <div class="action-buttons">
            <ion-button
              expand="block"
              class="primary-action-btn"
              (click)="navigateToLogin()">
              <ion-icon name="log-in-outline" slot="start"></ion-icon>
              Masuk ke Akun
              <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
            </ion-button>

            <ion-button
              expand="block"
              fill="outline"
              class="secondary-action-btn"
              (click)="navigateToRegister()">
              <ion-icon name="person-outline" slot="start"></ion-icon>
              Daftar Gratis
            </ion-button>
          </div>

          <div class="guest-access">
            <div class="divider-container">
              <div class="divider-line"></div>
              <span class="divider-text">atau</span>
              <div class="divider-line"></div>
            </div>
            <ion-button
              fill="clear"
              class="guest-btn"
              (click)="continueAsGuest()">
              Lanjutkan sebagai Tamu
              <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
            </ion-button>
          </div>
        </section>

        <!-- Footer -->
        <div class="page-footer">
          <p class="footer-text">© 2024 ErgoFit. Kesehatan postur untuk masa depan yang lebih baik.</p>
        </div>
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
      --success-color: #065f46;
      --warning-color: #92400e;
      --danger-color: #dc2626;
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
    .get-started-content {
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
      opacity: 0.03;
      animation: float 20s ease-in-out infinite;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      top: -150px;
      right: -150px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      bottom: -100px;
      left: -100px;
      animation-delay: -10s;
    }

    .circle-3 {
      width: 150px;
      height: 150px;
      top: 50%;
      left: -75px;
      animation-delay: -5s;
    }

    /* ===== PAGE CONTAINER ===== */
    .page-container {
      position: relative;
      z-index: 1;
      max-width: 600px;
      margin: 0 auto;
      padding: var(--spacing-lg);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* ===== HERO SECTION ===== */
    .hero-section {
      text-align: center;
      padding: var(--spacing-2xl) 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--spacing-xl);
    }

    .logo-container {
      margin-bottom: var(--spacing-lg);
    }

    .app-logo {
      width: 100px;
      height: 100px;
      background: var(--surface-color);
      border-radius: 50%;
      margin: 0 auto var(--spacing-lg);
      box-shadow: var(--card-shadow-lg);
      border: 3px solid var(--gray-200);
      overflow: hidden;
      position: relative;
      transition: all 0.3s ease;
    }

    .app-logo:hover {
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .brand-name {
      font-size: 3rem;
      font-weight: 800;
      margin: 0 0 var(--spacing-sm) 0;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }

    .brand-tagline {
      font-size: 1.125rem;
      color: var(--gray-600);
      margin: 0 0 var(--spacing-xl) 0;
      font-weight: 500;
      letter-spacing: 0.025em;
      text-transform: uppercase;
    }

    .hero-content {
      margin-bottom: var(--spacing-xl);
    }

    .hero-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-lg) 0;
      line-height: 1.2;
      letter-spacing: -0.025em;
    }

    .hero-description {
      font-size: 1.125rem;
      color: var(--gray-600);
      line-height: 1.6;
      margin: 0;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    /* ===== STATS BAR ===== */
    .stats-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-color);
      border-radius: var(--border-radius);
      padding: var(--spacing-lg);
      box-shadow: var(--card-shadow);
      border: 1px solid var(--gray-200);
      gap: var(--spacing-lg);
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary-color);
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--gray-600);
      font-weight: 500;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: var(--gray-200);
    }

    /* ===== SECTIONS ===== */
    .features-section,
    .benefits-section,
    .cta-section {
      margin-bottom: var(--spacing-2xl);
    }

    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }

    .section-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .section-subtitle {
      font-size: 1rem;
      color: var(--gray-600);
      margin: 0;
    }

    /* ===== FEATURES GRID ===== */
    .features-grid {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .feature-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-xl);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-shadow-lg);
    }

    .primary-feature {
      border-color: var(--primary-color);
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.02), rgba(124, 58, 237, 0.02));
    }

    .feature-icon-container {
      margin-bottom: var(--spacing-lg);
    }

    .feature-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      margin-bottom: var(--spacing-md);
    }

    .icon-monitoring {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    }

    .icon-analytics {
      background: linear-gradient(135deg, var(--secondary-color), #10b981);
    }

    .icon-recommendations {
      background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
    }

    .feature-content {
      flex: 1;
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .feature-description {
      font-size: 0.975rem;
      color: var(--gray-600);
      line-height: 1.6;
      margin: 0 0 var(--spacing-md) 0;
    }

    .feature-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      background: var(--gray-100);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--gray-700);
    }

    .feature-badge ion-icon {
      font-size: 0.875rem;
    }

    /* ===== BENEFITS SECTION ===== */
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--spacing-md);
    }

    .benefit-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-lg);
      background: var(--surface-color);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      transition: all 0.2s ease;
    }

    .benefit-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-shadow);
    }

    .benefit-icon {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-bottom: var(--spacing-sm);
    }

    .benefit-text {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-700);
      text-align: center;
    }

    /* ===== CTA SECTION ===== */
    .cta-content {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }

    .cta-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .cta-subtitle {
      font-size: 1rem;
      color: var(--gray-600);
      margin: 0;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }

    .primary-action-btn {
      --background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      --color: white;
      --border-radius: var(--border-radius);
      --box-shadow: var(--card-shadow);
      font-weight: 600;
      text-transform: none;
      height: 56px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .primary-action-btn:hover {
      transform: translateY(-2px);
      --box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
    }

    .secondary-action-btn {
      --border-color: var(--primary-color);
      --color: var(--primary-color);
      --border-radius: var(--border-radius);
      font-weight: 600;
      text-transform: none;
      height: 56px;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .secondary-action-btn:hover {
      --background: rgba(37, 99, 235, 0.05);
    }

    /* ===== GUEST ACCESS ===== */
    .guest-access {
      text-align: center;
    }

    .divider-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin: var(--spacing-lg) 0;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background: var(--gray-200);
    }

    .divider-text {
      font-size: 0.875rem;
      color: var(--gray-500);
      font-weight: 500;
    }

    .guest-btn {
      --color: var(--gray-600);
      font-weight: 500;
      text-transform: none;
      transition: all 0.2s ease;
    }

    .guest-btn:hover {
      --color: var(--primary-color);
    }

    /* ===== FOOTER ===== */
    .page-footer {
      margin-top: auto;
      padding-top: var(--spacing-xl);
      text-align: center;
      border-top: 1px solid var(--gray-200);
    }

    .footer-text {
      font-size: 0.875rem;
      color: var(--gray-500);
      margin: 0;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(2deg); }
      66% { transform: translateY(10px) rotate(-1deg); }
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .page-container {
        padding: var(--spacing-md);
      }

      .brand-name {
        font-size: 2.5rem;
      }

      .hero-title {
        font-size: 1.875rem;
      }

      .hero-description {
        font-size: 1rem;
      }

      .stats-bar {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .stat-divider {
        width: 60px;
        height: 1px;
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        gap: var(--spacing-sm);
      }
    }

    @media (max-width: 480px) {
      .page-container {
        padding: var(--spacing-sm);
      }

      .app-logo {
        width: 80px;
        height: 80px;
      }

      .brand-name {
        font-size: 2rem;
      }

      .hero-title {
        font-size: 1.5rem;
      }

      .feature-card {
        padding: var(--spacing-lg);
      }

      .section-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class GetStartedComponent {

  constructor(private router: Router) {
    addIcons({
      'arrow-forward-outline': arrowForwardOutline,
      'body-outline': bodyOutline,
      'analytics-outline': analyticsOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'flash-outline': flashOutline,
      'trending-up-outline': trendingUpOutline,
      'eye-outline': eyeOutline,
      'person-outline': personOutline,
      'log-in-outline': logInOutline
    });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  continueAsGuest() {
    // Set guest mode in localStorage or service
    localStorage.setItem('isGuestMode', 'true');
    this.router.navigate(['/dashboard']);
  }
}
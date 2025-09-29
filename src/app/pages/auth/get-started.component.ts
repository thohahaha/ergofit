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
  shieldCheckmarkOutline
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
      <div class="page-wrapper">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="logo-container">
          <div class="app-logo">
            <ion-img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image"></ion-img>
          </div>
          <h1>ErgoFit</h1>
          <p class="tagline">Smart Posture Monitor</p>
        </div>

        <div class="hero-text">
          <h2>Jaga Postur Tubuh Anda</h2>
          <p>Monitoring postur real-time, analitik kesehatan, dan rekomendasi ergonomis untuk produktivitas maksimal.</p>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-section">
        <div class="feature-card">
          <ion-icon name="body-outline" class="feature-icon"></ion-icon>
          <h3>Monitoring Real-time</h3>
          <p>Pantau postur tubuh Anda secara real-time dengan teknologi AI</p>
        </div>

        <div class="feature-card">
          <ion-icon name="analytics-outline" class="feature-icon"></ion-icon>
          <h3>Analitik Kesehatan</h3>
          <p>Dapatkan laporan dan insights tentang kebiasaan postur Anda</p>
        </div>

        <div class="feature-card">
          <ion-icon name="shield-checkmark-outline" class="feature-icon"></ion-icon>
          <h3>Rekomendasi Personal</h3>
          <p>Latihan dan tips yang disesuaikan dengan kondisi Anda</p>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <ion-button
          expand="block"
          class="primary-button"
          (click)="navigateToLogin()">
          Masuk ke Akun
          <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
        </ion-button>

        <ion-button
          expand="block"
          fill="outline"
          class="secondary-button"
          (click)="navigateToRegister()">
          Daftar Sekarang
        </ion-button>

        <div class="guest-option">
          <ion-text color="medium">
            <p>Atau <a (click)="continueAsGuest()" class="guest-link">lanjutkan sebagai tamu</a></p>
          </ion-text>
        </div>
      </div>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      background: var(--ergofit-background) !important;
    }

    ion-content.get-started-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
      color: #333 !important;
    }

    ion-content.get-started-content::part(background) {
      background: var(--ergofit-background) !important;
    }

    ion-content.get-started-content::part(scroll) {
      background: var(--ergofit-background) !important;
    }

    .get-started-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
      color: #333 !important;
    }

    .page-wrapper {
      padding: 32px 24px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 500px;
      margin: 0 auto;
      color: #333;
      position: relative;
    }

    .page-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--ergofit-background-accent);
      opacity: 0.3;
      z-index: -1;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 48px;
    }

    .logo-container {
      margin-bottom: 32px;
    }

    .app-logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: var(--ergofit-card-background);
      border-radius: 50%;
      margin-bottom: 16px;
      box-shadow: var(--ergofit-card-shadow);
      border: var(--ergofit-card-border);
      overflow: hidden;
      position: relative;
    }

    .logo-icon {
      font-size: 2.5rem;
      color: var(--ergofit-primary);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .hero-section h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      background: linear-gradient(135deg, var(--ergofit-primary), var(--ergofit-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .tagline {
      font-size: 1.1rem;
      margin: 0 0 24px 0;
      font-weight: 500;
      color: #666;
    }

    .hero-text h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #333;
    }

    .hero-text p {
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
      color: #666;
      color: #666;
    }

    .features-section {
      margin-bottom: 48px;
    }

    .feature-card {
      background: var(--ergofit-card-background);
      border: var(--ergofit-card-border);
      box-shadow: var(--ergofit-card-shadow);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 16px;
      text-align: center;
    }

    .feature-icon {
      font-size: 2rem;
      color: var(--ergofit-primary);
      margin-bottom: 8px;
    }

    .feature-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
    }

    .feature-card p {
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.5;
      color: #666;
    }

    .cta-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .primary-button {
      --background: var(--ergofit-primary);
      --color: white;
      --border-radius: 12px;
      --padding-top: 16px;
      --padding-bottom: 16px;
      font-weight: 600;
      font-size: 1rem;
    }

    .secondary-button {
      --border-color: var(--ergofit-primary);
      --color: var(--ergofit-primary);
      --border-radius: 12px;
      --padding-top: 16px;
      --padding-bottom: 16px;
      font-weight: 600;
      font-size: 1rem;
    }

    .guest-option {
      text-align: center;
      margin-top: 8px;
    }

    .guest-option p {
      color: #666;
    }

    .guest-link {
      color: var(--ergofit-primary);
      text-decoration: underline;
      cursor: pointer;
      font-weight: 500;
    }

    .guest-link:hover {
      opacity: 0.8;
    }

    @media (max-width: 480px) {
      .page-wrapper {
        padding: 24px 16px;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .hero-text h2 {
        font-size: 1.5rem;
      }

      .app-logo {
        width: 60px;
        height: 60px;
        overflow: hidden;
      }

      .logo-icon {
        font-size: 2rem;
      }

      .logo-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
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
      'shield-checkmark-outline': shieldCheckmarkOutline
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
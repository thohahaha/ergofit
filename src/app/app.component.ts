import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { IonApp, IonSpinner } from '@ionic/angular/standalone';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonApp,
    IonSpinner
  ],
  template: `
    <ion-app>
      <div *ngIf="(authService.loading$ | async)" class="loading-screen">
        <!-- Background decorations -->
        <div class="bg-decoration bg-decoration-1"></div>
        <div class="bg-decoration bg-decoration-2"></div>
        <div class="bg-decoration bg-decoration-3"></div>

        <div class="loading-content">
          <div class="logo-container">
            <img src="/assets/icon/favicon.png" alt="ErgoFit" class="loading-logo">
            <div class="logo-glow"></div>
          </div>

          <div class="brand-section">
            <h1 class="brand-title">ErgoFit</h1>
            <p class="brand-subtitle">AI-Powered Posture Intelligence</p>
          </div>

          <div class="loading-spinner-container">
            <div class="custom-spinner">
              <div class="spinner-ring"></div>
              <div class="spinner-ring"></div>
              <div class="spinner-ring"></div>
            </div>
          </div>

          <div class="loading-text">
            <p class="loading-message">Initializing workspace...</p>
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <router-outlet *ngIf="!(authService.loading$ | async)"></router-outlet>
    </ion-app>
  `,
  styles: [`
    :host {
      --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      --text-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --shadow-light: 0 8px 32px rgba(102, 126, 234, 0.3);
      --shadow-glow: 0 0 40px rgba(255, 255, 255, 0.1);
    }

    ion-app {
      min-height: 100vh;
    }

    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
      overflow: hidden;
      z-index: 9999;
    }

    /* Background decorations */
    .bg-decoration {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
      animation: float 6s ease-in-out infinite;
    }

    .bg-decoration-1 {
      width: 300px;
      height: 300px;
      background: var(--primary-gradient);
      top: -150px;
      right: -150px;
      animation-delay: 0s;
    }

    .bg-decoration-2 {
      width: 200px;
      height: 200px;
      background: var(--secondary-gradient);
      bottom: -100px;
      left: -100px;
      animation-delay: 2s;
    }

    .bg-decoration-3 {
      width: 150px;
      height: 150px;
      background: var(--accent-gradient);
      top: 50%;
      right: 10%;
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    .loading-content {
      text-align: center;
      color: white;
      max-width: 400px;
      padding: 2rem;
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Logo section */
    .logo-container {
      position: relative;
      display: inline-block;
      margin-bottom: 2rem;
    }

    .loading-logo {
      width: 100px;
      height: 100px;
      border-radius: 24px;
      box-shadow: var(--shadow-light);
      border: 3px solid rgba(255, 255, 255, 0.2);
      animation: logoGlow 2s ease-in-out infinite alternate;
    }

    .logo-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: var(--primary-gradient);
      border-radius: 28px;
      opacity: 0.3;
      filter: blur(20px);
      z-index: -1;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes logoGlow {
      from { box-shadow: var(--shadow-light); }
      to { box-shadow: var(--shadow-light), var(--shadow-glow); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }

    /* Brand section */
    .brand-section {
      margin-bottom: 2.5rem;
    }

    .brand-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }

    .brand-subtitle {
      font-size: 1rem;
      color: #94a3b8;
      margin: 0;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Custom spinner */
    .loading-spinner-container {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
    }

    .custom-spinner {
      position: relative;
      width: 60px;
      height: 60px;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    .spinner-ring:nth-child(1) {
      border-top-color: #667eea;
      animation-duration: 2s;
    }

    .spinner-ring:nth-child(2) {
      border-right-color: #764ba2;
      animation-duration: 1.5s;
      animation-direction: reverse;
      width: 80%;
      height: 80%;
      top: 10%;
      left: 10%;
    }

    .spinner-ring:nth-child(3) {
      border-bottom-color: #f093fb;
      animation-duration: 1s;
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Loading text */
    .loading-text {
      margin-top: 1.5rem;
    }

    .loading-message {
      font-size: 1rem;
      color: #cbd5e1;
      margin: 0 0 1rem 0;
      font-weight: 500;
    }

    .loading-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }

    .loading-dots span {
      width: 8px;
      height: 8px;
      background: var(--primary-gradient);
      border-radius: 50%;
      animation: dotBounce 1.4s ease-in-out infinite both;
    }

    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes dotBounce {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1.2);
        opacity: 1;
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .loading-content {
        padding: 1rem;
        max-width: 300px;
      }

      .brand-title {
        font-size: 2rem;
      }

      .loading-logo {
        width: 80px;
        height: 80px;
      }

      .bg-decoration-1 {
        width: 200px;
        height: 200px;
      }

      .bg-decoration-2 {
        width: 150px;
        height: 150px;
      }

      .bg-decoration-3 {
        width: 100px;
        height: 100px;
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  selectedTab: string = 'dashboard';
  private subscription = new Subscription();
  private isInitialized = false;

  constructor(
    private firebaseService: FirebaseService,
    public authService: AuthService, // Made public for template access
    private router: Router
  ) {
    console.log('ErgoFit App initialized with proper routing and Firebase');
  }

  ngOnInit() {
    console.log('ErgoFit App - ngOnInit started');
    
    // Wait for authentication state to be determined
    this.subscription.add(
      this.authService.currentUser$.pipe(
        // Wait for the first non-undefined value (authentication state determined)
        filter(() => !this.isInitialized),
        take(1)
      ).subscribe(user => {
        this.isInitialized = true;
        
        if (user) {
          console.log('User is authenticated, redirecting to dashboard');
          // User is already logged in, redirect to dashboard if not already there
          if (this.router.url === '/' || this.router.url.startsWith('/auth') || this.router.url === '/get-started') {
            this.router.navigate(['/dashboard']);
          }
        } else {
          console.log('User is not authenticated, redirecting to get-started');
          // User is not logged in, redirect to get-started if not already there
          if (this.router.url === '/' || this.router.url.startsWith('/dashboard') || this.router.url.startsWith('/tabs')) {
            this.router.navigate(['/get-started']);
          }
        }
      })
    );
    
    // Log app initialization to Firebase Analytics
    this.firebaseService.logPageView('app_init');
  }

  ngOnDestroy() {
    console.log('ErgoFit App - ngOnDestroy called');
    this.subscription.unsubscribe();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    console.log('Tab changed to:', tab);
    // Log tab navigation to Firebase Analytics
    this.firebaseService.logPageView(tab);
  }

  onPostureCheck() {
    console.log('Posture check triggered from main app');
    // Log posture check event to Firebase Analytics
    this.firebaseService.logPostureEvent('posture_check_triggered', {
      source: 'main_app'
    });
  }

  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      'dashboard': 'ErgoFit Dashboard',
      'monitoring': 'Monitoring Postur',
      'analytics': 'Analitik & Laporan',
      'recommendations': 'Rekomendasi',
      'settings': 'Pengaturan'
    };
    return titles[this.selectedTab] || 'ErgoFit';
  }
}
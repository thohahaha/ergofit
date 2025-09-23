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
        <div class="loading-content">
          <img src="/assets/icon/favicon.png" alt="ErgoFit" class="loading-logo">
          <h2>ErgoFit</h2>
          <ion-spinner name="crescent" color="primary"></ion-spinner>
          <p>Loading...</p>
        </div>
      </div>
      <router-outlet *ngIf="!(authService.loading$ | async)"></router-outlet>
    </ion-app>
  `,
  styles: [`
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
    }
    
    .loading-content {
      text-align: center;
      color: white;
    }
    
    .loading-logo {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
      border-radius: 16px;
    }
    
    .loading-content h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px 0;
    }
    
    .loading-content p {
      font-size: 14px;
      opacity: 0.8;
      margin: 10px 0 0 0;
    }
    
    ion-spinner {
      --color: white;
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
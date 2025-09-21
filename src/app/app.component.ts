import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonApp } from '@ionic/angular/standalone';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonApp
  ],
  template: `
    <ion-app>
      <router-outlet></router-outlet>
    </ion-app>
  `,
  styles: [`
    ion-app {
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  selectedTab: string = 'dashboard';

  constructor(private firebaseService: FirebaseService) {
    console.log('ErgoFit App initialized with proper routing and Firebase');
  }

  ngOnInit() {
    console.log('ErgoFit App - ngOnInit started');
    // Log app initialization to Firebase Analytics
    this.firebaseService.logPageView('app_init');
  }

  ngOnDestroy() {
    console.log('ErgoFit App - ngOnDestroy called');
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
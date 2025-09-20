import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from './shared/components/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonApp,
    IonContent,
    NavbarComponent
  ],
  template: `
    <ion-app>
      <!-- Header with Navigation -->
      <app-navbar
        [selectedTab]="selectedTab"
        [pageTitle]="getPageTitle()"
        (tabChange)="onTabChange($event)"
        (postureCheck)="onPostureCheck()">
      </app-navbar>

      <!-- Router Outlet for Page Content -->
      <div class="router-content">
        <router-outlet></router-outlet>
      </div>
    </ion-app>
  `,
  styles: [`
    ion-app {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .router-content {
      padding-top: 60px;
      padding-bottom: 80px;
      min-height: 100vh;
      z-index: 1;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  selectedTab: string = 'dashboard';

  constructor() {
    console.log('ErgoFit App initialized with proper routing');
  }

  ngOnInit() {
    console.log('ErgoFit App - ngOnInit started');
  }

  ngOnDestroy() {
    console.log('ErgoFit App - ngOnDestroy called');
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    console.log('Tab changed to:', tab);
  }

  onPostureCheck() {
    console.log('Posture check triggered from main app');
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
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  appsOutline,
  bodyOutline,
  barChartOutline,
  heartOutline,
  settingsOutline,
  pulseOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonFab,
    IonFabButton
  ],
  template: `
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{pageTitle}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Tab Bar Navigation -->
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          (click)="navigateToPage('dashboard')"
          [class.tab-selected]="selectedTab === 'dashboard'">
          <ion-icon name="apps-outline"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>

        <ion-tab-button
          (click)="navigateToPage('monitoring')"
          [class.tab-selected]="selectedTab === 'monitoring'">
          <ion-icon name="body-outline"></ion-icon>
          <ion-label>Monitoring</ion-label>
        </ion-tab-button>

        <ion-tab-button
          (click)="navigateToPage('analytics')"
          [class.tab-selected]="selectedTab === 'analytics'">
          <ion-icon name="bar-chart-outline"></ion-icon>
          <ion-label>Analitik</ion-label>
        </ion-tab-button>

        <ion-tab-button
          (click)="navigateToPage('recommendations')"
          [class.tab-selected]="selectedTab === 'recommendations'">
          <ion-icon name="heart-outline"></ion-icon>
          <ion-label>Rekomendasi</ion-label>
        </ion-tab-button>

        <ion-tab-button
          (click)="navigateToPage('settings')"
          [class.tab-selected]="selectedTab === 'settings'">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>Pengaturan</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <!-- Floating Action Button -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button color="primary" (click)="onPostureCheck()">
        <ion-icon name="pulse-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  `,
  styles: [`
    :host {
      --ion-background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --ion-text-color: #ffffff;
      --ion-toolbar-background: rgba(103, 58, 183, 0.95);
      --ion-tab-bar-background: rgba(103, 58, 183, 0.98);
      --primary-purple: #6C63FF;
      --secondary-purple: #764ba2;
      --accent-purple: #9c88ff;
      --dark-purple: #4a148c;
      --light-purple: #e1bee7;
    }

    ion-header {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999 !important;
      width: 100%;
    }

    ion-toolbar {
      --background: rgba(103, 58, 183, 0.95);
      --color: white;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      height: 60px;
    }

    ion-title {
      font-weight: 600;
      font-size: 1.2rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .tab-selected {
      --color-selected: var(--accent-purple);
      --color: var(--accent-purple);
    }

    ion-tabs {
      position: fixed !important;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999 !important;
      width: 100%;
    }

    ion-tab-bar {
      --background: rgba(103, 58, 183, 0.98);
      backdrop-filter: blur(15px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      --color: rgba(255, 255, 255, 0.7);
      --color-selected: #ffffff;
      height: 80px;
    }

    ion-tab-button {
      --color: rgba(255, 255, 255, 0.7);
      --color-selected: #ffffff;
      transition: all 0.3s ease;
    }

    ion-tab-button:hover {
      --color: var(--accent-purple);
    }

    ion-fab-button {
      --background: linear-gradient(135deg, var(--primary-purple), var(--accent-purple));
      --color: white;
      --box-shadow: 0 8px 24px rgba(108, 99, 255, 0.4),
                    0 4px 8px rgba(0, 0, 0, 0.15);
      --border-radius: 50%;
      width: 64px;
      height: 64px;
      transition: all 0.3s ease;
    }

    ion-fab-button:hover {
      transform: scale(1.1);
    }

    ion-fab-button ion-icon {
      font-size: 1.5rem;
    }

    @media (max-width: 768px) {
      ion-fab-button {
        width: 56px;
        height: 56px;
      }

      ion-title {
        font-size: 1rem;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  @Input() selectedTab: string = 'dashboard';
  @Input() pageTitle: string = 'ErgoFit Dashboard';
  @Output() tabChange = new EventEmitter<string>();
  @Output() postureCheck = new EventEmitter<void>();

  constructor(private router: Router) {
    // Add icons to the icon registry
    addIcons({
      'apps-outline': appsOutline,
      'body-outline': bodyOutline,
      'bar-chart-outline': barChartOutline,
      'heart-outline': heartOutline,
      'settings-outline': settingsOutline,
      'pulse-outline': pulseOutline
    });
  }

  ngOnInit() {
    // Listen to route changes to update selected tab
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('/dashboard')) {
          this.selectedTab = 'dashboard';
        } else if (url.includes('/monitoring')) {
          this.selectedTab = 'monitoring';
        } else if (url.includes('/analytics')) {
          this.selectedTab = 'analytics';
        } else if (url.includes('/recommendations')) {
          this.selectedTab = 'recommendations';
        } else if (url.includes('/settings')) {
          this.selectedTab = 'settings';
        }
        this.tabChange.emit(this.selectedTab);
      }
    });
  }

  navigateToPage(tab: string) {
    this.router.navigate([`/${tab}`]);
  }

  onTabChange(tab: string) {
    this.tabChange.emit(tab);
  }

  onPostureCheck() {
    this.postureCheck.emit();
  }
}
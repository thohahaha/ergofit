import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  pulseOutline,
  barChartOutline,
  bulbOutline,
  settingsOutline,
  logOutOutline
} from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton
  ],
  template: `
    <ion-header class="ergofit-header">
      <ion-toolbar>
        <ion-title>ErgoFit</ion-title>
        <ion-button
          slot="end"
          fill="clear"
          class="logout-button"
          (click)="logout()">
          <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-tabs>
      <ion-tab-bar slot="bottom" class="ergofit-tab-bar">
        <ion-tab-button tab="dashboard">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="monitoring">
          <ion-icon name="pulse-outline"></ion-icon>
          <ion-label>Monitor</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="analytics">
          <ion-icon name="bar-chart-outline"></ion-icon>
          <ion-label>Analytics</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="recommendations">
          <ion-icon name="bulb-outline"></ion-icon>
          <ion-label>Saran</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>Pengaturan</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .ergofit-header {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999 !important;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      box-shadow: 0 4px 20px rgba(103, 58, 183, 0.4);
    }

    .ergofit-header ion-toolbar {
      --background: transparent;
      --color: white;
      backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      height: 60px;
      --min-height: 60px;
    }

    .ergofit-header ion-title {
      color: white;
      font-weight: 700;
      font-size: 1.3rem;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      letter-spacing: 0.5px;
    }

    .logout-button {
      --color: white;
      --background: rgba(255, 255, 255, 0.1);
      --border-radius: 50%;
      width: 40px;
      height: 40px;
      transition: all 0.3s ease;
    }

    .logout-button:hover {
      --background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }

    ion-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-top: 56px; /* Height of header */
    }

    ion-tabs router-outlet {
      flex: 1;
      padding-bottom: 56px; /* Height of tab bar */
    }

    ion-tab-bar {
      position: fixed !important;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999 !important;
      --background: rgba(103, 58, 183, 0.98);
      backdrop-filter: blur(15px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      --color: rgba(255, 255, 255, 0.7);
      --color-selected: #ffffff;
    }

    ion-tab-button {
      --color: rgba(255, 255, 255, 0.7);
      --color-selected: #ffffff;
      transition: all 0.3s ease;
    }

    ion-tab-button:hover {
      --color: var(--ergofit-accent);
    }
  `]
})
export class TabsPage {
  constructor(private authService: AuthService) {
    addIcons({
      'home-outline': homeOutline,
      'pulse-outline': pulseOutline,
      'bar-chart-outline': barChartOutline,
      'bulb-outline': bulbOutline,
      'settings-outline': settingsOutline,
      'log-out-outline': logOutOutline
    });
  }

  async logout() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
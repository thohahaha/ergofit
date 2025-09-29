import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  pulseOutline,
  barChartOutline,
  bulbOutline,
  settingsOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ],
  template: `

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

        <ion-tab-button tab="profile">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Profile</ion-label>
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

    ion-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    ion-tabs router-outlet {
      flex: 1;
      padding-bottom: 70px; /* Height of tab bar */
    }

    ion-tab-bar {
      position: fixed !important;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      --background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      --color: #64748b;
      --color-selected: #3b82f6;
      height: 70px;
      box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.08);
    }

    ion-tab-button {
      --color: #64748b;
      --color-selected: #3b82f6;
      transition: all 0.2s ease;
      --ripple-color: rgba(59, 130, 246, 0.2);
      font-size: 0.75rem;
      font-weight: 500;
    }

    ion-tab-button:hover {
      --color: #3b82f6;
    }

    ion-tab-button.tab-selected {
      --color: #3b82f6;
      font-weight: 600;
    }

    ion-tab-button ion-icon {
      font-size: 1.3rem;
      margin-bottom: 2px;
    }

    ion-tab-button ion-label {
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
  `]
})
export class TabsPage {
  constructor() {
    addIcons({
      'home-outline': homeOutline,
      'pulse-outline': pulseOutline,
      'bar-chart-outline': barChartOutline,
      'bulb-outline': bulbOutline,
      'settings-outline': settingsOutline,
      'person-outline': personOutline
    });
  }
}
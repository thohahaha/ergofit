import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonRange,
    IonButton
  ],
  template: `
    <ion-content class="ergofit-content" [fullscreen]="true">
      <!-- Pengaturan Aplikasi -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Pengaturan Aplikasi</h3>
        </div>
        <div class="ergofit-card-content">
          <ion-list>
            <ion-item>
              <ion-label>Notifikasi Postur</ion-label>
              <ion-toggle [(ngModel)]="notificationsEnabled" slot="end"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Suara Peringatan</ion-label>
              <ion-toggle [(ngModel)]="soundEnabled" slot="end"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Mode Gelap</ion-label>
              <ion-toggle [(ngModel)]="darkModeEnabled" slot="end"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Interval Peringatan (menit)</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="reminderInterval"
                placeholder="30"
                class="settings-input">
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Sensitivitas Deteksi</ion-label>
              <ion-range
                min="1"
                max="10"
                [(ngModel)]="sensitivity"
                pin="true"
                class="sensitivity-range">
                <ion-label slot="start">Rendah</ion-label>
                <ion-label slot="end">Tinggi</ion-label>
              </ion-range>
            </ion-item>

            <ion-item>
              <ion-label>Bahasa</ion-label>
              <ion-select [(ngModel)]="selectedLanguage" placeholder="Pilih Bahasa">
                <ion-select-option value="id">Bahasa Indonesia</ion-select-option>
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="ms">Bahasa Melayu</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>
      </div>

      <!-- Profil Pengguna -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Profil Pengguna</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="profile-form">
            <ion-item>
              <ion-label position="stacked">Nama</ion-label>
              <ion-input
                [(ngModel)]="userProfile.name"
                placeholder="Masukkan nama Anda"
                class="profile-input">
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                type="email"
                [(ngModel)]="userProfile.email"
                placeholder="Masukkan email Anda"
                class="profile-input">
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Tinggi Badan (cm)</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="userProfile.height"
                placeholder="170"
                class="profile-input">
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Berat Badan (kg)</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="userProfile.weight"
                placeholder="70"
                class="profile-input">
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Jenis Pekerjaan</ion-label>
              <ion-select [(ngModel)]="userProfile.workType" placeholder="Pilih Jenis Pekerjaan">
                <ion-select-option value="office">Pekerja Kantoran</ion-select-option>
                <ion-select-option value="remote">Pekerja Remote</ion-select-option>
                <ion-select-option value="hybrid">Hybrid</ion-select-option>
                <ion-select-option value="student">Mahasiswa</ion-select-option>
              </ion-select>
            </ion-item>
          </div>

          <div class="save-button-container">
            <ion-button expand="block" fill="solid" (click)="saveSettings()" class="save-button">
              Simpan Pengaturan
            </ion-button>
          </div>
        </div>
      </div>

      <!-- Data & Privacy -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Data & Privasi</h3>
        </div>
        <div class="ergofit-card-content">
          <ion-list>
            <ion-item>
              <ion-label>Sinkronisasi Cloud</ion-label>
              <ion-toggle [(ngModel)]="cloudSyncEnabled" slot="end"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Analitik Penggunaan</ion-label>
              <ion-toggle [(ngModel)]="analyticsEnabled" slot="end"></ion-toggle>
            </ion-item>

            <ion-item button (click)="exportData()">
              <ion-label>
                <h3>Export Data</h3>
                <p>Unduh data postur Anda</p>
              </ion-label>
            </ion-item>

            <ion-item button (click)="clearData()">
              <ion-label color="danger">
                <h3>Hapus Semua Data</h3>
                <p>Menghapus riwayat postur dan pengaturan</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>

      <!-- About -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Tentang Aplikasi</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="about-info">
            <div class="app-info">
              <h3>ErgoFit v1.0.0</h3>
              <p>Aplikasi monitoring postur ergonomis untuk produktivitas yang lebih sehat</p>
            </div>

            <div class="ergofit-grid ergofit-grid-2">
              <div class="stat-item">
                <h4>{{totalSessions}}</h4>
                <p>Sesi Monitoring</p>
              </div>
              <div class="stat-item">
                <h4>{{daysUsed}}</h4>
                <p>Hari Penggunaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--ergofit-background) !important;
    }

    ion-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
    }

    ion-content::part(background) {
      background: var(--ergofit-background) !important;
    }

    ion-content::part(scroll) {
      background: var(--ergofit-background) !important;
    }

    /* Force card backgrounds to be white */
    .ergofit-card,
    div.ergofit-card,
    ion-content .ergofit-card {
      background: white !important;
      background-color: white !important;
    }

    .ergofit-card-title,
    .ergofit-card h3 {
      color: var(--ergofit-primary) !important;
    }

    ion-list {
      background: transparent;
    }

    ion-item {
      --background: var(--ergofit-card-background-alt);
      --border-color: rgba(103, 58, 183, 0.1);
      border-radius: var(--ergofit-spacing-sm);
      margin: var(--ergofit-spacing-sm) 0;
      backdrop-filter: blur(10px);
    }

    ion-toggle {
      --track-background: rgba(103, 58, 183, 0.3);
      --track-background-checked: var(--ergofit-primary);
      --handle-background: white;
      --handle-background-checked: white;
    }

    .sensitivity-range {
      --bar-background: rgba(103, 58, 183, 0.3);
      --bar-background-active: var(--ergofit-primary);
      --knob-background: var(--ergofit-primary);
    }

    ion-select {
      --placeholder-color: #666;
      --color: #333;
    }

    .settings-input,
    .profile-input {
      --color: #333;
      --placeholder-color: #666;
    }

    .profile-form {
      margin-bottom: var(--ergofit-spacing-lg);
    }

    .save-button-container {
      margin-top: var(--ergofit-spacing-lg);
    }

    .save-button {
      --background: linear-gradient(135deg, var(--ergofit-primary), var(--ergofit-accent));
      --color: white;
      --border-radius: var(--ergofit-card-radius-sm);
      --box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
      font-weight: 600;
      text-transform: none;
      height: 48px;
      font-size: var(--ergofit-font-size-md);
      transition: all 0.3s ease;
    }

    .save-button:hover {
      transform: translateY(-2px);
      --box-shadow: 0 6px 20px rgba(108, 99, 255, 0.4);
    }

    .about-info {
      text-align: center;
    }

    .app-info h3 {
      color: var(--ergofit-primary);
      font-weight: 600;
      margin: 0 0 var(--ergofit-spacing-sm) 0;
      font-size: var(--ergofit-font-size-lg);
    }

    .app-info p {
      opacity: 0.8;
      line-height: 1.4;
      margin: 0 0 var(--ergofit-spacing-lg) 0;
    }

    .stat-item {
      text-align: center;
      padding: var(--ergofit-spacing-md);
      background: rgba(108, 99, 255, 0.1);
      border-radius: var(--ergofit-card-radius-sm);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(108, 99, 255, 0.2);
    }

    .stat-item h4 {
      font-size: var(--ergofit-font-size-xl);
      font-weight: 700;
      margin: 0 0 var(--ergofit-spacing-xs) 0;
      color: var(--ergofit-primary);
    }

    .stat-item p {
      font-size: var(--ergofit-font-size-sm);
      margin: 0;
      opacity: 0.8;
    }

    @media (max-width: 480px) {
      .stat-item {
        padding: var(--ergofit-spacing-sm);
      }

      .stat-item h4 {
        font-size: var(--ergofit-font-size-lg);
      }
    }
  `]
})
export class SettingsComponent implements OnInit {
  // Settings Properties
  notificationsEnabled: boolean = true;
  soundEnabled: boolean = true;
  darkModeEnabled: boolean = false;
  selectedLanguage: string = 'id';
  reminderInterval: number = 30;
  sensitivity: number = 7;
  cloudSyncEnabled: boolean = false;
  analyticsEnabled: boolean = true;

  // User Profile
  userProfile = {
    name: '',
    email: '',
    height: 0,
    weight: 0,
    workType: 'office'
  };

  // App Stats
  totalSessions: number = 42;
  daysUsed: number = 14;

  constructor() {}

  ngOnInit() {
    this.loadUserSettings();
  }


  saveSettings() {
    const settings = {
      notificationsEnabled: this.notificationsEnabled,
      soundEnabled: this.soundEnabled,
      darkModeEnabled: this.darkModeEnabled,
      selectedLanguage: this.selectedLanguage,
      reminderInterval: this.reminderInterval,
      sensitivity: this.sensitivity,
      cloudSyncEnabled: this.cloudSyncEnabled,
      analyticsEnabled: this.analyticsEnabled
    };

    localStorage.setItem('ergofit-settings', JSON.stringify(settings));
    localStorage.setItem('ergofit-profile', JSON.stringify(this.userProfile));

    console.log('Settings saved:', settings);
    console.log('Profile saved:', this.userProfile);

    // Show success message (you can implement toast notification here)
    alert('Pengaturan berhasil disimpan!');
  }

  loadUserSettings() {
    // Load user settings from local storage
    const savedSettings = localStorage.getItem('ergofit-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.notificationsEnabled = settings.notificationsEnabled ?? true;
      this.soundEnabled = settings.soundEnabled ?? true;
      this.darkModeEnabled = settings.darkModeEnabled ?? false;
      this.selectedLanguage = settings.selectedLanguage ?? 'id';
      this.reminderInterval = settings.reminderInterval ?? 30;
      this.sensitivity = settings.sensitivity ?? 7;
      this.cloudSyncEnabled = settings.cloudSyncEnabled ?? false;
      this.analyticsEnabled = settings.analyticsEnabled ?? true;
    }

    // Load user profile
    const savedProfile = localStorage.getItem('ergofit-profile');
    if (savedProfile) {
      this.userProfile = { ...this.userProfile, ...JSON.parse(savedProfile) };
    }
  }

  exportData() {
    const data = {
      settings: {
        notificationsEnabled: this.notificationsEnabled,
        soundEnabled: this.soundEnabled,
        darkModeEnabled: this.darkModeEnabled,
        selectedLanguage: this.selectedLanguage,
        reminderInterval: this.reminderInterval,
        sensitivity: this.sensitivity
      },
      profile: this.userProfile,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ergofit-data-export.json';
    link.click();
    URL.revokeObjectURL(url);

    console.log('Data exported successfully');
  }

  clearData() {
    const confirmed = confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.');
    if (confirmed) {
      localStorage.removeItem('ergofit-settings');
      localStorage.removeItem('ergofit-profile');

      // Reset to default values
      this.notificationsEnabled = true;
      this.soundEnabled = true;
      this.darkModeEnabled = false;
      this.selectedLanguage = 'id';
      this.reminderInterval = 30;
      this.sensitivity = 7;
      this.cloudSyncEnabled = false;
      this.analyticsEnabled = true;

      this.userProfile = {
        name: '',
        email: '',
        height: 0,
        weight: 0,
        workType: 'office'
      };

      console.log('All data cleared');
      alert('Semua data berhasil dihapus!');
    }
  }
}
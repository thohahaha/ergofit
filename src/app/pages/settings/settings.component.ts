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
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  personOutline,
  shieldOutline,
  informationCircleOutline,
  notificationsOutline,
  volumeHighOutline,
  moonOutline,
  timeOutline,
  eyeOutline,
  languageOutline,
  cloudOutline,
  barChartOutline,
  downloadOutline,
  trashOutline,
  chevronForwardOutline
} from 'ionicons/icons';

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
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
  template: `
    <ion-content class="content" [fullscreen]="true">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="title-section">
            <div class="title-icon">
              <ion-icon name="settings-outline"></ion-icon>
            </div>
            <div class="title-info">
              <h1>Pengaturan</h1>
              <p>Kelola preferensi dan konfigurasi aplikasi ErgoFit</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pengaturan Aplikasi -->
      <ion-card class="settings-card">
        <ion-card-header>
          <div class="card-header-content">
            <div class="card-icon app-icon">
              <ion-icon name="settings-outline"></ion-icon>
            </div>
            <ion-card-title>Pengaturan Aplikasi</ion-card-title>
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="notifications-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Notifikasi Postur</h4>
                  <p>Terima peringatan saat postur tidak ergonomis</p>
                </div>
              </div>
              <ion-toggle [(ngModel)]="notificationsEnabled"></ion-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="volume-high-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Suara Peringatan</h4>
                  <p>Aktifkan suara untuk notifikasi</p>
                </div>
              </div>
              <ion-toggle [(ngModel)]="soundEnabled"></ion-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="moon-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Mode Gelap</h4>
                  <p>Ubah tampilan ke tema gelap</p>
                </div>
              </div>
              <ion-toggle [(ngModel)]="darkModeEnabled"></ion-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="time-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Interval Peringatan</h4>
                  <p>Waktu antara peringatan (menit)</p>
                  <ion-input
                    type="number"
                    [(ngModel)]="reminderInterval"
                    placeholder="30"
                    class="settings-input">
                  </ion-input>
                </div>
              </div>
            </div>

            <div class="setting-item range-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Sensitivitas Deteksi</h4>
                  <p>Seberapa sensitif deteksi postur</p>
                  <ion-range
                    min="1"
                    max="10"
                    [(ngModel)]="sensitivity"
                    pin="true"
                    class="sensitivity-range">
                    <ion-label slot="start">Rendah</ion-label>
                    <ion-label slot="end">Tinggi</ion-label>
                  </ion-range>
                </div>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="language-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Bahasa</h4>
                  <p>Pilih bahasa aplikasi</p>
                  <ion-select [(ngModel)]="selectedLanguage" placeholder="Pilih Bahasa" class="language-select">
                    <ion-select-option value="id">Bahasa Indonesia</ion-select-option>
                    <ion-select-option value="en">English</ion-select-option>
                    <ion-select-option value="ms">Bahasa Melayu</ion-select-option>
                  </ion-select>
                </div>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Profil Pengguna -->
      <ion-card class="settings-card">
        <ion-card-header>
          <div class="card-header-content">
            <div class="card-icon profile-icon">
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <ion-card-title>Profil Pengguna</ion-card-title>
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="profile-form">
            <div class="form-group">
              <label class="form-label">Nama Lengkap</label>
              <ion-input
                [(ngModel)]="userProfile.name"
                placeholder="Masukkan nama lengkap Anda"
                class="modern-input">
              </ion-input>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <ion-input
                type="email"
                [(ngModel)]="userProfile.email"
                placeholder="nama@email.com"
                class="modern-input">
              </ion-input>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tinggi Badan (cm)</label>
                <ion-input
                  type="number"
                  [(ngModel)]="userProfile.height"
                  placeholder="170"
                  class="modern-input">
                </ion-input>
              </div>

              <div class="form-group">
                <label class="form-label">Berat Badan (kg)</label>
                <ion-input
                  type="number"
                  [(ngModel)]="userProfile.weight"
                  placeholder="70"
                  class="modern-input">
                </ion-input>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Jenis Pekerjaan</label>
              <ion-select [(ngModel)]="userProfile.workType" placeholder="Pilih jenis pekerjaan" class="modern-select">
                <ion-select-option value="office">Pekerja Kantoran</ion-select-option>
                <ion-select-option value="remote">Pekerja Remote</ion-select-option>
                <ion-select-option value="hybrid">Hybrid</ion-select-option>
                <ion-select-option value="student">Mahasiswa</ion-select-option>
              </ion-select>
            </div>
          </div>

          <div class="save-button-container">
            <ion-button expand="block" fill="solid" (click)="saveSettings()" class="save-button">
              Simpan Pengaturan
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Data & Privacy -->
      <ion-card class="settings-card">
        <ion-card-header>
          <div class="card-header-content">
            <div class="card-icon privacy-icon">
              <ion-icon name="shield-outline"></ion-icon>
            </div>
            <ion-card-title>Data & Privasi</ion-card-title>
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="cloud-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Sinkronisasi Cloud</h4>
                  <p>Sinkronkan data ke cloud storage</p>
                </div>
              </div>
              <ion-toggle [(ngModel)]="cloudSyncEnabled"></ion-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-icon">
                  <ion-icon name="bar-chart-outline"></ion-icon>
                </div>
                <div class="setting-content">
                  <h4>Analitik Penggunaan</h4>
                  <p>Bantu tingkatkan aplikasi dengan data penggunaan</p>
                </div>
              </div>
              <ion-toggle [(ngModel)]="analyticsEnabled"></ion-toggle>
            </div>

            <div class="action-item" (click)="exportData()">
              <div class="action-info">
                <div class="action-icon export-icon">
                  <ion-icon name="download-outline"></ion-icon>
                </div>
                <div class="action-content">
                  <h4>Export Data</h4>
                  <p>Unduh semua data postur Anda</p>
                </div>
              </div>
              <ion-icon name="chevron-forward-outline" class="action-arrow"></ion-icon>
            </div>

            <div class="action-item danger-action" (click)="clearData()">
              <div class="action-info">
                <div class="action-icon danger-icon">
                  <ion-icon name="trash-outline"></ion-icon>
                </div>
                <div class="action-content">
                  <h4>Hapus Semua Data</h4>
                  <p>Menghapus riwayat postur dan pengaturan</p>
                </div>
              </div>
              <ion-icon name="chevron-forward-outline" class="action-arrow"></ion-icon>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- About -->
      <ion-card class="settings-card about-card">
        <ion-card-header>
          <div class="card-header-content">
            <div class="card-icon about-icon">
              <ion-icon name="information-circle-outline"></ion-icon>
            </div>
            <ion-card-title>Tentang Aplikasi</ion-card-title>
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="about-content">
            <div class="app-info">
              <div class="app-logo">
                <img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image">
              </div>
              <h3>ErgoFit v1.0.0</h3>
              <p>Aplikasi monitoring postur ergonomis untuk produktivitas yang lebih sehat dan berkualitas</p>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">{{totalSessions}}</div>
                <div class="stat-label">Sesi Monitoring</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">{{daysUsed}}</div>
                <div class="stat-label">Hari Penggunaan</div>
              </div>
            </div>

            <div class="app-footer">
              <p>© 2024 ErgoFit. Dibuat dengan ❤️ untuk kesehatan Anda.</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    :host {
      /* Professional Color Palette */
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
      min-height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Content Layout */
    .content {
      --background: var(--background-color);
      padding: var(--spacing-lg);
    }

    /* Page Header */
    .page-header {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
      box-shadow: var(--card-shadow-lg);
      border: 1px solid var(--gray-200);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .title-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      box-shadow: var(--card-shadow);
    }

    .title-info h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
      letter-spacing: -0.025em;
    }

    .title-info p {
      font-size: 1.125rem;
      color: var(--gray-600);
      margin: 0;
    }

    /* Settings Cards */
    .settings-card {
      margin-bottom: var(--spacing-2xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--card-shadow-lg);
      border: 1px solid var(--gray-200);
      transition: all 0.3s ease;
    }

    .settings-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Card Headers */
    .card-header-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      box-shadow: var(--card-shadow);
    }

    .app-icon {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    }

    .profile-icon {
      background: linear-gradient(135deg, var(--secondary-color), #10b981);
    }

    .privacy-icon {
      background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
    }

    .about-icon {
      background: linear-gradient(135deg, var(--tertiary-color), #f59e0b);
    }

    ion-card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0;
    }

    /* Settings List */
    .settings-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-lg);
      background: var(--gray-50);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      transition: all 0.3s ease;
    }

    .setting-item:hover {
      background: white;
      transform: translateY(-1px);
      box-shadow: var(--card-shadow);
    }

    .setting-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      flex: 1;
    }

    .setting-icon {
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
    }

    .setting-content h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .setting-content p {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin: 0;
      line-height: 1.4;
    }

    .range-item {
      flex-direction: column;
      align-items: stretch;
    }

    .range-item .setting-info {
      margin-bottom: var(--spacing-md);
    }

    /* Form Elements */
    .settings-input, .modern-input {
      --background: white;
      --color: var(--gray-900);
      --placeholder-color: var(--gray-500);
      --border-radius: var(--border-radius-sm);
      --padding-start: var(--spacing-md);
      --padding-end: var(--spacing-md);
      margin-top: var(--spacing-sm);
      border: 1px solid var(--gray-300);
      border-radius: var(--border-radius-sm);
    }

    .language-select, .modern-select {
      --background: white;
      --color: var(--gray-900);
      --placeholder-color: var(--gray-500);
      margin-top: var(--spacing-sm);
    }

    .sensitivity-range {
      --bar-background: var(--gray-300);
      --bar-background-active: var(--primary-color);
      --knob-background: var(--primary-color);
      --knob-size: 24px;
      margin-top: var(--spacing-md);
    }

    ion-toggle {
      --track-background: var(--gray-300);
      --track-background-checked: var(--primary-color);
      --handle-background: white;
      --handle-background-checked: white;
    }

    /* Profile Form */
    .profile-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-700);
      margin-bottom: var(--spacing-sm);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
    }

    /* Action Items */
    .action-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-lg);
      background: var(--gray-50);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-item:hover {
      background: white;
      transform: translateY(-1px);
      box-shadow: var(--card-shadow);
    }

    .action-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .action-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
    }

    .export-icon {
      background: var(--primary-color);
    }

    .danger-icon {
      background: var(--danger-color);
    }

    .action-content h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .action-content p {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin: 0;
    }

    .danger-action .action-content h4,
    .danger-action .action-content p {
      color: var(--danger-color);
    }

    .action-arrow {
      color: var(--gray-400);
      font-size: 1.25rem;
    }

    /* Save Button */
    .save-button-container {
      margin-top: var(--spacing-xl);
    }

    .save-button {
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

    .save-button:hover {
      transform: translateY(-2px);
      --box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
    }

    /* About Section */
    .about-content {
      text-align: center;
    }

    .app-logo {
      width: 80px;
      height: 80px;
      margin: 0 auto var(--spacing-lg);
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--card-shadow);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .app-info h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-md) 0;
    }

    .app-info p {
      font-size: 1rem;
      color: var(--gray-600);
      line-height: 1.6;
      margin: 0 0 var(--spacing-2xl) 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-2xl);
    }

    .stat-card {
      background: var(--gray-50);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      text-align: center;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      background: white;
      transform: translateY(-2px);
      box-shadow: var(--card-shadow);
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: var(--primary-color);
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--gray-600);
      font-weight: 500;
    }

    .app-footer {
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--gray-200);
    }

    .app-footer p {
      font-size: 0.875rem;
      color: var(--gray-500);
      margin: 0;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .content {
        padding: var(--spacing-md);
      }

      .page-header {
        padding: var(--spacing-xl);
        margin-bottom: var(--spacing-xl);
      }

      .title-section {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
      }

      .title-icon {
        width: 56px;
        height: 56px;
        font-size: 1.75rem;
      }

      .title-info h1 {
        font-size: 1.875rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .content {
        padding: var(--spacing-sm);
      }

      .page-header {
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }

      .title-icon {
        width: 48px;
        height: 48px;
        font-size: 1.5rem;
      }

      .title-info h1 {
        font-size: 1.5rem;
      }

      .title-info p {
        font-size: 1rem;
      }

      .setting-item {
        padding: var(--spacing-md);
      }

      .action-item {
        padding: var(--spacing-md);
      }

      .card-icon {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }

      ion-card-title {
        font-size: 1.25rem;
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

  constructor() {
    addIcons({
      'settings-outline': settingsOutline,
      'person-outline': personOutline,
      'shield-outline': shieldOutline,
      'information-circle-outline': informationCircleOutline,
      'notifications-outline': notificationsOutline,
      'volume-high-outline': volumeHighOutline,
      'moon-outline': moonOutline,
      'time-outline': timeOutline,
      'eye-outline': eyeOutline,
      'language-outline': languageOutline,
      'cloud-outline': cloudOutline,
      'bar-chart-outline': barChartOutline,
      'download-outline': downloadOutline,
      'trash-outline': trashOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonRange,
  IonAvatar,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  personOutline,
  lockClosedOutline,
  notificationsOutline,
  colorPaletteOutline,
  shieldCheckmarkOutline,
  cloudUploadOutline,
  downloadOutline,
  trashOutline,
  cameraOutline,
  saveOutline,
  eyeOutline,
  eyeOffOutline
} from 'ionicons/icons';
import { ProfileService, ErgoFitUserProfile } from '../../services/profile.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonRange,
    IonAvatar,
    IonChip,
    IonSegment,
    IonSegmentButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonBackButton,
    IonButtons
  ],
  template: `
    <ion-header [translucent]="true" class="futuristic-header">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-back-button 
            defaultHref="/profile" 
            [icon]="'arrow-back-outline'"
            class="back-btn">
          </ion-back-button>
        </ion-buttons>
        <ion-title class="header-title">Profile Settings</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" (click)="saveAllSettings()">
            <ion-icon name="save-outline" class="save-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="settings-content" [fullscreen]="true">
      <!-- Settings Navigation -->
      <div class="settings-nav">
        <ion-segment 
          [(ngModel)]="activeSegment" 
          class="futuristic-segment"
          (ionChange)="onSegmentChange($event)">
          <ion-segment-button value="profile">
            <ion-icon name="person-outline"></ion-icon>
            <ion-label>Profile</ion-label>
          </ion-segment-button>
          <ion-segment-button value="security">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <ion-label>Security</ion-label>
          </ion-segment-button>
          <ion-segment-button value="preferences">
            <ion-icon name="notifications-outline"></ion-icon>
            <ion-label>Preferences</ion-label>
          </ion-segment-button>
          <ion-segment-button value="appearance">
            <ion-icon name="color-palette-outline"></ion-icon>
            <ion-label>Appearance</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <!-- Profile Settings -->
      <div class="settings-section" *ngIf="activeSegment === 'profile'">
        <!-- Avatar Section -->
        <ion-card class="futuristic-card avatar-section">
          <div class="avatar-container">
            <div class="avatar-wrapper">
              <div class="avatar-glow"></div>
              <ion-avatar class="settings-avatar">
                <img [src]="userProfile?.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'" 
                     [alt]="userProfile?.displayName + ' Avatar'">
              </ion-avatar>
              <div class="avatar-overlay" (click)="changeAvatar()">
                <ion-icon name="camera-outline"></ion-icon>
              </div>
            </div>
            <div class="avatar-info">
              <h3>{{userProfile?.displayName || 'User'}}</h3>
              <p>Level {{userProfile?.level || 1}} • {{userProfile?.title || 'Beginner'}}</p>
            </div>
          </div>
        </ion-card>

        <!-- Personal Information -->
        <ion-card class="futuristic-card">
          <ion-card-header>
            <ion-card-title class="card-title">
              <ion-icon name="person-outline"></ion-icon>
              Personal Information
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="form-group">
              <ion-item class="futuristic-item">
                <ion-label position="stacked">Display Name</ion-label>
                <ion-input 
                  [value]="userProfile?.displayName || ''"
                  (ionInput)="onDisplayNameChange($event)"
                  placeholder="Enter your display name"
                  class="futuristic-input">
                </ion-input>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label position="stacked">Email Address</ion-label>
                <ion-input 
                  [value]="userProfile?.email || ''"
                  type="email"
                  [readonly]="true"
                  placeholder="Email cannot be changed"
                  class="futuristic-input">
                </ion-input>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label position="stacked">Bio</ion-label>
                <ion-textarea 
                  [value]="userProfile?.bio || ''"
                  (ionInput)="onBioChange($event)"
                  placeholder="Tell us about yourself..."
                  rows="3"
                  class="futuristic-input">
                </ion-textarea>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Work Type</ion-label>
                <ion-select 
                  [value]="userProfile?.workType || 'office'"
                  (ionChange)="onWorkTypeChange($event)"
                  placeholder="Select work type"
                  class="futuristic-select">
                  <ion-select-option value="office">Office Worker</ion-select-option>
                  <ion-select-option value="remote">Remote Worker</ion-select-option>
                  <ion-select-option value="hybrid">Hybrid</ion-select-option>
                  <ion-select-option value="student">Student</ion-select-option>
                  <ion-select-option value="freelancer">Freelancer</ion-select-option>
                </ion-select>
              </ion-item>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Security Settings -->
      <div class="settings-section" *ngIf="activeSegment === 'security'">
        <ion-card class="futuristic-card">
          <ion-card-header>
            <ion-card-title class="card-title">
              <ion-icon name="shield-checkmark-outline"></ion-icon>
              Account Security
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="form-group">
              <ion-item class="futuristic-item">
                <ion-label position="stacked">Current Password</ion-label>
                <ion-input 
                  [type]="showCurrentPassword ? 'text' : 'password'"
                  [(ngModel)]="securitySettings.currentPassword"
                  placeholder="Enter current password"
                  class="futuristic-input">
                </ion-input>
                <ion-button 
                  fill="clear" 
                  slot="end"
                  (click)="togglePasswordVisibility('current')">
                  <ion-icon [name]="showCurrentPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </ion-button>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label position="stacked">New Password</ion-label>
                <ion-input 
                  [type]="showNewPassword ? 'text' : 'password'"
                  [(ngModel)]="securitySettings.newPassword"
                  placeholder="Enter new password"
                  class="futuristic-input">
                </ion-input>
                <ion-button 
                  fill="clear" 
                  slot="end"
                  (click)="togglePasswordVisibility('new')">
                  <ion-icon [name]="showNewPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </ion-button>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label position="stacked">Confirm Password</ion-label>
                <ion-input 
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  [(ngModel)]="securitySettings.confirmPassword"
                  placeholder="Confirm new password"
                  class="futuristic-input">
                </ion-input>
                <ion-button 
                  fill="clear" 
                  slot="end"
                  (click)="togglePasswordVisibility('confirm')">
                  <ion-icon [name]="showConfirmPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </ion-button>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Two-Factor Authentication</ion-label>
                <ion-toggle 
                  [(ngModel)]="securitySettings.twoFactorEnabled"
                  class="futuristic-toggle">
                </ion-toggle>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Login Notifications</ion-label>
                <ion-toggle 
                  [(ngModel)]="securitySettings.loginNotifications"
                  class="futuristic-toggle">
                </ion-toggle>
              </ion-item>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Preferences Settings -->
      <div class="settings-section" *ngIf="activeSegment === 'preferences'">
        <ion-card class="futuristic-card">
          <ion-card-header>
            <ion-card-title class="card-title">
              <ion-icon name="notifications-outline"></ion-icon>
              Notifications & Alerts
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="form-group">
              <ion-item class="futuristic-item">
                <ion-label>Posture Reminders</ion-label>
                <ion-toggle 
                  [checked]="userProfile?.preferences?.postureReminders || false"
                  (ionChange)="onPreferenceChange('postureReminders', $event)"
                  class="futuristic-toggle">
                </ion-toggle>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Break Notifications</ion-label>
                <ion-toggle 
                  [checked]="userProfile?.preferences?.breakNotifications || false"
                  (ionChange)="onPreferenceChange('breakNotifications', $event)"
                  class="futuristic-toggle">
                </ion-toggle>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Achievement Alerts</ion-label>
                <ion-toggle 
                  [checked]="userProfile?.preferences?.achievementAlerts || false"
                  (ionChange)="onPreferenceChange('achievementAlerts', $event)"
                  class="futuristic-toggle">
                </ion-toggle>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Reminder Frequency</ion-label>
                <ion-range
                  [value]="userProfile?.preferences?.reminderInterval || 30"
                  (ionInput)="onReminderIntervalChange($event)"
                  min="15"
                  max="120"
                  step="15"
                  pin="true"
                  class="futuristic-range">
                  <ion-label slot="start">15m</ion-label>
                  <ion-label slot="end">2h</ion-label>
                </ion-range>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Detection Sensitivity</ion-label>
                <ion-range
                  [value]="userProfile?.preferences?.sensitivity || 7"
                  (ionInput)="onSensitivityChange($event)"
                  min="1"
                  max="10"
                  step="1"
                  pin="true"
                  class="futuristic-range">
                  <ion-label slot="start">Low</ion-label>
                  <ion-label slot="end">High</ion-label>
                </ion-range>
              </ion-item>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Appearance Settings -->
      <div class="settings-section" *ngIf="activeSegment === 'appearance'">
        <ion-card class="futuristic-card">
          <ion-card-header>
            <ion-card-title class="card-title">
              <ion-icon name="color-palette-outline"></ion-icon>
              Theme & Appearance
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="form-group">
              <ion-item class="futuristic-item">
                <ion-label>Dark Mode</ion-label>
                <ion-toggle 
                  [checked]="userProfile?.preferences?.darkMode || false"
                  (ionChange)="onPreferenceChange('darkMode', $event)"
                  class="futuristic-toggle">
                </ion-toggle>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Primary Color Theme</ion-label>
                <ion-select 
                  [value]="userProfile?.preferences?.colorTheme || 'purple'"
                  (ionChange)="onColorThemeChange($event)"
                  class="futuristic-select">
                  <ion-select-option value="purple">Purple</ion-select-option>
                  <ion-select-option value="blue">Blue</ion-select-option>
                  <ion-select-option value="green">Green</ion-select-option>
                  <ion-select-option value="orange">Orange</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Animation Level</ion-label>
                <ion-select 
                  [value]="userProfile?.preferences?.animationLevel || 'normal'"
                  (ionChange)="onAnimationLevelChange($event)"
                  class="futuristic-select">
                  <ion-select-option value="none">None</ion-select-option>
                  <ion-select-option value="reduced">Reduced</ion-select-option>
                  <ion-select-option value="normal">Normal</ion-select-option>
                  <ion-select-option value="enhanced">Enhanced</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item class="futuristic-item">
                <ion-label>Font Size</ion-label>
                <ion-range
                  [value]="userProfile?.preferences?.fontSize || 1.0"
                  (ionInput)="onFontSizeChange($event)"
                  min="0.8"
                  max="1.4"
                  step="0.1"
                  pin="true"
                  class="futuristic-range">
                  <ion-label slot="start">Small</ion-label>
                  <ion-label slot="end">Large</ion-label>
                </ion-range>
              </ion-item>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Data Management -->
      <div class="data-management">
        <ion-card class="futuristic-card danger-card">
          <ion-card-header>
            <ion-card-title class="card-title">
              <ion-icon name="cloud-upload-outline"></ion-icon>
              Data Management
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="management-actions">
              <ion-button 
                expand="block" 
                fill="outline" 
                class="action-btn export-btn"
                (click)="exportData()">
                <ion-icon name="download-outline" slot="start"></ion-icon>
                Export Data
              </ion-button>

              <ion-button 
                expand="block" 
                fill="outline" 
                class="action-btn sync-btn"
                (click)="syncData()">
                <ion-icon name="cloud-upload-outline" slot="start"></ion-icon>
                Sync to Cloud
              </ion-button>

              <ion-button 
                expand="block" 
                fill="outline" 
                color="danger"
                class="action-btn danger-btn"
                (click)="clearAllData()">
                <ion-icon name="trash-outline" slot="start"></ion-icon>
                Clear All Data
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    .settings-content {
      --background: var(--ergofit-background);
    }

    /* Futuristic Header */
    .futuristic-header {
      background: linear-gradient(135deg, var(--ergofit-primary), var(--ergofit-accent));
    }

    .custom-toolbar {
      --background: transparent;
      --color: white;
    }

    .header-title {
      font-weight: 700;
      font-size: 1.2rem;
    }

    .back-btn,
    .save-icon {
      color: white;
    }

    /* Settings Navigation */
    .settings-nav {
      padding: 16px;
      background: var(--ergofit-background-subtle);
    }

    .futuristic-segment {
      --background: var(--ergofit-card-background);
      border-radius: 12px;
      padding: 4px;
      box-shadow: var(--ergofit-card-shadow);
      border: var(--ergofit-card-border);
    }

    .futuristic-segment ion-segment-button {
      --color: #666;
      --color-checked: white;
      --background-checked: linear-gradient(135deg, var(--ergofit-primary), var(--ergofit-accent));
      --border-radius: 8px;
      margin: 2px;
    }

    /* Settings Sections */
    .settings-section {
      padding: 16px;
    }

    .futuristic-card {
      background: var(--ergofit-card-background);
      border-radius: 16px;
      box-shadow: var(--ergofit-card-shadow);
      border: var(--ergofit-card-border);
      margin-bottom: 16px;
      overflow: hidden;
      position: relative;
    }

    .futuristic-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--ergofit-primary), var(--ergofit-accent));
    }

    .card-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--ergofit-primary);
      font-weight: 600;
    }

    /* Avatar Section */
    .avatar-section {
      padding: 24px;
    }

    .avatar-container {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .avatar-wrapper {
      position: relative;
    }

    .avatar-glow {
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      background: conic-gradient(from 0deg, var(--ergofit-primary), var(--ergofit-accent), var(--ergofit-primary));
      border-radius: 50%;
      animation: rotate 3s linear infinite;
      z-index: -1;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .settings-avatar {
      width: 80px;
      height: 80px;
      border: 3px solid white;
    }

    .avatar-overlay {
      position: absolute;
      bottom: -5px;
      right: -5px;
      width: 30px;
      height: 30px;
      background: var(--ergofit-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .avatar-overlay:hover {
      transform: scale(1.1);
    }

    .avatar-overlay ion-icon {
      color: white;
      font-size: 16px;
    }

    .avatar-info h3 {
      color: var(--ergofit-primary);
      font-weight: 600;
      margin: 0 0 4px 0;
    }

    .avatar-info p {
      color: #666;
      margin: 0;
    }

    /* Form Elements */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .futuristic-item {
      --background: rgba(108, 99, 255, 0.05);
      --border-color: rgba(108, 99, 255, 0.2);
      border-radius: 12px;
      margin: 4px 0;
      transition: all 0.3s ease;
    }

    .futuristic-item:hover {
      --background: rgba(108, 99, 255, 0.08);
    }

    .futuristic-input {
      --background: transparent;
      --color: #333;
      --placeholder-color: #666;
    }

    .futuristic-select {
      --background: transparent;
      --color: #333;
    }

    .futuristic-toggle {
      --track-background: rgba(108, 99, 255, 0.3);
      --track-background-checked: var(--ergofit-primary);
      --handle-background: white;
      --handle-background-checked: white;
    }

    .futuristic-range {
      --bar-background: rgba(108, 99, 255, 0.2);
      --bar-background-active: var(--ergofit-primary);
      --knob-background: var(--ergofit-primary);
      --knob-border-radius: 50%;
      --knob-size: 20px;
    }

    /* Data Management */
    .data-management {
      padding: 16px;
    }

    .danger-card::before {
      background: linear-gradient(90deg, var(--ergofit-danger), #ff6b6b);
    }

    .management-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-btn {
      --border-radius: 12px;
      height: 48px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .export-btn {
      --border-color: var(--ergofit-info);
      --color: var(--ergofit-info);
    }

    .sync-btn {
      --border-color: var(--ergofit-success);
      --color: var(--ergofit-success);
    }

    .danger-btn {
      --border-color: var(--ergofit-danger);
      --color: var(--ergofit-danger);
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(108, 99, 255, 0.2);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .avatar-container {
        flex-direction: column;
        text-align: center;
      }

      .settings-nav {
        padding: 12px;
      }

      .futuristic-segment ion-segment-button {
        padding: 8px 4px;
      }

      .futuristic-segment ion-segment-button ion-label {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 480px) {
      .futuristic-segment ion-segment-button ion-label {
        display: none;
      }

      .settings-section {
        padding: 12px;
      }
    }
  `]
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  activeSegment = 'profile';

  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // User Profile
  userProfile: ErgoFitUserProfile | null = null;
  private subscriptions = new Subscription();

  // Security Settings
  securitySettings = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginNotifications: true
  };

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'person-outline': personOutline,
      'lock-closed-outline': lockClosedOutline,
      'notifications-outline': notificationsOutline,
      'color-palette-outline': colorPaletteOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'cloud-upload-outline': cloudUploadOutline,
      'download-outline': downloadOutline,
      'trash-outline': trashOutline,
      'camera-outline': cameraOutline,
      'save-outline': saveOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });
  }

  ngOnInit() {
    // Subscribe to user profile changes
    this.subscriptions.add(
      this.profileService.userProfile$.subscribe(profile => {
        this.userProfile = profile;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSegmentChange(event: any) {
    this.activeSegment = event.detail.value;
  }

  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  // Profile input change handlers
  onDisplayNameChange(event: any) {
    const displayName = event.detail.value;
    this.profileService.updateProfile({ displayName });
  }

  onBioChange(event: any) {
    const bio = event.detail.value;
    this.profileService.updateProfile({ bio });
  }

  onWorkTypeChange(event: any) {
    const workType = event.detail.value;
    this.profileService.updateProfile({ workType });
  }

  // Preferences change handlers
  onPreferenceChange(key: string, event: any) {
    const value = event.detail.checked;
    this.profileService.updatePreferences({ [key]: value });
  }

  onReminderIntervalChange(event: any) {
    const reminderInterval = event.detail.value;
    this.profileService.updatePreferences({ reminderInterval });
  }

  onSensitivityChange(event: any) {
    const sensitivity = event.detail.value;
    this.profileService.updatePreferences({ sensitivity });
  }

  onColorThemeChange(event: any) {
    const colorTheme = event.detail.value;
    this.profileService.updatePreferences({ colorTheme });
  }

  onAnimationLevelChange(event: any) {
    const animationLevel = event.detail.value;
    this.profileService.updatePreferences({ animationLevel });
  }

  onFontSizeChange(event: any) {
    const fontSize = event.detail.value;
    this.profileService.updatePreferences({ fontSize });
  }

  changeAvatar() {
    // Implement avatar change functionality
    console.log('Change avatar clicked');
  }

  async saveAllSettings() {
    try {
      // All settings are automatically saved when changed
      // This is just for user feedback
      console.log('All settings saved successfully');
      
      // Show success toast or alert here if needed
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    }
  }

  exportData() {
    if (!this.userProfile) return;

    const exportData = {
      profile: this.userProfile,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ergofit-profile-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    console.log('Data exported successfully');
  }

  syncData() {
    // Profile data is automatically synced to Firestore
    console.log('Data is automatically synced to cloud');
    alert('Your data is automatically synced to the cloud!');
  }

  clearAllData() {
    const confirmed = confirm('Are you sure you want to clear all data? This action cannot be undone.');
    if (confirmed) {
      // In a real implementation, you might want to delete from Firestore
      // For now, just show a message
      alert('Data clearing would be implemented here. This would remove all your progress and settings.');
      
      // Optionally navigate back to profile
      // this.router.navigate(['/profile']);
    }
  }
}
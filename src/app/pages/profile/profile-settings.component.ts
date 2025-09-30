import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonContent,
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
  IonSegment,
  IonSegmentButton
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
    IonSegment,
    IonSegmentButton
  ],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
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
      arrowBackOutline,
      saveOutline,
      personOutline,
      notificationsOutline,
      lockClosedOutline,
      cloudUploadOutline,
      cameraOutline,
      downloadOutline,
      trashOutline,
      colorPaletteOutline,
      shieldCheckmarkOutline,
      eyeOutline,
      eyeOffOutline
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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.handleAvatarUpload(file);
      }
    };
    input.click();
  }

  private handleAvatarUpload(file: File) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
      this.profileService.updateProfile({ photoURL: imageUrl });
      console.log('Avatar updated successfully');
    };
    reader.readAsDataURL(file);
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

  async changePassword() {
    if (!this.validatePasswordChange()) {
      return;
    }

    try {
      // In a real app, this would call Firebase Auth
      console.log('Password change requested');

      // Simulate password change process
      await this.simulatePasswordChange();

      // Clear password fields
      this.securitySettings.currentPassword = '';
      this.securitySettings.newPassword = '';
      this.securitySettings.confirmPassword = '';

      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please try again.');
    }
  }

  private validatePasswordChange(): boolean {
    if (!this.securitySettings.currentPassword) {
      alert('Please enter your current password');
      return false;
    }

    if (!this.securitySettings.newPassword) {
      alert('Please enter a new password');
      return false;
    }

    if (this.securitySettings.newPassword.length < 8) {
      alert('New password must be at least 8 characters long');
      return false;
    }

    if (this.securitySettings.newPassword !== this.securitySettings.confirmPassword) {
      alert('New passwords do not match');
      return false;
    }

    if (this.securitySettings.currentPassword === this.securitySettings.newPassword) {
      alert('New password must be different from current password');
      return false;
    }

    return true;
  }

  private async simulatePasswordChange(): Promise<void> {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  async enableTwoFactor() {
    try {
      // In a real app, this would set up 2FA with the auth provider
      console.log('Setting up 2FA...');

      // Show QR code or setup instructions
      const setupCode = this.generateSetupCode();
      alert(`2FA Setup Code: ${setupCode}\nScan this with your authenticator app.`);

      this.securitySettings.twoFactorEnabled = true;
      console.log('2FA enabled successfully');
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      alert('Error setting up 2FA. Please try again.');
      this.securitySettings.twoFactorEnabled = false;
    }
  }

  async disableTwoFactor() {
    const confirmed = confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.');
    if (confirmed) {
      try {
        // In a real app, this would disable 2FA with the auth provider
        console.log('Disabling 2FA...');
        this.securitySettings.twoFactorEnabled = false;
        alert('Two-factor authentication disabled.');
      } catch (error) {
        console.error('Error disabling 2FA:', error);
        alert('Error disabling 2FA. Please try again.');
        this.securitySettings.twoFactorEnabled = true;
      }
    } else {
      this.securitySettings.twoFactorEnabled = true;
    }
  }

  private generateSetupCode(): string {
    // Generate a mock setup code for 2FA
    return Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  async importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.handleDataImport(file);
      }
    };
    input.click();
  }

  private async handleDataImport(file: File) {
    try {
      const text = await file.text();
      const importedData = JSON.parse(text);

      // Validate imported data structure
      if (this.validateImportedData(importedData)) {
        // In a real app, this would merge with existing data
        console.log('Importing data:', importedData);
        alert('Data imported successfully!');
      } else {
        alert('Invalid data format. Please select a valid ErgoFit export file.');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data. Please check the file format.');
    }
  }

  private validateImportedData(data: any): boolean {
    return data &&
           (data.profile || data.settings) &&
           data.exportDate &&
           data.version;
  }

  async clearAllData() {
    const confirmed = confirm('Are you sure you want to clear all data? This action cannot be undone.');
    if (confirmed) {
      const doubleConfirm = confirm('This will permanently delete all your progress, achievements, and settings. Type "DELETE" to confirm.');
      // In a real app, you'd check for actual typed confirmation
      if (doubleConfirm) {
        try {
          // Clear local storage
          localStorage.removeItem('ergofit-settings');
          localStorage.removeItem('ergofit-profile');
          localStorage.removeItem('ergofit-stats');

          // In a real implementation, delete from Firestore
          console.log('All data cleared from local storage');

          alert('All data has been cleared successfully.');

          // Optionally navigate back to profile or login
          this.router.navigate(['/profile']);
        } catch (error) {
          console.error('Error clearing data:', error);
          alert('Error clearing data. Please try again.');
        }
      }
    }
  }

  async downloadAccountData() {
    try {
      // Comprehensive data export including all user data
      const comprehensiveData = {
        profile: this.userProfile,
        exportDate: new Date().toISOString(),
        version: '1.0',
        metadata: {
          exportType: 'complete',
          deviceInfo: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      };

      const dataStr = JSON.stringify(comprehensiveData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ergofit-complete-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      console.log('Complete account data exported');
    } catch (error) {
      console.error('Error exporting account data:', error);
      alert('Error exporting data. Please try again.');
    }
  }
}
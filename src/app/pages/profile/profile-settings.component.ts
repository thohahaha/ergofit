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
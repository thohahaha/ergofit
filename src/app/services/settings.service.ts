import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppSettings {
  // Notification Settings
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  breakNotifications: boolean;
  achievementAlerts: boolean;
  reminderInterval: number;

  // Appearance Settings
  darkModeEnabled: boolean;
  colorTheme: string;
  fontSize: number;
  animationLevel: string;

  // Monitoring Settings
  sensitivity: number;
  detectionMode: string;

  // Privacy & Data Settings
  cloudSyncEnabled: boolean;
  analyticsEnabled: boolean;
  dataSharing: boolean;

  // Language & Localization
  selectedLanguage: string;
  dateFormat: string;
  timeFormat: string;

  // Advanced Settings
  autoStart: boolean;
  minimizeToTray: boolean;
  startMinimized: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  biometricEnabled: boolean;
  autoLock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'ergofit-settings';
  private readonly SECURITY_KEY = 'ergofit-security';

  private settingsSubject = new BehaviorSubject<AppSettings>(this.getDefaultSettings());
  private securitySubject = new BehaviorSubject<SecuritySettings>(this.getDefaultSecurity());

  public settings$ = this.settingsSubject.asObservable();
  public security$ = this.securitySubject.asObservable();

  private notificationTimer: any = null;

  constructor() {
    this.loadSettings();
    this.loadSecurity();
  }

  // Default Settings
  private getDefaultSettings(): AppSettings {
    return {
      notificationsEnabled: true,
      soundEnabled: true,
      breakNotifications: true,
      achievementAlerts: true,
      reminderInterval: 30,
      darkModeEnabled: false,
      colorTheme: 'blue',
      fontSize: 14,
      animationLevel: 'medium',
      sensitivity: 7,
      detectionMode: 'automatic',
      cloudSyncEnabled: false,
      analyticsEnabled: true,
      dataSharing: false,
      selectedLanguage: 'id',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      autoStart: false,
      minimizeToTray: true,
      startMinimized: false
    };
  }

  private getDefaultSecurity(): SecuritySettings {
    return {
      twoFactorEnabled: false,
      loginNotifications: true,
      sessionTimeout: 30,
      biometricEnabled: false,
      autoLock: false
    };
  }

  // Load Settings
  private loadSettings() {
    try {
      const saved = localStorage.getItem(this.SETTINGS_KEY);
      if (saved) {
        const settings = { ...this.getDefaultSettings(), ...JSON.parse(saved) };
        this.settingsSubject.next(settings);
        this.applySettings(settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  private loadSecurity() {
    try {
      const saved = localStorage.getItem(this.SECURITY_KEY);
      if (saved) {
        const security = { ...this.getDefaultSecurity(), ...JSON.parse(saved) };
        this.securitySubject.next(security);
      }
    } catch (error) {
      console.error('Error loading security settings:', error);
    }
  }

  // Get Current Settings
  get currentSettings(): AppSettings {
    return this.settingsSubject.value;
  }

  get currentSecurity(): SecuritySettings {
    return this.securitySubject.value;
  }

  // Update Settings
  async updateSettings(updates: Partial<AppSettings>): Promise<void> {
    try {
      const current = this.currentSettings;
      const updated = { ...current, ...updates };

      await this.saveSettings(updated);
      this.settingsSubject.next(updated);
      this.applySettings(updated);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  async updateSecurity(updates: Partial<SecuritySettings>): Promise<void> {
    try {
      const current = this.currentSecurity;
      const updated = { ...current, ...updates };

      await this.saveSecurity(updated);
      this.securitySubject.next(updated);
    } catch (error) {
      console.error('Error updating security settings:', error);
      throw error;
    }
  }

  // Save Settings
  private async saveSettings(settings: AppSettings): Promise<void> {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  private async saveSecurity(security: SecuritySettings): Promise<void> {
    try {
      localStorage.setItem(this.SECURITY_KEY, JSON.stringify(security));
    } catch (error) {
      console.error('Error saving security settings:', error);
      throw error;
    }
  }

  // Apply Settings
  private applySettings(settings: AppSettings) {
    this.applyDarkMode(settings.darkModeEnabled);
    this.applyNotifications(settings);
    this.applyLanguage(settings.selectedLanguage);
    this.setupReminders(settings.reminderInterval, settings.notificationsEnabled);
  }

  private applyDarkMode(enabled: boolean) {
    if (enabled) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }

  private applyNotifications(settings: AppSettings) {
    if (settings.notificationsEnabled) {
      this.requestNotificationPermission();
    }
  }

  private applyLanguage(language: string) {
    // In a real app, this would integrate with i18n service
    console.log('Language applied:', language);
  }

  private setupReminders(interval: number, enabled: boolean) {
    // Clear existing timer
    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
      this.notificationTimer = null;
    }

    // Set up new timer
    if (enabled && interval > 0) {
      this.notificationTimer = setInterval(() => {
        this.showPostureReminder();
      }, interval * 60 * 1000);
    }
  }

  // Notification Functions
  private async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  private showPostureReminder() {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('ErgoFit Posture Reminder', {
        body: 'Time to check your posture! Sit up straight and relax your shoulders.',
        icon: 'assets/logo/logo ergofit.jpg',
        badge: 'assets/logo/logo ergofit.jpg',
        tag: 'posture-reminder'
      });
    }
  }

  // Utility Functions
  async resetToDefaults(): Promise<void> {
    const defaultSettings = this.getDefaultSettings();
    const defaultSecurity = this.getDefaultSecurity();

    await this.saveSettings(defaultSettings);
    await this.saveSecurity(defaultSecurity);

    this.settingsSubject.next(defaultSettings);
    this.securitySubject.next(defaultSecurity);

    this.applySettings(defaultSettings);
  }

  async exportSettings(): Promise<string> {
    const exportData = {
      settings: this.currentSettings,
      security: this.currentSecurity,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    return JSON.stringify(exportData, null, 2);
  }

  async importSettings(jsonData: string): Promise<void> {
    try {
      const importData = JSON.parse(jsonData);

      if (this.validateImportData(importData)) {
        if (importData.settings) {
          await this.updateSettings(importData.settings);
        }
        if (importData.security) {
          await this.updateSecurity(importData.security);
        }
      } else {
        throw new Error('Invalid import data format');
      }
    } catch (error) {
      console.error('Error importing settings:', error);
      throw error;
    }
  }

  private validateImportData(data: any): boolean {
    return data &&
           (data.settings || data.security) &&
           data.exportDate &&
           data.version;
  }

  async clearAllSettings(): Promise<void> {
    try {
      localStorage.removeItem(this.SETTINGS_KEY);
      localStorage.removeItem(this.SECURITY_KEY);

      const defaultSettings = this.getDefaultSettings();
      const defaultSecurity = this.getDefaultSecurity();

      this.settingsSubject.next(defaultSettings);
      this.securitySubject.next(defaultSecurity);

      this.applySettings(defaultSettings);
    } catch (error) {
      console.error('Error clearing settings:', error);
      throw error;
    }
  }

  // Cloud Sync Functions
  async syncToCloud(): Promise<void> {
    // In a real app, this would sync to Firebase or other cloud service
    const syncData = {
      settings: this.currentSettings,
      security: this.currentSecurity,
      lastSync: new Date().toISOString()
    };

    console.log('Syncing settings to cloud:', syncData);
    // Implement actual cloud sync logic here
  }

  async syncFromCloud(): Promise<void> {
    // In a real app, this would fetch from Firebase or other cloud service
    console.log('Syncing settings from cloud');
    // Implement actual cloud sync logic here
  }

  // Cleanup
  destroy() {
    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
      this.notificationTimer = null;
    }
  }
}
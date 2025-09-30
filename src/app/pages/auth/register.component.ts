import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonCheckbox,
  IonToast,
  IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  logoGoogle,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline,
  personAddOutline,
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  logInOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
    IonCheckbox,
    IonToast,
    IonImg
  ],
  template: `
    <ion-content class="register-content">
      <!-- Background Decoration -->
      <div class="background-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>

      <div class="page-container">
        <!-- Header Section -->
        <header class="page-header">
          <ion-button
            fill="clear"
            class="back-button"
            (click)="goBack()">
            <ion-icon name="arrow-back-outline" slot="icon-only"></ion-icon>
          </ion-button>

          <div class="brand-section">
            <div class="app-logo">
              <ion-img src="assets/logo/logo ergofit.jpg" alt="ErgoFit Logo" class="logo-image"></ion-img>
            </div>
            <h1 class="brand-name">ErgoFit</h1>
            <p class="welcome-text">Mulai perjalanan sehat Anda!</p>
          </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Register Card -->
          <div class="auth-card">
            <div class="card-header">
              <div class="header-icon">
                <ion-icon name="person-add-outline"></ion-icon>
              </div>
              <h2 class="card-title">Buat Akun Baru</h2>
              <p class="card-subtitle">Bergabung dengan ErgoFit untuk pengalaman postur yang lebih sehat</p>
            </div>

            <div class="card-content">
              <form (ngSubmit)="onRegister()" class="register-form">
                <!-- Name Input -->
                <div class="input-group">
                  <label class="input-label">Nama Lengkap</label>
                  <div class="input-container" [class.error]="nameError">
                    <div class="input-icon">
                      <ion-icon name="person-outline"></ion-icon>
                    </div>
                    <ion-input
                      type="text"
                      [(ngModel)]="registerForm.name"
                      name="name"
                      placeholder="Masukkan nama lengkap"
                      class="modern-input"
                      required>
                    </ion-input>
                  </div>
                  <div class="error-message" *ngIf="nameError">{{nameError}}</div>
                </div>

                <!-- Email Input -->
                <div class="input-group">
                  <label class="input-label">Email Address</label>
                  <div class="input-container" [class.error]="emailError">
                    <div class="input-icon">
                      <ion-icon name="mail-outline"></ion-icon>
                    </div>
                    <ion-input
                      type="email"
                      [(ngModel)]="registerForm.email"
                      name="email"
                      placeholder="masukkan@email.com"
                      class="modern-input"
                      required>
                    </ion-input>
                  </div>
                  <div class="error-message" *ngIf="emailError">{{emailError}}</div>
                </div>

                <!-- Password Input -->
                <div class="input-group">
                  <label class="input-label">Password</label>
                  <div class="input-container" [class.error]="passwordError">
                    <div class="input-icon">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                    </div>
                    <ion-input
                      [type]="showPassword ? 'text' : 'password'"
                      [(ngModel)]="registerForm.password"
                      name="password"
                      placeholder="Minimal 8 karakter"
                      class="modern-input"
                      (ionInput)="validatePasswordRequirements()"
                      required>
                    </ion-input>
                    <ion-button
                      fill="clear"
                      class="password-toggle"
                      (click)="togglePasswordVisibility()">
                      <ion-icon [name]="showPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                    </ion-button>
                  </div>
                  <div class="error-message" *ngIf="passwordError">{{passwordError}}</div>

                  <!-- Password Requirements -->
                  <div class="password-requirements" *ngIf="registerForm.password">
                    <div class="requirement-item" [class.valid]="hasMinLength">
                      <ion-icon [name]="hasMinLength ? 'checkmark-circle-outline' : 'close-circle-outline'"></ion-icon>
                      <span>Minimal 8 karakter</span>
                    </div>
                    <div class="requirement-item" [class.valid]="hasUpperCase">
                      <ion-icon [name]="hasUpperCase ? 'checkmark-circle-outline' : 'close-circle-outline'"></ion-icon>
                      <span>Huruf besar (A-Z)</span>
                    </div>
                    <div class="requirement-item" [class.valid]="hasLowerCase">
                      <ion-icon [name]="hasLowerCase ? 'checkmark-circle-outline' : 'close-circle-outline'"></ion-icon>
                      <span>Huruf kecil (a-z)</span>
                    </div>
                    <div class="requirement-item" [class.valid]="hasNumber">
                      <ion-icon [name]="hasNumber ? 'checkmark-circle-outline' : 'close-circle-outline'"></ion-icon>
                      <span>Angka (0-9)</span>
                    </div>
                  </div>
                </div>

                <!-- Confirm Password Input -->
                <div class="input-group">
                  <label class="input-label">Konfirmasi Password</label>
                  <div class="input-container" [class.error]="confirmPasswordError">
                    <div class="input-icon">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                    </div>
                    <ion-input
                      [type]="showConfirmPassword ? 'text' : 'password'"
                      [(ngModel)]="registerForm.confirmPassword"
                      name="confirmPassword"
                      placeholder="Ulangi password"
                      class="modern-input"
                      required>
                    </ion-input>
                    <ion-button
                      fill="clear"
                      class="password-toggle"
                      (click)="toggleConfirmPasswordVisibility()">
                      <ion-icon [name]="showConfirmPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                    </ion-button>
                  </div>
                  <div class="error-message" *ngIf="confirmPasswordError">{{confirmPasswordError}}</div>

                  <!-- Password Match Indicator -->
                  <div class="password-match" *ngIf="registerForm.confirmPassword">
                    <div class="match-indicator" [class.valid]="passwordsMatch">
                      <ion-icon [name]="passwordsMatch ? 'checkmark-circle-outline' : 'close-circle-outline'"></ion-icon>
                      <span>{{passwordsMatch ? 'Password cocok' : 'Password tidak cocok'}}</span>
                    </div>
                  </div>
                </div>

                <!-- Terms and Conditions -->
                <div class="terms-section">
                  <label class="checkbox-container">
                    <ion-checkbox [(ngModel)]="agreeToTerms" name="agreeToTerms"></ion-checkbox>
                    <span class="terms-text">
                      Saya setuju dengan
                      <button type="button" class="terms-link" (click)="showTerms()">Syarat & Ketentuan</button>
                      dan
                      <button type="button" class="terms-link" (click)="showPrivacy()">Kebijakan Privasi</button>
                    </span>
                  </label>
                </div>

                <!-- Register Button -->
                <ion-button
                  expand="block"
                  type="submit"
                  class="primary-btn"
                  [disabled]="isLoading || !isFormValid()">
                  <ion-icon name="person-add-outline" slot="start" *ngIf="!isLoading"></ion-icon>
                  <span>{{isLoading ? 'Memproses...' : 'Daftar Sekarang'}}</span>
                </ion-button>
              </form>

              <!-- Divider -->
              <div class="divider-container">
                <div class="divider-line"></div>
                <span class="divider-text">atau daftar dengan</span>
                <div class="divider-line"></div>
              </div>

              <!-- Social Register -->
              <div class="social-register">
                <ion-button
                  expand="block"
                  fill="outline"
                  class="google-btn"
                  (click)="signUpWithGoogle()"
                  [disabled]="!agreeToTerms || isLoading">
                  <ion-icon name="logo-google" slot="start"></ion-icon>
                  Daftar dengan Google
                </ion-button>
              </div>

              <!-- Trust Indicator -->
              <div class="trust-indicator">
                <div class="trust-icon">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>
                <span class="trust-text">Data Aman & Terenkripsi</span>
              </div>
            </div>
          </div>

          <!-- Login Section -->
          <div class="login-section">
            <p class="login-text">
              Sudah punya akun ErgoFit?
            </p>
            <ion-button
              fill="clear"
              class="login-btn"
              (click)="navigateToLogin()">
              <ion-icon name="log-in-outline" slot="start"></ion-icon>
              Masuk ke Akun
            </ion-button>
          </div>
        </main>

        <!-- Footer -->
        <footer class="page-footer">
          <p class="footer-text">© 2024 ErgoFit. Mulai hidup sehat dengan postur yang lebih baik.</p>
        </footer>
      </div>

      <!-- Toast Notifications -->
      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="4000"
        [color]="toastColor"
        [position]="'top'"
        [buttons]="[{ text: 'Tutup', role: 'cancel' }]"
        (didDismiss)="showToast = false">
      </ion-toast>
    </ion-content>
  `,
  styles: [`
    /* ===== CSS VARIABLES ===== */
    :host {
      --primary-color: #2563eb;
      --primary-light: #3b82f6;
      --primary-dark: #1e40af;
      --secondary-color: #059669;
      --accent-color: #7c3aed;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
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
      --google-red: #db4437;
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
      height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* ===== CONTENT BASE ===== */
    .register-content {
      --background: var(--background-color);
      --color: var(--gray-900);
      position: relative;
      overflow-x: hidden;
    }

    /* ===== BACKGROUND DECORATION ===== */
    .background-decoration {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      opacity: 0.03;
      animation: float 30s ease-in-out infinite;
    }

    .circle-1 {
      width: 280px;
      height: 280px;
      top: -140px;
      right: -140px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      bottom: -100px;
      left: -100px;
      animation-delay: -15s;
    }

    .circle-3 {
      width: 120px;
      height: 120px;
      top: 60%;
      left: -60px;
      animation-delay: -8s;
    }

    /* ===== PAGE CONTAINER ===== */
    .page-container {
      position: relative;
      z-index: 1;
      max-width: 520px;
      margin: 0 auto;
      padding: var(--spacing-lg);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* ===== HEADER ===== */
    .page-header {
      position: relative;
      text-align: center;
      margin-bottom: var(--spacing-xl);
      padding-top: var(--spacing-lg);
    }

    .back-button {
      position: absolute;
      top: 0;
      left: 0;
      --color: var(--gray-600);
      --background: var(--surface-color);
      --border-radius: var(--border-radius-sm);
      width: 40px;
      height: 40px;
      box-shadow: var(--card-shadow);
      transition: all 0.2s ease;
    }

    .back-button:hover {
      --color: var(--primary-color);
      transform: translateX(-2px);
    }

    .brand-section {
      padding-top: var(--spacing-md);
    }

    .app-logo {
      width: 80px;
      height: 80px;
      background: var(--surface-color);
      border-radius: 50%;
      margin: 0 auto var(--spacing-md);
      box-shadow: var(--card-shadow-lg);
      border: 3px solid var(--gray-200);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .app-logo:hover {
      transform: scale(1.05);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .brand-name {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 var(--spacing-sm) 0;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }

    .welcome-text {
      font-size: 1.125rem;
      color: var(--gray-600);
      margin: 0;
      font-weight: 500;
    }

    /* ===== MAIN CONTENT ===== */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* ===== AUTH CARD ===== */
    .auth-card {
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--card-shadow-lg);
      overflow: hidden;
      margin-bottom: var(--spacing-xl);
    }

    .card-header {
      text-align: center;
      padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
      border-bottom: 1px solid var(--gray-100);
    }

    .header-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--secondary-color), var(--success-color));
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--spacing-md);
      font-size: 1.5rem;
      color: white;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .card-subtitle {
      font-size: 0.975rem;
      color: var(--gray-600);
      margin: 0;
      line-height: 1.5;
    }

    .card-content {
      padding: var(--spacing-lg);
    }

    /* ===== FORM STYLES ===== */
    .register-form {
      margin-bottom: var(--spacing-lg);
    }

    .input-group {
      margin-bottom: var(--spacing-lg);
    }

    .input-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-700);
      margin-bottom: var(--spacing-sm);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
      background: var(--gray-50);
      border: 2px solid var(--gray-200);
      border-radius: var(--border-radius);
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .input-container:focus-within {
      border-color: var(--primary-color);
      background: var(--surface-color);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .input-container.error {
      border-color: var(--danger-color);
      background: rgba(239, 68, 68, 0.05);
    }

    .input-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      color: var(--gray-400);
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .input-container:focus-within .input-icon {
      color: var(--primary-color);
    }

    .modern-input {
      --background: transparent;
      --color: var(--gray-900);
      --placeholder-color: var(--gray-400);
      --padding-start: 0;
      --padding-end: var(--spacing-sm);
      --padding-top: var(--spacing-sm);
      --padding-bottom: var(--spacing-sm);
      --border-radius: 0;
      --box-shadow: none;
      --highlight-color-focused: transparent;
      --highlight-color-valid: transparent;
      --highlight-color-invalid: transparent;
      flex: 1;
      font-size: 1rem;
      font-weight: 500;
      min-height: 48px;
    }

    .password-toggle {
      --color: var(--gray-400);
      --background: transparent;
      --padding-start: var(--spacing-sm);
      --padding-end: var(--spacing-sm);
      width: 48px;
      height: 48px;
      margin: 0;
    }

    .password-toggle:hover {
      --color: var(--primary-color);
    }

    .error-message {
      font-size: 0.75rem;
      color: var(--danger-color);
      margin-top: var(--spacing-xs);
      font-weight: 500;
    }

    /* ===== PASSWORD REQUIREMENTS ===== */
    .password-requirements {
      margin-top: var(--spacing-sm);
      padding: var(--spacing-md);
      background: var(--gray-50);
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--gray-200);
    }

    .requirement-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-xs);
      font-size: 0.75rem;
      color: var(--gray-500);
      transition: all 0.2s ease;
    }

    .requirement-item:last-child {
      margin-bottom: 0;
    }

    .requirement-item.valid {
      color: var(--success-color);
      font-weight: 500;
    }

    .requirement-item ion-icon {
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .requirement-item.valid ion-icon {
      color: var(--success-color);
    }

    .requirement-item:not(.valid) ion-icon {
      color: var(--gray-400);
    }

    /* ===== PASSWORD MATCH ===== */
    .password-match {
      margin-top: var(--spacing-sm);
    }

    .match-indicator {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--gray-500);
      transition: all 0.2s ease;
    }

    .match-indicator.valid {
      color: var(--success-color);
    }

    .match-indicator ion-icon {
      font-size: 0.875rem;
    }

    /* ===== TERMS SECTION ===== */
    .terms-section {
      margin-bottom: var(--spacing-xl);
      padding: var(--spacing-md);
      background: var(--gray-50);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
    }

    .checkbox-container {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
      cursor: pointer;
    }

    .terms-text {
      font-size: 0.875rem;
      color: var(--gray-700);
      line-height: 1.5;
    }

    .terms-link {
      background: none;
      border: none;
      color: var(--primary-color);
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
      padding: 0;
      font-size: inherit;
    }

    .terms-link:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }

    /* ===== BUTTONS ===== */
    .primary-btn {
      --background: linear-gradient(135deg, var(--secondary-color), var(--success-color));
      --color: white;
      --border-radius: var(--border-radius);
      --box-shadow: var(--card-shadow);
      font-weight: 600;
      text-transform: none;
      height: 56px;
      font-size: 1rem;
      margin-bottom: var(--spacing-lg);
      transition: all 0.3s ease;
    }

    .primary-btn:not([disabled]):hover {
      transform: translateY(-2px);
      --box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.3);
    }

    .primary-btn[disabled] {
      --background: var(--gray-300);
      --color: var(--gray-500);
    }

    /* ===== DIVIDER ===== */
    .divider-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin: var(--spacing-lg) 0;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background: var(--gray-200);
    }

    .divider-text {
      font-size: 0.875rem;
      color: var(--gray-500);
      font-weight: 500;
      white-space: nowrap;
    }

    /* ===== SOCIAL REGISTER ===== */
    .social-register {
      margin-bottom: var(--spacing-lg);
    }

    .google-btn {
      --border-color: var(--google-red);
      --color: var(--google-red);
      --border-radius: var(--border-radius);
      font-weight: 600;
      text-transform: none;
      height: 56px;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .google-btn:hover {
      --background: rgba(219, 68, 55, 0.05);
    }

    .google-btn[disabled] {
      --border-color: var(--gray-300);
      --color: var(--gray-400);
      opacity: 0.6;
    }

    /* ===== TRUST INDICATOR ===== */
    .trust-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      background: var(--gray-50);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
    }

    .trust-icon {
      color: var(--success-color);
      font-size: 1rem;
    }

    .trust-text {
      font-size: 0.75rem;
      color: var(--gray-600);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    /* ===== LOGIN SECTION ===== */
    .login-section {
      text-align: center;
      padding: var(--spacing-lg);
      background: var(--gray-50);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      margin-bottom: var(--spacing-lg);
    }

    .login-text {
      font-size: 0.975rem;
      color: var(--gray-600);
      margin: 0 0 var(--spacing-md) 0;
    }

    .login-btn {
      --color: var(--primary-color);
      font-weight: 600;
      text-transform: none;
      transition: all 0.2s ease;
    }

    .login-btn:hover {
      --color: var(--primary-dark);
    }

    /* ===== FOOTER ===== */
    .page-footer {
      margin-top: auto;
      text-align: center;
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--gray-200);
    }

    .footer-text {
      font-size: 0.75rem;
      color: var(--gray-500);
      margin: 0;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(1.5deg); }
      66% { transform: translateY(10px) rotate(-0.8deg); }
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .page-container {
        padding: var(--spacing-md);
      }

      .brand-name {
        font-size: 2rem;
      }

      .card-header {
        padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
      }

      .card-content {
        padding: var(--spacing-md);
      }

      .password-requirements {
        margin-top: var(--spacing-xs);
        padding: var(--spacing-sm);
      }
    }

    @media (max-width: 480px) {
      .page-container {
        padding: var(--spacing-sm);
      }

      .app-logo {
        width: 60px;
        height: 60px;
      }

      .brand-name {
        font-size: 1.75rem;
      }

      .terms-section {
        padding: var(--spacing-sm);
      }

      .checkbox-container {
        align-items: flex-start;
      }

      .input-container {
        flex-direction: column;
        align-items: stretch;
      }

      .input-icon {
        width: 100%;
        height: auto;
        padding: var(--spacing-sm);
        justify-content: flex-start;
      }

      .modern-input {
        --padding-start: var(--spacing-md);
      }
    }

    /* ===== LOADING STATES ===== */
    .primary-btn[disabled] {
      cursor: not-allowed;
    }

    /* ===== ACCESSIBILITY ===== */
    @media (prefers-reduced-motion: reduce) {
      .decoration-circle {
        animation: none;
      }

      .back-button:hover,
      .primary-btn:hover,
      .app-logo:hover {
        transform: none;
      }
    }

    /* ===== FOCUS STYLES ===== */
    .terms-link:focus,
    .login-btn:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--spacing-xs);
    }
  `]
})
export class RegisterComponent {
  registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  agreeToTerms = false;
  isLoading = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'primary';

  // Error states
  nameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  constructor(private router: Router, private authService: AuthService) {
    addIcons({
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'logo-google': logoGoogle,
      'arrow-back-outline': arrowBackOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'person-add-outline': personAddOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'close-circle-outline': closeCircleOutline,
      'log-in-outline': logInOutline
    });
  }

  // Password validation getters
  get hasMinLength(): boolean {
    return this.registerForm.password.length >= 8;
  }

  get hasUpperCase(): boolean {
    return /[A-Z]/.test(this.registerForm.password);
  }

  get hasLowerCase(): boolean {
    return /[a-z]/.test(this.registerForm.password);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.registerForm.password);
  }

  get passwordsMatch(): boolean {
    return this.registerForm.password === this.registerForm.confirmPassword &&
           this.registerForm.confirmPassword.length > 0;
  }

  get isPasswordValid(): boolean {
    return this.hasMinLength && this.hasUpperCase && this.hasLowerCase && this.hasNumber;
  }

  isFormValid(): boolean {
    return (
      this.registerForm.name.trim().length >= 2 &&
      this.isValidEmail(this.registerForm.email) &&
      this.isPasswordValid &&
      this.passwordsMatch &&
      this.agreeToTerms
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePasswordRequirements() {
    // This method is called on password input to trigger UI updates
    // The requirements are automatically validated via getters
  }

  private validateForm(): boolean {
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    let isValid = true;

    // Name validation
    if (!this.registerForm.name.trim()) {
      this.nameError = 'Nama lengkap wajib diisi';
      isValid = false;
    } else if (this.registerForm.name.trim().length < 2) {
      this.nameError = 'Nama minimal 2 karakter';
      isValid = false;
    }

    // Email validation
    if (!this.registerForm.email.trim()) {
      this.emailError = 'Email wajib diisi';
      isValid = false;
    } else if (!this.isValidEmail(this.registerForm.email)) {
      this.emailError = 'Format email tidak valid';
      isValid = false;
    }

    // Password validation
    if (!this.registerForm.password.trim()) {
      this.passwordError = 'Password wajib diisi';
      isValid = false;
    } else if (!this.isPasswordValid) {
      this.passwordError = 'Password tidak memenuhi persyaratan';
      isValid = false;
    }

    // Confirm password validation
    if (!this.registerForm.confirmPassword.trim()) {
      this.confirmPasswordError = 'Konfirmasi password wajib diisi';
      isValid = false;
    } else if (!this.passwordsMatch) {
      this.confirmPasswordError = 'Password tidak cocok';
      isValid = false;
    }

    return isValid;
  }

  goBack() {
    this.router.navigate(['/get-started']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onRegister() {
    if (!this.validateForm()) {
      return;
    }

    if (!this.agreeToTerms) {
      this.showToastMessage('Mohon setujui syarat dan ketentuan terlebih dahulu', 'warning');
      return;
    }

    this.isLoading = true;

    try {
      const user = await this.authService.register(
        this.registerForm.email,
        this.registerForm.password,
        this.registerForm.name
      );

      this.showToastMessage('Registrasi berhasil! Selamat datang di ErgoFit.', 'success');

      // Navigate to dashboard after short delay
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = this.getErrorMessage(error);
      this.showToastMessage(errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async signUpWithGoogle() {
    if (!this.agreeToTerms) {
      this.showToastMessage('Mohon setujui syarat dan ketentuan terlebih dahulu', 'warning');
      return;
    }

    this.isLoading = true;

    try {
      const user = await this.authService.signInWithGoogle();
      this.showToastMessage('Registrasi dengan Google berhasil! Selamat datang di ErgoFit.', 'success');

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);

    } catch (error) {
      console.error('Google Sign-Up error:', error);
      const errorMessage = this.getErrorMessage(error);
      this.showToastMessage(errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  showTerms() {
    this.showToastMessage('Halaman Syarat & Ketentuan akan segera tersedia.', 'primary');
  }

  showPrivacy() {
    this.showToastMessage('Halaman Kebijakan Privasi akan segera tersedia.', 'primary');
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  private getErrorMessage(error: any): string {
    if (error instanceof Error) {
      switch (error.message) {
        case 'auth/email-already-in-use':
          return 'Email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun yang ada.';
        case 'auth/invalid-email':
          return 'Format email tidak valid.';
        case 'auth/operation-not-allowed':
          return 'Registrasi tidak diizinkan. Hubungi administrator.';
        case 'auth/weak-password':
          return 'Password terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.';
        default:
          return error.message;
      }
    }
    return 'Registrasi gagal. Periksa koneksi internet dan coba lagi.';
  }

  private showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
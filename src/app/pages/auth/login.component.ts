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
  mailOutline,
  lockClosedOutline,
  logoGoogle,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  personAddOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
    <ion-content class="login-content">
      <!-- Background Decoration -->
      <div class="background-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
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
            <p class="welcome-text">Selamat datang kembali!</p>
          </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Login Card -->
          <div class="auth-card">
            <div class="card-header">
              <div class="header-icon">
                <ion-icon name="log-in-outline"></ion-icon>
              </div>
              <h2 class="card-title">Masuk ke Akun</h2>
              <p class="card-subtitle">Akses dashboard postur dan analitik kesehatan Anda</p>
            </div>

            <div class="card-content">
              <form (ngSubmit)="onLogin()" class="login-form">
                <!-- Email Input -->
                <div class="input-group">
                  <label class="input-label">Email Address</label>
                  <div class="input-container">
                    <div class="input-icon">
                      <ion-icon name="mail-outline"></ion-icon>
                    </div>
                    <ion-input
                      type="email"
                      [(ngModel)]="loginForm.email"
                      name="email"
                      placeholder="masukkan@email.com"
                      class="modern-input"
                      [class.error]="emailError"
                      required>
                    </ion-input>
                  </div>
                  <div class="error-message" *ngIf="emailError">{{emailError}}</div>
                </div>

                <!-- Password Input -->
                <div class="input-group">
                  <label class="input-label">Password</label>
                  <div class="input-container">
                    <div class="input-icon">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                    </div>
                    <ion-input
                      [type]="showPassword ? 'text' : 'password'"
                      [(ngModel)]="loginForm.password"
                      name="password"
                      placeholder="Masukkan password"
                      class="modern-input"
                      [class.error]="passwordError"
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
                </div>

                <!-- Form Options -->
                <div class="form-options">
                  <label class="checkbox-container">
                    <ion-checkbox [(ngModel)]="rememberMe" name="rememberMe"></ion-checkbox>
                    <span class="checkbox-text">Ingat saya</span>
                  </label>

                  <button type="button" class="forgot-link" (click)="forgotPassword()">
                    Lupa password?
                  </button>
                </div>

                <!-- Login Button -->
                <ion-button
                  expand="block"
                  type="submit"
                  class="primary-btn"
                  [disabled]="isLoading || !isFormValid()">
                  <ion-icon name="log-in-outline" slot="start" *ngIf="!isLoading"></ion-icon>
                  <span>{{isLoading ? 'Memproses...' : 'Masuk ke Dashboard'}}</span>
                </ion-button>
              </form>

              <!-- Divider -->
              <div class="divider-container">
                <div class="divider-line"></div>
                <span class="divider-text">atau lanjutkan dengan</span>
                <div class="divider-line"></div>
              </div>

              <!-- Social Login -->
              <div class="social-login">
                <ion-button
                  expand="block"
                  fill="outline"
                  class="google-btn"
                  (click)="signInWithGoogle()"
                  [disabled]="isLoading">
                  <ion-icon name="logo-google" slot="start"></ion-icon>
                  Masuk dengan Google
                </ion-button>
              </div>

              <!-- Trust Indicator -->
              <div class="trust-indicator">
                <div class="trust-icon">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>
                <span class="trust-text">Login Aman & Terenkripsi</span>
              </div>
            </div>
          </div>

          <!-- Register Section -->
          <div class="register-section">
            <p class="register-text">
              Belum punya akun ErgoFit?
            </p>
            <ion-button
              fill="clear"
              class="register-btn"
              (click)="navigateToRegister()">
              <ion-icon name="person-add-outline" slot="start"></ion-icon>
              Daftar Gratis Sekarang
            </ion-button>
          </div>
        </main>

        <!-- Footer -->
        <footer class="page-footer">
          <p class="footer-text">© 2024 ErgoFit. Kesehatan postur untuk produktivitas optimal.</p>
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
    .login-content {
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
      animation: float 25s ease-in-out infinite;
    }

    .circle-1 {
      width: 250px;
      height: 250px;
      top: -125px;
      right: -125px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 180px;
      height: 180px;
      bottom: -90px;
      left: -90px;
      animation-delay: -12s;
    }

    /* ===== PAGE CONTAINER ===== */
    .page-container {
      position: relative;
      z-index: 1;
      max-width: 480px;
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
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
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
    .login-form {
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

    /* ===== FORM OPTIONS ===== */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
    }

    .checkbox-text {
      font-size: 0.875rem;
      color: var(--gray-700);
      font-weight: 500;
    }

    .forgot-link {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .forgot-link:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }

    /* ===== BUTTONS ===== */
    .primary-btn {
      --background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
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
      --box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
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

    /* ===== SOCIAL LOGIN ===== */
    .social-login {
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

    /* ===== REGISTER SECTION ===== */
    .register-section {
      text-align: center;
      padding: var(--spacing-lg);
      background: var(--gray-50);
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      margin-bottom: var(--spacing-lg);
    }

    .register-text {
      font-size: 0.975rem;
      color: var(--gray-600);
      margin: 0 0 var(--spacing-md) 0;
    }

    .register-btn {
      --color: var(--primary-color);
      font-weight: 600;
      text-transform: none;
      transition: all 0.2s ease;
    }

    .register-btn:hover {
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
      33% { transform: translateY(-15px) rotate(1deg); }
      66% { transform: translateY(8px) rotate(-0.5deg); }
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

      .form-options {
        flex-direction: column;
        gap: var(--spacing-sm);
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
    .forgot-link:focus,
    .register-btn:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--spacing-xs);
    }
  `]
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: ''
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'primary';
  emailError = '';
  passwordError = '';

  constructor(private router: Router, private authService: AuthService) {
    addIcons({
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'logo-google': logoGoogle,
      'arrow-back-outline': arrowBackOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'log-in-outline': logInOutline,
      'person-add-outline': personAddOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline
    });
  }

  goBack() {
    this.router.navigate(['/get-started']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return this.loginForm.email.trim() !== '' &&
           this.loginForm.password.trim() !== '' &&
           this.isValidEmail(this.loginForm.email);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateForm(): boolean {
    this.emailError = '';
    this.passwordError = '';

    if (!this.loginForm.email.trim()) {
      this.emailError = 'Email wajib diisi';
      return false;
    }

    if (!this.isValidEmail(this.loginForm.email)) {
      this.emailError = 'Format email tidak valid';
      return false;
    }

    if (!this.loginForm.password.trim()) {
      this.passwordError = 'Password wajib diisi';
      return false;
    }

    if (this.loginForm.password.length < 6) {
      this.passwordError = 'Password minimal 6 karakter';
      return false;
    }

    return true;
  }

  async onLogin() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    try {
      const user = await this.authService.signIn(this.loginForm.email, this.loginForm.password);
      this.showToastMessage('Login berhasil! Mengarahkan ke dashboard...', 'success');

      // Navigate to dashboard after short delay
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = this.getErrorMessage(error);
      this.showToastMessage(errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;

    try {
      const user = await this.authService.signInWithGoogle();
      this.showToastMessage('Login dengan Google berhasil! Mengarahkan ke dashboard...', 'success');

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);

    } catch (error) {
      console.error('Google Sign-In error:', error);
      const errorMessage = this.getErrorMessage(error);
      this.showToastMessage(errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  forgotPassword() {
    if (!this.loginForm.email.trim()) {
      this.showToastMessage('Silakan masukkan email Anda terlebih dahulu', 'warning');
      return;
    }

    if (!this.isValidEmail(this.loginForm.email)) {
      this.showToastMessage('Silakan masukkan email yang valid', 'warning');
      return;
    }

    // TODO: Implement actual forgot password functionality
    this.showToastMessage('Link reset password telah dikirim ke email Anda (Demo mode)', 'primary');
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  private getErrorMessage(error: any): string {
    if (error instanceof Error) {
      switch (error.message) {
        case 'auth/user-not-found':
          return 'Email tidak terdaftar. Silakan daftar terlebih dahulu.';
        case 'auth/wrong-password':
          return 'Password salah. Silakan coba lagi.';
        case 'auth/invalid-email':
          return 'Format email tidak valid.';
        case 'auth/user-disabled':
          return 'Akun ini telah dinonaktifkan.';
        case 'auth/too-many-requests':
          return 'Terlalu banyak percobaan login. Coba lagi nanti.';
        default:
          return error.message;
      }
    }
    return 'Login gagal. Periksa koneksi internet dan coba lagi.';
  }

  private showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
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
  IonToast
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  logoGoogle,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline
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
    IonToast
  ],
  template: `
    <ion-content class="register-content">
      <div class="container">
        <!-- Header -->
        <div class="header-section">
          <ion-button 
            fill="clear" 
            class="back-button"
            (click)="goBack()">
            <ion-icon name="arrow-back-outline" slot="icon-only"></ion-icon>
          </ion-button>
          
          <div class="logo-container">
            <h1>ErgoFit</h1>
            <p>Mulai perjalanan sehat Anda!</p>
          </div>
        </div>

        <!-- Register Form -->
        <ion-card class="auth-card ergofit-animate-in">
          <ion-card-header>
            <ion-card-title>Buat Akun Baru</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <form (ngSubmit)="onRegister()">
              <!-- Name Input -->
              <ion-item class="auth-item">
                <ion-icon name="person-outline" slot="start" class="input-icon"></ion-icon>
                <ion-label position="stacked">Nama Lengkap</ion-label>
                <ion-input
                  type="text"
                  [(ngModel)]="registerForm.name"
                  name="name"
                  placeholder="Masukkan nama lengkap"
                  required>
                </ion-input>
              </ion-item>

              <!-- Email Input -->
              <ion-item class="auth-item">
                <ion-icon name="mail-outline" slot="start" class="input-icon"></ion-icon>
                <ion-label position="stacked">Email</ion-label>
                <ion-input
                  type="email"
                  [(ngModel)]="registerForm.email"
                  name="email"
                  placeholder="masukkan@email.com"
                  required>
                </ion-input>
              </ion-item>

              <!-- Password Input -->
              <ion-item class="auth-item">
                <ion-icon name="lock-closed-outline" slot="start" class="input-icon"></ion-icon>
                <ion-label position="stacked">Password</ion-label>
                <ion-input
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="registerForm.password"
                  name="password"
                  placeholder="minimal 8 karakter"
                  required>
                </ion-input>
                <ion-button 
                  fill="clear" 
                  slot="end"
                  (click)="togglePasswordVisibility()">
                  <ion-icon 
                    [name]="showPassword ? 'eye-off-outline' : 'eye-outline'"
                    slot="icon-only">
                  </ion-icon>
                </ion-button>
              </ion-item>

              <!-- Confirm Password Input -->
              <ion-item class="auth-item">
                <ion-icon name="lock-closed-outline" slot="start" class="input-icon"></ion-icon>
                <ion-label position="stacked">Konfirmasi Password</ion-label>
                <ion-input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  [(ngModel)]="registerForm.confirmPassword"
                  name="confirmPassword"
                  placeholder="ulangi password"
                  required>
                </ion-input>
                <ion-button 
                  fill="clear" 
                  slot="end"
                  (click)="toggleConfirmPasswordVisibility()">
                  <ion-icon 
                    [name]="showConfirmPassword ? 'eye-off-outline' : 'eye-outline'"
                    slot="icon-only">
                  </ion-icon>
                </ion-button>
              </ion-item>

              <!-- Password Requirements -->
              <div class="password-requirements">
                <ion-text color="medium">
                  <p>Password harus:</p>
                  <ul>
                    <li [class.valid]="hasMinLength">Minimal 8 karakter</li>
                    <li [class.valid]="hasUpperCase">Mengandung huruf besar</li>
                    <li [class.valid]="hasLowerCase">Mengandung huruf kecil</li>
                    <li [class.valid]="hasNumber">Mengandung angka</li>
                  </ul>
                </ion-text>
              </div>

              <!-- Terms and Conditions -->
              <div class="terms-section">
                <ion-checkbox 
                  [(ngModel)]="agreeToTerms"
                  name="agreeToTerms">
                </ion-checkbox>
                <ion-label>
                  Saya setuju dengan 
                  <a (click)="showTerms()" class="terms-link">Syarat & Ketentuan</a>
                  dan 
                  <a (click)="showPrivacy()" class="terms-link">Kebijakan Privasi</a>
                </ion-label>
              </div>

              <!-- Register Button -->
              <ion-button
                expand="block"
                type="submit"
                class="register-button"
                [disabled]="!isFormValid() || isLoading">
                {{isLoading ? 'Memproses...' : 'Daftar Sekarang'}}
              </ion-button>
            </form>

            <!-- Divider -->
            <div class="divider">
              <span>atau</span>
            </div>

            <!-- Google Sign Up -->
            <ion-button
              expand="block"
              fill="outline"
              class="google-button"
              (click)="signUpWithGoogle()"
              [disabled]="!agreeToTerms || isLoading">
              <ion-icon name="logo-google" slot="start"></ion-icon>
              Daftar dengan Google
            </ion-button>

            <!-- Login Link -->
            <div class="login-section">
              <ion-text color="medium">
                <p>Sudah punya akun? 
                  <a (click)="navigateToLogin()" class="login-link">Masuk di sini</a>
                </p>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Toast for notifications -->
      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="3000"
        [color]="toastColor"
        (didDismiss)="showToast = false">
      </ion-toast>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      background: var(--ergofit-background) !important;
    }

    ion-content.register-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
      --color: #333 !important;
      color: #333 !important;
    }

    ion-content.register-content::part(background) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }

    ion-content.register-content::part(scroll) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }

    .register-content {
      --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      --color: white !important;
      color: white !important;
    }

    .container {
      padding: var(--ergofit-spacing-lg);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      max-width: 500px;
      margin: 0 auto;
    }

    .header-section {
      margin-bottom: var(--ergofit-spacing-xl);
      position: relative;
    }

    .back-button {
      --color: white;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }

    .logo-container {
      text-align: center;
      padding-top: var(--ergofit-spacing-lg);
    }

    .logo-container h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 var(--ergofit-spacing-sm) 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .logo-container p {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
    }

    .auth-card {
      --background: rgba(255, 255, 255, 0.95);
      --color: #333;
      backdrop-filter: blur(20px);
      border-radius: var(--ergofit-card-radius-lg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .auth-card ion-card-title {
      color: var(--ergofit-primary);
      font-weight: 600;
      text-align: center;
    }

    .auth-item {
      --background: transparent;
      --border-color: #e0e0e0;
      margin-bottom: var(--ergofit-spacing-md);
      border-radius: var(--ergofit-card-radius-sm);
    }

    .input-icon {
      color: var(--ergofit-primary);
      margin-right: var(--ergofit-spacing-sm);
    }

    .password-requirements {
      margin: var(--ergofit-spacing-md) 0;
      font-size: 0.85rem;
    }

    .password-requirements ul {
      margin: var(--ergofit-spacing-xs) 0;
      padding-left: var(--ergofit-spacing-lg);
    }

    .password-requirements li {
      margin: var(--ergofit-spacing-xs) 0;
      color: #999;
      transition: color 0.3s ease;
    }

    .password-requirements li.valid {
      color: var(--ergofit-success);
      font-weight: 500;
    }

    .terms-section {
      display: flex;
      align-items: flex-start;
      gap: var(--ergofit-spacing-sm);
      margin: var(--ergofit-spacing-lg) 0;
      font-size: 0.9rem;
    }

    .terms-link {
      color: var(--ergofit-primary);
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
    }

    .terms-link:hover {
      text-decoration: underline;
    }

    .register-button {
      --background: var(--ergofit-primary);
      --border-radius: 12px;
      --padding-top: 16px;
      --padding-bottom: 16px;
      font-weight: 600;
      margin: var(--ergofit-spacing-lg) 0;
    }

    .register-button[disabled] {
      --background: #ccc;
      --color: #666;
    }

    .divider {
      text-align: center;
      margin: var(--ergofit-spacing-lg) 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e0e0e0;
    }

    .divider span {
      background: rgba(255, 255, 255, 0.95);
      padding: 0 var(--ergofit-spacing-md);
      color: #666;
      font-size: 0.9rem;
    }

    .google-button {
      --border-color: #db4437;
      --color: #db4437;
      --border-radius: 12px;
      --padding-top: 16px;
      --padding-bottom: 16px;
      font-weight: 600;
      margin-bottom: var(--ergofit-spacing-lg);
    }

    .google-button[disabled] {
      --border-color: #ccc;
      --color: #666;
    }

    .login-section {
      text-align: center;
      margin-top: var(--ergofit-spacing-md);
    }

    .login-link {
      color: var(--ergofit-primary);
      text-decoration: none;
      cursor: pointer;
      font-weight: 600;
    }

    .login-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .container {
        padding: var(--ergofit-spacing-md);
      }
      
      .logo-container h1 {
        font-size: 1.8rem;
      }

      .terms-section {
        flex-direction: column;
        gap: var(--ergofit-spacing-xs);
      }
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

  constructor(private router: Router, private authService: AuthService) {
    addIcons({
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'logo-google': logoGoogle,
      'arrow-back-outline': arrowBackOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });
  }

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
    return this.registerForm.password === this.registerForm.confirmPassword;
  }

  get isPasswordValid(): boolean {
    return this.hasMinLength && this.hasUpperCase && this.hasLowerCase && this.hasNumber;
  }

  isFormValid(): boolean {
    return (
      this.registerForm.name.length >= 2 &&
      this.registerForm.email.includes('@') &&
      this.isPasswordValid &&
      this.passwordsMatch &&
      this.agreeToTerms
    );
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
    if (!this.isFormValid()) {
      this.showToastMessage('Mohon lengkapi semua field dengan benar', 'warning');
      return;
    }

    if (!this.passwordsMatch) {
      this.showToastMessage('Password dan konfirmasi password tidak sama', 'warning');
      return;
    }

    this.isLoading = true;
    
    try {
      const user = await this.authService.register(
        this.registerForm.email, 
        this.registerForm.password, 
        this.registerForm.name
      );
      
      this.showToastMessage('Registrasi berhasil! Silakan login.', 'success');
      
      // Navigate to login after short delay
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1500);
      
    } catch (error) {
      console.error('Registration error:', error);
      this.showToastMessage(error instanceof Error ? error.message : 'Registrasi gagal. Silakan coba lagi.', 'danger');
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
      this.showToastMessage('Registrasi dengan Google berhasil!', 'success');
      
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
      
    } catch (error) {
      console.error('Google Sign-Up error:', error);
      this.showToastMessage(error instanceof Error ? error.message : 'Registrasi dengan Google gagal.', 'danger');
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

  private showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
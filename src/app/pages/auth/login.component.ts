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
  mailOutline,
  lockClosedOutline,
  logoGoogle,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline
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
    IonToast
  ],
  template: `
    <ion-content class="login-content">
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
            <p>Selamat datang kembali!</p>
          </div>
        </div>

        <!-- Login Form -->
        <ion-card class="auth-card ergofit-animate-in">
          <ion-card-header>
            <ion-card-title>Masuk ke Akun</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <form (ngSubmit)="onLogin()">
              <!-- Email Input -->
              <ion-item class="auth-item">
                <ion-icon name="mail-outline" slot="start" class="input-icon"></ion-icon>
                <ion-label position="stacked">Email</ion-label>
                <ion-input
                  type="email"
                  [(ngModel)]="loginForm.email"
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
                  [(ngModel)]="loginForm.password"
                  name="password"
                  placeholder="masukkan password"
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

              <!-- Remember Me & Forgot Password -->
              <div class="form-options">
                <ion-checkbox 
                  [(ngModel)]="rememberMe"
                  name="rememberMe">
                </ion-checkbox>
                <ion-label>Ingat saya</ion-label>
                
                <ion-text color="primary">
                  <a (click)="forgotPassword()" class="forgot-link">Lupa password?</a>
                </ion-text>
              </div>

              <!-- Login Button -->
              <ion-button
                expand="block"
                type="submit"
                class="login-button"
                [disabled]="isLoading">
                {{isLoading ? 'Memproses...' : 'Masuk'}}
              </ion-button>
            </form>

            <!-- Divider -->
            <div class="divider">
              <span>atau</span>
            </div>

            <!-- Google Sign In -->
            <ion-button
              expand="block"
              fill="outline"
              class="google-button"
              (click)="signInWithGoogle()"
              [disabled]="isLoading">
              <ion-icon name="logo-google" slot="start"></ion-icon>
              Masuk dengan Google
            </ion-button>

            <!-- Register Link -->
            <div class="register-section">
              <ion-text color="medium">
                <p>Belum punya akun? 
                  <a (click)="navigateToRegister()" class="register-link">Daftar sekarang</a>
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

    ion-content.login-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
      --color: #333 !important;
      color: #333 !important;
    }

    ion-content.login-content::part(background) {
      background: var(--ergofit-background) !important;
    }

    ion-content.login-content::part(scroll) {
      background: var(--ergofit-background) !important;
    }

    .login-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
      --color: #333 !important;
      color: #333 !important;
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
      --color: var(--ergofit-primary);
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
      background: linear-gradient(135deg, var(--ergofit-primary), var(--ergofit-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-container p {
      font-size: 1rem;
      margin: 0;
      color: #666;
    }

    .auth-card {
      --background: var(--ergofit-card-background);
      --color: #333;
      border: var(--ergofit-card-border);
      box-shadow: var(--ergofit-card-shadow);
      border-radius: var(--ergofit-card-radius-lg);
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

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: var(--ergofit-spacing-lg) 0;
      font-size: 0.9rem;
    }

    .forgot-link {
      color: var(--ergofit-primary);
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .login-button {
      --background: var(--ergofit-primary);
      --border-radius: 12px;
      --padding-top: 16px;
      --padding-bottom: 16px;
      font-weight: 600;
      margin: var(--ergofit-spacing-lg) 0;
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
      background: var(--ergofit-background);
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

    .register-section {
      text-align: center;
      margin-top: var(--ergofit-spacing-md);
    }

    .register-link {
      color: var(--ergofit-primary);
      text-decoration: none;
      cursor: pointer;
      font-weight: 600;
    }

    .register-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .container {
        padding: var(--ergofit-spacing-md);
      }
      
      .logo-container h1 {
        font-size: 1.8rem;
      }
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

  constructor(private router: Router, private authService: AuthService) {
    addIcons({
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'logo-google': logoGoogle,
      'arrow-back-outline': arrowBackOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });
  }

  goBack() {
    this.router.navigate(['/get-started']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.showToastMessage('Mohon lengkapi email dan password', 'warning');
      return;
    }

    this.isLoading = true;
    
    try {
      const user = await this.authService.signIn(this.loginForm.email, this.loginForm.password);
      this.showToastMessage('Login berhasil!', 'success');
      
      // Navigate to dashboard after short delay
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      this.showToastMessage(error instanceof Error ? error.message : 'Login gagal. Periksa email dan password Anda.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;
    
    try {
      const user = await this.authService.signInWithGoogle();
      this.showToastMessage('Login dengan Google berhasil!', 'success');
      
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      this.showToastMessage(error instanceof Error ? error.message : 'Login dengan Google gagal.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  forgotPassword() {
    // TODO: Implement forgot password functionality
    this.showToastMessage('Fitur reset password akan segera tersedia.', 'primary');
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  private showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
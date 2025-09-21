import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FIREBASE_AUTH } from '../providers/firebase.providers';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(FIREBASE_AUTH);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {
    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        const userProfile: UserProfile = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || undefined,
          photoURL: user.photoURL || undefined,
          emailVerified: user.emailVerified
        };
        this.currentUserSubject.next(userProfile);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  get currentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Register new user with email and password
   */
  async register(email: string, password: string, name: string): Promise<UserProfile> {
    this.loadingSubject.next(true);
    
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Update user profile with display name
      if (credential.user) {
        await updateProfile(credential.user, {
          displayName: name
        });
      }

      const userProfile: UserProfile = {
        uid: credential.user.uid,
        email: credential.user.email!,
        displayName: name,
        photoURL: credential.user.photoURL || undefined,
        emailVerified: credential.user.emailVerified
      };

      this.currentUserSubject.next(userProfile);
      return userProfile;
      
    } catch (error: any) {
      console.error('Registration error:', error);
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<UserProfile> {
    this.loadingSubject.next(true);
    
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      
      const userProfile: UserProfile = {
        uid: credential.user.uid,
        email: credential.user.email!,
        displayName: credential.user.displayName || undefined,
        photoURL: credential.user.photoURL || undefined,
        emailVerified: credential.user.emailVerified
      };

      this.currentUserSubject.next(userProfile);
      return userProfile;
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<UserProfile> {
    this.loadingSubject.next(true);
    
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      const credential = await signInWithPopup(this.auth, provider);
      
      const userProfile: UserProfile = {
        uid: credential.user.uid,
        email: credential.user.email!,
        displayName: credential.user.displayName || undefined,
        photoURL: credential.user.photoURL || undefined,
        emailVerified: credential.user.emailVerified
      };

      this.currentUserSubject.next(userProfile);
      return userProfile;
      
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    this.loadingSubject.next(true);
    
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      this.router.navigate(['/get-started']);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Handle Firebase Auth errors and return user-friendly messages
   */
  private handleAuthError(error: any): Error {
    let message = 'Terjadi kesalahan. Silakan coba lagi.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'Email tidak terdaftar.';
        break;
      case 'auth/wrong-password':
        message = 'Password salah.';
        break;
      case 'auth/email-already-in-use':
        message = 'Email sudah terdaftar.';
        break;
      case 'auth/weak-password':
        message = 'Password terlalu lemah.';
        break;
      case 'auth/invalid-email':
        message = 'Format email tidak valid.';
        break;
      case 'auth/too-many-requests':
        message = 'Terlalu banyak percobaan. Coba lagi nanti.';
        break;
      case 'auth/user-disabled':
        message = 'Akun telah dinonaktifkan.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Login dengan Google dibatalkan.';
        break;
      case 'auth/popup-blocked':
        message = 'Popup diblokir. Mohon izinkan popup untuk login dengan Google.';
        break;
      case 'auth/network-request-failed':
        message = 'Koneksi internet bermasalah.';
        break;
      default:
        console.error('Unhandled auth error:', error);
    }
    
    return new Error(message);
  }

  /**
   * Check if user email is verified
   */
  isEmailVerified(): boolean {
    return this.currentUser?.emailVerified || false;
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }
}
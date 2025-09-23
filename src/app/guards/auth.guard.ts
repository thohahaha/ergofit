import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, filter, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([
    authService.currentUser$,
    authService.loading$
  ]).pipe(
    // Wait until initialization is complete (loading = false)
    filter(([user, loading]) => !loading),
    take(1),
    map(([user, loading]) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/get-started']);
        return false;
      }
    })
  );
};

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([
    authService.currentUser$,
    authService.loading$
  ]).pipe(
    // Wait until initialization is complete (loading = false)
    filter(([user, loading]) => !loading),
    take(1),
    map(([user, loading]) => {
      if (!user) {
        return true;
      } else {
        router.navigate(['/dashboard']);
        return false;
      }
    })
  );
};
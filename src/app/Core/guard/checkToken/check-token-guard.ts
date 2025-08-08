import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // SSR Check - Ensure running on Browser
  if (typeof window === 'undefined') {
    return true; // allow navigation on server-side rendering
  }

  const token = localStorage.getItem('userToken');

  if (token) {
    if (authService.userData.getValue() == null) {
      authService.decodeUserData();
    }
    router.navigate(['/home']);
    return false;
  }

  return true;
};


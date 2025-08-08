import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router"; 
import { Router } from '@angular/router';
import { AuthService } from "../../services/authService/auth-service";
 

export const authGuard: CanActivateFn = (route, state) => {
  let Auth: AuthService = inject(AuthService);
  let router = inject(Router);
  if (Auth.userData.getValue() !== null) {
    return true;
  }  
  router.navigate(['/auth/login'])
  return false;
};

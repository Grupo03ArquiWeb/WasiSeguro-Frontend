import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/authService';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.verificar()) {
    router.navigate(['/login']);
    return false;
  }
  const userRole = authService.showRole();

  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
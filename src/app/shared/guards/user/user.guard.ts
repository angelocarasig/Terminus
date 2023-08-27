import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from '../../services/user/user.service';

export const UserGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(UserService);

  authService.currentUser$.subscribe(
    currentUser => {
      if (currentUser == null) {
        router.navigate(['']).then(() => {
          return false;
        });
      }
    }
  );
  return true;
};

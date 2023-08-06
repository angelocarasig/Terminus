import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../../services/user/user.service';

export const UserGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(UserService);

  return authService.getCurrentUser() !== undefined;
};

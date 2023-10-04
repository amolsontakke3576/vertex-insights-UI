import { SocialAuthService } from '@abacritt/angularx-social-login';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../interfaces/general';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: SocialAuthService = inject(SocialAuthService);
  const router: Router = inject(Router);
  return authService.authState.pipe(
      map((socialUser: User) => !!socialUser),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          router.navigate(['login']);
        }
      })
    );
};

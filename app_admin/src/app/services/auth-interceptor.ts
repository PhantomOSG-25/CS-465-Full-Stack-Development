import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  // Do NOT attach token to login/register calls
  const isAuthEndpoint =
    req.url.includes('/api/login') || req.url.includes('/api/register');

  if (!authService.isLoggedIn() || isAuthEndpoint) {
    return next(req);
  }

  const token = authService.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};

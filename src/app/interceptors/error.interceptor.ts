import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.disconnect();
      }
      return throwError(() => error)
  }));
};

import {HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem("token");

    if (token && !req.url.includes("auth")) {
      req = req.clone({
        setHeaders: {
          "Authorization": `Bearer ${token}`
        }
      });
    }
  }

  return next(req)
};

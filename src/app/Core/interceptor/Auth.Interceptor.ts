import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // check if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      
      if (token) {
        // add the token to the headers
        const authReq = req.clone({
          headers: req.headers.set('token', token)
        });
        return next.handle(authReq);
      }
    }

    // if not in browser or no token, proceed with request as normal
    return next.handle(req);
  }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      const jwtToken = localStorage.getItem('token');
      if (!request.url.includes("/authenticate") && !request.url.includes("/register")) {
        const clonedRequest = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + jwtToken)
        });
        return next.handle(clonedRequest);
      }
      else {
        return next.handle(request);
      }

  }
}

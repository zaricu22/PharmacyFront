import {Injectable, OnDestroy} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse
} from '@angular/common/http';
import {catchError, Observable, Subscription, switchMap, tap} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {

  private readonly id;
  private refreshingToken: boolean = false;

  subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.id = new Date().getMilliseconds();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (
      request.url.includes("/authenticate") ||
      request.url.includes("/register")
    ) {
      return next.handle(request);
    }

    let jwtAccessToken = localStorage.getItem('access-token');
    let jwtRefreshToken = localStorage.getItem('refresh-token');
    let isAccessTokenExpired = false;
    let isRefreshTokenExpired = false;

    if (jwtAccessToken != null && jwtRefreshToken != null) {
      isAccessTokenExpired = this.authService.isTokenExpired(jwtAccessToken);
      isRefreshTokenExpired = this.authService.isTokenExpired(jwtRefreshToken);
    }
    else {
      return new Observable<HttpEvent<any>>();
    }

    if (
      !request.url.includes("/authenticate") &&
      !request.url.includes("/register") &&
      !request.url.includes("/refresh-token") &&
      !isAccessTokenExpired
    ) {
      console.log("USAO ANY REQUEST "+this.id+' '+request.url);
      const newRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + jwtAccessToken)
      });
      return next.handle(newRequest);
    }
    else if (isRefreshTokenExpired) {
      console.log("USAO DELETE ALL TOKENS");
      this.authService.logout();
      this.authService.revokeAllTokensLocally();
      this.router.navigate(['/login']);
      // Empty HTTP request (do nothing to prevent HTTP error)
      return new Observable<HttpEvent<any>>();
    }
    else if (request.url.includes("/refresh-token")) {
      console.log("USAO REFRESH TOKEN "+this.id);
      const newRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + jwtRefreshToken)
      });
      return next.handle(newRequest);
    }
    else if (isAccessTokenExpired && !isRefreshTokenExpired && !this.authService.isRefreshing()) {
      console.log('STARTED REFRESHING TOKEN... ' + this.id);
      this.authService.toggleRefreshingFlag();
      this.subscription$.add(
        this.authService.refreshToken()
        .subscribe(res => {
          jwtAccessToken = res.accessToken as string;
          jwtRefreshToken = res.refreshToken as string;
          this.authService.storeAllTokensLocally(jwtAccessToken, jwtRefreshToken);
          this.authService.toggleRefreshingFlag();
          this.router.navigate([this.router.url]);
        })
      );
      // Empty HTTP request (do nothing to prevent HTTP error)
      return new Observable<HttpEvent<any>>();
    }

    return new Observable<HttpEvent<any>>();
  }
}

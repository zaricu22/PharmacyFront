import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse} from "../models/authentication-response";
import {AuthenticationRequest} from "../models/authentication-request";
import {RegisterRequest} from "../models/register-request";
import {environment} from "../../../../environments/environment";
import {AuthenticationURL} from "../../constants/api-url";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  logInOutEvent = new EventEmitter<boolean>();
  refreshingProccessFlag: boolean = false;

  constructor(private http: HttpClient) {
    console.log("AuthenticationService "+new Date().getMilliseconds());
  }

  register(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
      (environment.apiUrl + AuthenticationURL.REGISTER, registerRequest);
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
      (environment.apiUrl + AuthenticationURL.AUTHENTICATE, authRequest);
  }

  emitLogInOutEvent() {
    this.logInOutEvent.emit(true);
  }

  logout() {
    this.emitLogInOutEvent()
    return this.http.post<any>
      (environment.apiUrl + AuthenticationURL.LOGOUT, null);
  }

  refreshToken() {
    return this.http.post<AuthenticationResponse>
    (environment.apiUrl + AuthenticationURL.REFRESH_TOKEN, null);
  }

  isRefreshing(): boolean {
    return this.refreshingProccessFlag;
  }
  toggleRefreshingFlag(): void {
    this.refreshingProccessFlag = !this.refreshingProccessFlag;
  }

  isLogged() {
    const token = localStorage.getItem("refresh-token");
    if (token != null) {
      return !this.isTokenExpired(token);
    }
    return false;
  }

  isTokenValid(token: string) {
    if (token != null) {
      return !this.isTokenExpired(token);
    }
    return  true;
  }

  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return ((Math.floor((new Date()).getTime() / 1000)) >= expiry);
  }

  storeAllTokensLocally(accessToken: string, refreshToken: string) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  revokeAllTokensLocally() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
}

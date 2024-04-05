import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

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
}

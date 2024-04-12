import {Component, OnDestroy} from '@angular/core';
import {AuthenticationRequest} from "../../models/authentication-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {AuthenticationService} from "../../services/authentication.service";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {Subscription} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ]
})
export class LoginComponent implements OnDestroy {
  authRequest: AuthenticationRequest = {} as AuthenticationRequest;
  authResponse: AuthenticationResponse = {} as AuthenticationResponse;

  subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  authenticate() {
    this.subscription$.add(
      this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          localStorage.setItem('access-token', response.accessToken as string);
          localStorage.setItem('refresh-token', response.refreshToken as string);
          this.authService.emitLogInOutEvent();
          this.router.navigate(['product']);
        }
      })
    );
  }
}

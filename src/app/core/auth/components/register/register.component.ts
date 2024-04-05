import { Component } from '@angular/core';
import {RegisterRequest} from "../../models/register-request";
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
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
    MatListModule,
    MatSnackBarModule
  ]
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {} as RegisterRequest;
  authResponse: AuthenticationResponse = {} as AuthenticationResponse;
  message = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string, config?: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

  register() {
    this.message = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (response) {
            this.openSnackBar('Success: You will be redirected to the Login page in 3 seconds', "OK", {"duration": 3000});
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000)
          }
        },
        error: (err: HttpErrorResponse) => {
          this.openSnackBar(err.error.message, "CANCEL", {"duration": 3000})
        }
      });

  }
}

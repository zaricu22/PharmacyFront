import {Component, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from "../../auth/services/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationURL} from "../../constants/api-url";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sidenavStatus: boolean = false;
  @Output() messageToSidenav = new EventEmitter<boolean>();

  loginURL: string = AuthenticationURL.LOGIN;
  registerURL: string = AuthenticationURL.REGISTER;
  logoutURL: string = AuthenticationURL.LOGOUT;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  sendMessageToSidenav() {
    this.sidenavStatus = !this.sidenavStatus;
    this.messageToSidenav.emit(this.sidenavStatus)
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.logout()
      .subscribe({
        next: (response) => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      });
  }
}

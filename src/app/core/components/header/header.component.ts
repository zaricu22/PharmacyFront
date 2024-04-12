import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  EventEmitter, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {AuthenticationService} from "../../auth/services/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationURL} from "../../constants/api-url";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  sidenavStatus: boolean = false;
  @Output() messageToSidenav = new EventEmitter<boolean>();
  isLogged: boolean = false;

  loginURL: string = AuthenticationURL.LOGIN;
  registerURL: string = AuthenticationURL.REGISTER;
  logoutURL: string = AuthenticationURL.LOGOUT;

  subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit () {
    this.subscription$.add(
      this.authService.logInOutEvent
      .subscribe(e => {
        this.isLogged = this.authService.isLogged();
        this.changeDetector.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  sendMessageToSidenav() {
    this.sidenavStatus = !this.sidenavStatus;
    this.messageToSidenav.emit(this.sidenavStatus)
  }

  logout() {
    this.subscription$.add(
      this.authService.logout()
        .subscribe({
          next: (response) => {
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            this.authService.emitLogInOutEvent();
            this.router.navigate(['login']);
          }
        })
    );
  }
}

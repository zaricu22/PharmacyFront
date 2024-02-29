import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sidenavStatus: boolean = false;
  @Output() messageToSidenav = new EventEmitter<boolean>();

  sendMessageToSidenav() {
    this.sidenavStatus = !this.sidenavStatus;
    this.messageToSidenav.emit(this.sidenavStatus)
  }
}

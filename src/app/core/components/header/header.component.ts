import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {MatButtonModule} from "@angular/material/button";


@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    SidenavComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HeaderComponent {
  sidenavStatus: boolean = false;
  @Output() messageToSidenav = new EventEmitter<boolean>();

  sendMessageToSidenav() {
    this.sidenavStatus = !this.sidenavStatus;
    this.messageToSidenav.emit(this.sidenavStatus)
  }
}

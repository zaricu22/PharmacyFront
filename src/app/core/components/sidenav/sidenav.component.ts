import {Component, Input} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterModule} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [
    RouterModule,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ]
})
export class SidenavComponent {
  @Input() messageFromHeader: boolean = false;
}

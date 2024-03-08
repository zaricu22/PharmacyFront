import { NgModule } from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterModule} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  imports: [
    RouterModule,
    RouterLink,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ]
})
export class CoreModule { }

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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./auth/interceptors/token.interceptor";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,

    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ]
})
export class CoreModule { }

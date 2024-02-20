import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterLink, RouterModule} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { MatButtonModule} from "@angular/material/button";
import {provideHttpClient} from "@angular/common/http";


// Only because used Material's Sidenav in AppComponent which expects
// BrowserModule eagerly(non-lazy) loaded
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    RouterModule,
    RouterLink,

    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

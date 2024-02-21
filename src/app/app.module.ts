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
import { NgChartsModule } from 'ng2-charts';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    MatNativeDateModule,

    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {provideHttpClient} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    AppRoutingModule,

    MatNativeDateModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

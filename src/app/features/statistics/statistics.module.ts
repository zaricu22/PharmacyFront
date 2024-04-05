import { NgModule } from '@angular/core';
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../../core/auth/interceptors/token.interceptor";

@NgModule({
  declarations: [],
  imports: [ StatisticsRoutingModule, HttpClientModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class StatisticsModule { }

import { NgModule } from '@angular/core';
import {ProductRoutingModule} from "./product-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../../core/auth/interceptors/token.interceptor";

@NgModule({
  declarations: [],
  imports: [ ProductRoutingModule, HttpClientModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class ProductModule { }

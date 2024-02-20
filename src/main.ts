import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
// import routes from "./app/app.routes";
import {AppModule} from "./app/app.module";


// We must use non-standalone bootstrapApp because of Material Sidenav
// which expects BrowserModule to be eagerly(non-lazy) loaded
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*
bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes)]
}).catch(err => console.error(err));
*/



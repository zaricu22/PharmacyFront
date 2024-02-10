import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "./components/product-view/product-view.component";
import {AboutViewComponent} from "./components/about-view/about-view.component";

const routes: Routes = [
  { path: "prodview", component: ProductViewComponent },
  { path: "abtview", component: AboutViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "../product/components/product-view/product-view.component";
import {AboutViewComponent} from "../about/components/about-view/about-view.component";

const routes: Routes = [
  { path: "prodview", loadComponent: () => import('../product/components/product-view/product-view.component')
      .then((x) => x.ProductViewComponent) },
  { path: "abtview", loadComponent: () => import('../about/components/about-view/about-view.component')
      .then((x) => x.AboutViewComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

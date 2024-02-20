import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: "product", loadChildren: () => import('./product/product.module')
      .then((x) => x.ProductModule) },
  { path: "about", loadChildren: () => import('./about/about.module')
      .then((x) => x.AboutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

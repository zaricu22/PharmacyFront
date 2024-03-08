import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: "product", loadChildren: () => import('./features/product/product.module')
      .then((x) => x.ProductModule) },
  { path: "statistics", loadChildren: () => import('./features/statistics/statistics.module')
      .then((x) => x.StatisticsModule) },
  { path: 'about', loadComponent: () => import('./core/components/about/about-view.component')
      .then((x) => x.AboutViewComponent)  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

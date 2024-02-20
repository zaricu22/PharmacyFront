import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "../product/components/product-view/product-view.component";
import {AboutViewComponent} from "../about/components/about-view/about-view.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";

const statisticsRoutes: Routes = [
  { path: '', loadComponent: () => import('./components/statistics/statistics.component')
      .then((x) => x.StatisticsComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(statisticsRoutes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }

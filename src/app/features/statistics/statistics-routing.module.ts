import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const statisticsRoutes: Routes = [
  { path: '', loadComponent: () => import('./components/statistics/statistics.component')
      .then((x) => x.StatisticsComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(statisticsRoutes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const aboutRoutes: Routes = [
  { path: '', loadComponent: () => import('./components/about-view/about-view.component')
      .then((x) => x.AboutViewComponent)  }
];

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

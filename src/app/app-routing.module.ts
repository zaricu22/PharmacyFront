import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard, nonAuthGuard} from "./core/auth/guards/auth.guard";

const appRoutes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '' },
  { path: "login",
    loadComponent: () => import('./core/auth/components/login/login.component')
      .then((x) => x.LoginComponent),
    canActivate: [nonAuthGuard]
  },
  { path: "register",
    loadComponent: () => import('./core/auth/components/register/register.component')
      .then((x) => x.RegisterComponent),
    canActivate: [nonAuthGuard]
  },
  { path: "product",
    loadChildren: () => import('./features/product/product.module')
      .then((x) => x.ProductModule),
    canActivate: [authGuard]
  },
  { path: "statistics",
    loadChildren: () => import('./features/statistics/statistics.module')
      .then((x) => x.StatisticsModule),
    canActivate: [authGuard]
  },
  { path: 'about',
    loadComponent: () => import('./core/components/about/about-view.component')
      .then((x) => x.AboutViewComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

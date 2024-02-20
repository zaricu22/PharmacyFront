import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const productRoutes: Routes = [
    { path: '', loadComponent: () => import('./components/product-view/product-view.component')
        .then((x) => x.ProductViewComponent) },
    { path: "create", loadComponent: () => import('./components/product-create/product-create.component')
        .then((x) => x.ProductCreateComponent) },
    { path: "edit", loadComponent: () => import('./components/product-edit/product-edit.component')
        .then((x) => x.ProductEditComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const productRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

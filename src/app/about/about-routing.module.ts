import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "../product/components/product-view/product-view.component";
import {AboutViewComponent} from "../about/components/about-view/about-view.component";

const aboutRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

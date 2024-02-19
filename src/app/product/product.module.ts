import { NgModule } from '@angular/core';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';


// Only because used Material's Sidenav in AppComponent which expects
// BrowserModule eagerly(non-lazy) loaded
@NgModule({
  declarations: [
    ProductEditComponent,
    ProductCreateComponent
  ],
  imports: [],
  providers: [],
  bootstrap: []
})
export class ProductModule { }

import { Component } from '@angular/core';
import {ProductDialogComponent} from "../../../../shared/components/product-dialog/product-dialog.component";

@Component({
  standalone: true,
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  imports: [
    ProductDialogComponent
  ]
})
export class ProductCreateComponent {}

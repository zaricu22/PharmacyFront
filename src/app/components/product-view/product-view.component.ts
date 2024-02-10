import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { IManufacturer } from '../../interfaces/imanufacturer';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  products: Array<IProduct> = this.prodService.getProdList();
  displayedColumns: string[] = ['Name','Manufacturer Name','Price','Expiry Date','Edit','Delete'];

  constructor(private prodService: ProductService) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}

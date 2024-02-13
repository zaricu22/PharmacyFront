import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from "../../services/product.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  products: Array<IProduct> = [];

  subscription1: Subscription;

  @ViewChild('paginator')
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns: string[] = ['name','manufacturer.name','price','expiryDate','Edit','Delete'];
  dataSource: MatTableDataSource<IProduct>;

  constructor(private prodService: ProductService) {}

  ngOnInit() {
    this.subscription1 = this.prodService.getProdList().subscribe((res: Array<IProduct>) => {
      this.products = res
      this.dataSource = new MatTableDataSource<IProduct>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

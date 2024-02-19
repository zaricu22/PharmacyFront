import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IProduct } from '../../../core/models/iproduct';
import { ProductService } from "../../../about/services/product.service";
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  imports:[CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule]
})
export class ProductViewComponent implements OnInit, OnDestroy {
  products: Array<IProduct> = [];

  subscription1: Subscription = new Subscription;

  @ViewChild('paginator')
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl, ChangeDetectorRef.prototype);
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['name','manufacturer.name','price','expiryDate','Edit','Delete'];
  dataSource: MatTableDataSource<IProduct> = new MatTableDataSource;

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

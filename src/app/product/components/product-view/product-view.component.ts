import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IProduct } from '../../../core/models/iproduct';
import { ProductService } from "../../services/product.service";
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { HttpResponse } from "@angular/common/http";
import {RouterLink, Router, NavigationExtras} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  imports:[
    RouterLink,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule]
})
export class ProductViewComponent implements OnInit, OnDestroy {
  products: Array<IProduct> = [];

  subscription1: Subscription = new Subscription;
  subscription2: Subscription = new Subscription;
  subscription3: Subscription = new Subscription;

  @ViewChild('paginator')
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl, ChangeDetectorRef.prototype);
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['name','manufacturer.name','price','expiryDate','Edit','Delete'];
  dataSource: MatTableDataSource<IProduct> = new MatTableDataSource;

  constructor(private prodService: ProductService, private router: Router) {}

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
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProd(id: string){
    this.subscription1 = this.prodService.deleteProd(id).subscribe((res: HttpResponse<any>) => {
      if(res.status == 200){
        let filteredTableData = this.dataSource.data.filter(value => value.id !== id);
        this.dataSource.data = filteredTableData;
      }
    });
  }

  navigateToEditPage(productId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "productId": productId
      }
    };
    this.router.navigate(["product/edit"], navigationExtras);
  }
}

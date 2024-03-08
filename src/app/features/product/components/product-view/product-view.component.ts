import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { RouterLink, Router, NavigationExtras } from "@angular/router";
import { IProduct } from '../../../../core/models/iproduct';
import { ProductService } from "../../services/product.service";
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

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
    MatInputModule,
    MatSnackBarModule
  ]
})
export class ProductViewComponent implements OnInit, OnDestroy {
  @ViewChild('paginator')
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl, ChangeDetectorRef.prototype);
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  noMoreLazyData: boolean = false;

  products: Array<IProduct> = [];
  subscription$: Subscription = new Subscription;
  displayedColumns: string[] = ['name','manufacturer.name','price','expiryDate','Edit','Delete'];
  dataSource: MatTableDataSource<IProduct> = new MatTableDataSource;

  constructor(private prodService: ProductService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscription$.add(
      this.prodService.getProdPage(0, 10).subscribe(
        {
          next: (res: Array<IProduct>) => {
            if(res.length < 10)
              this.noMoreLazyData = true;
            this.products = res
            this.dataSource = new MatTableDataSource<IProduct>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err: HttpErrorResponse) => {
            this.openSnackBar(err.error.message, "CANCEL")
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToEditPage(productId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "productId": productId
      }
    };
    this.router.navigate(["product/edit"], navigationExtras);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  pageChanged(event: PageEvent){
    let pageIndex: number = event.pageIndex;
    let pageSize: number = event.pageSize;
    let dataLength: number = event.length;

    let isLastLoadedPage: boolean = pageIndex == Math.ceil(dataLength/pageSize)-1;
    let hasEnoughDataOnNextPage: boolean = dataLength >= pageSize*2;
    let lazyDataPageSize: number = !hasEnoughDataOnNextPage ? pageSize*2 : pageSize;
    let newLazyDataEndIndex = pageIndex > 0 ? (pageIndex+2)*pageSize : pageSize*2;
    let lazyDataPageIndex = pageIndex > 0 ?  pageIndex + 1 : pageIndex;
    let hasNewLazyData: boolean = dataLength <= newLazyDataEndIndex;

    if((isLastLoadedPage || hasNewLazyData) && !this.noMoreLazyData) {
      this.subscription$.add(
        this.prodService.getProdPage(lazyDataPageIndex, lazyDataPageSize).subscribe(
          {
            next: (res: Array<IProduct>) => {
              if(pageIndex == 0){
                let onlyNewItems: Array<IProduct>  = res.slice(dataLength, res.length);
                onlyNewItems.forEach(
                  item => {
                    this.dataSource.data.push(item);
                  }
                )
              } else {
                res.forEach(
                  item => {
                    this.dataSource.data.push(item);
                  }
                )
              }
              this.dataSource.data = this.dataSource.data;

              if(this.dataSource.data.length < newLazyDataEndIndex)
                this.noMoreLazyData = true;
            },
            error: (err: HttpErrorResponse) => {
              this.openSnackBar(err.error.message, "CANCEL")
            }
          }
        )
      );
    }
  }

  deleteProd(id: string){
    this.subscription$.add(
      this.prodService.deleteProd(id).subscribe(
        {
          next: (res: HttpResponse<any>) => {
            if (res.status == 204) {
              let filteredTableData = this.dataSource.data.filter(value => value.id !== id);
              this.dataSource.data = filteredTableData;
              this.openSnackBar("Product successfully removed!", "OK");
            }
          },
          error: (err: HttpErrorResponse) => {
            this.openSnackBar(err.error.message, "CANCEL")
          }
        }
      )
    );
  }
}

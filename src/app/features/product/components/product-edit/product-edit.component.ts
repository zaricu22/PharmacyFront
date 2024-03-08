import { Component } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { IProduct } from "../../../../core/models/iproduct";
import { IManufacturer } from "../../../../core/models/imanufacturer";
import { ProductDialogComponent } from "../../../../shared/components/product-dialog/product-dialog.component";
import { ManufacturerService } from "../../../../core/services/manufacturer.service";
import { ProductService } from "../../services/product.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  standalone: true,
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [
    ProductDialogComponent,
    MatSnackBarModule,
    AsyncPipe
  ]
})
export class ProductEditComponent {
  productId = '';
  fetchedProduct$: Observable<IProduct> = new Observable<IProduct>();
  manufacturers$: Observable<Array<IManufacturer>> = new Observable<Array<IManufacturer>>();

  private subscription$: Subscription = new Subscription;

  constructor(
      private manuService: ManufacturerService,
      private prodService: ProductService,
      private route: ActivatedRoute,
      private _snackBar: MatSnackBar
  ) {
    this.subscription$.add(
      this.route.queryParams.subscribe(params => {
        this.productId = params["productId"];
      })
    );
  }

  ngOnInit() {
    this.manufacturers$ = this.manuService.getManuList();
    this.fetchedProduct$ = this.prodService.getProdById(this.productId);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit(submitedProduct: IProduct) {
    this.subscription$.add(
      this.prodService.updateProd(submitedProduct.id, submitedProduct).subscribe(
        {
          next: (res: IProduct) => {
            this.openSnackBar("Product successfully updated!", "OK");
          },
          error: (err: HttpErrorResponse) => {
            this.openSnackBar(err.error.message, "CANCEL")
          }
        }
      )
    );
  }
}

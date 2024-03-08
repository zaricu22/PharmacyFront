import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { IProduct } from "../../../../core/models/iproduct";
import { IManufacturer } from "../../../../core/models/imanufacturer";
import { ProductDialogComponent } from "../../../../shared/components/product-dialog/product-dialog.component";
import { Observable, Subscription } from "rxjs";
import { ManufacturerService } from "../../../../core/services/manufacturer.service";
import { ProductService } from "../../services/product.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  standalone: true,
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  imports: [
    ProductDialogComponent,
    MatSnackBarModule,
    AsyncPipe
  ]
})
export class ProductCreateComponent implements OnInit, OnDestroy  {
  manufacturers$: Observable<Array<IManufacturer>> = new Observable<Array<IManufacturer>>();

  private subscription$: Subscription = new Subscription;

  constructor(
      private manuService: ManufacturerService,
      private prodService: ProductService,
      private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.manufacturers$ = this.manuService.getManuList();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit(submitedProduct: IProduct) {
    this.subscription$.add(
      this.prodService.saveProd(submitedProduct).subscribe(
        {
          next: (res: IProduct) => {
            this.openSnackBar("Product successfully added!", "OK")
          },
          error: (err: HttpErrorResponse) => {
            this.openSnackBar(err.error.message, "CANCEL")
          }
        }
      )
    );
  }
}

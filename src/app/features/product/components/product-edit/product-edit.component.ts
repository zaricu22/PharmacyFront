import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductDialogComponent } from "../../../../shared/components/product-dialog/product-dialog.component";
import { IProduct } from "../../../../core/models/iproduct";
import { IManufacturer } from "../../../../core/models/imanufacturer";
import { ManufacturerService } from "../../../../core/services/manufacturer.service";
import { ProductService } from "../../services/product.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [
    ProductDialogComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule
  ]
})
export class ProductEditComponent {
  productId = '';
  fetchedProduct$: Observable<IProduct> = new Observable<IProduct>();
  editedProduct: IProduct | null = null;
  name: string = "";
  price: number = 0;
  date: Date = new Date();
  manufacturer: string = "";
  manus: Array<IManufacturer> = [];

  private subscription$: Subscription = new Subscription;

  constructor(private manuService: ManufacturerService,
              private prodService: ProductService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar)
  {
    this.route.queryParams.subscribe(params => {
      this.productId = params["productId"];
    });
  }

  ngOnInit() {
    this.subscription$.add(
      this.manuService.getManuList().subscribe(
        {
          next: (res: Array<IManufacturer>) => {
            this.manus = res
          },
          error: (err: HttpErrorResponse) => {
            this.openSnackBar(err.error.message, "CANCEL")
          }
        }
      )
    );
    this.fetchedProduct$ = this.prodService.getProdById(this.productId);
    this.subscription$.add(
      this.fetchedProduct$.subscribe(
        {
          next: (res: IProduct) => {
            this.editedProduct = res;
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    this.subscription$.add(
      this.prodService.updateProd(this.productId, this.editedProduct!).subscribe(
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

import {Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { IProduct } from "../../../core/models/iproduct";
import { IManufacturer } from "../../../core/models/imanufacturer";
import { ProductService } from "../../../product/services/product.service";
import { ManufacturerService } from "../../../core/services/manufacturer.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  standalone: true,
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
  imports: [
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
export class ProductDialogComponent implements OnInit, OnDestroy {
  product: IProduct = { id: "", name: "", price: 0, manufacturer: { id: "", name: "" }, expiryDate: new Date };
  name: string = "";
  price: number = 0;
  date: Date = new Date();
  manufacturer: string = "";
  manus: Array<IManufacturer> = [];

  private subscription$: Subscription = new Subscription;

  constructor(private manuService: ManufacturerService, private prodService: ProductService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscription$.add(
      this.manuService.getManuList().subscribe((res: Array<IManufacturer>) => {
        this.manus = res
      })
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
      this.prodService.saveProd(this.product).subscribe((res: IProduct) => {
        this.openSnackBar("Product successfully added!", "OK");
      })
    );
  }
}

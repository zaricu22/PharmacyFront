import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {IProduct} from "../../../core/models/iproduct";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {ProductService} from "../../../product/services/product.service";
import {ManufacturerService} from "../../../core/services/manufacturer.service";
import {IManufacturer} from "../../../core/models/imanufacturer";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

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

  private subscription1: Subscription = new Subscription;
  private subscription2: Subscription = new Subscription;

  constructor(private manuService: ManufacturerService, private prodService: ProductService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscription1 = this.manuService.getManuList().subscribe((res: Array<IManufacturer>) => {
      this.manus = res
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onSubmit() {
    this.subscription1 = this.prodService.saveProd(this.product).subscribe((res: IProduct) => {
      this.openSnackBar("Successfully added product!", "OK");
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

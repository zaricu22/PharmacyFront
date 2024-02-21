import { Component } from '@angular/core';
import {ProductDialogComponent} from "../../../shared/components/product-dialog/product-dialog.component";
import {IProduct} from "../../../core/models/iproduct";
import {IManufacturer} from "../../../core/models/imanufacturer";
import {Observable, Subscription} from "rxjs";
import {ManufacturerService} from "../../../core/services/manufacturer.service";
import {ProductService} from "../../services/product.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {ActivatedRoute } from "@angular/router";

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

  private subscription1: Subscription = new Subscription;
  private subscription2: Subscription = new Subscription;

  constructor(private manuService: ManufacturerService,
              private prodService: ProductService,
              private _snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.productId = params["productId"];
    });
  }

  ngOnInit() {
    this.subscription1 = this.manuService.getManuList().subscribe((res: Array<IManufacturer>) => {
      this.manus = res
    });
    this.fetchedProduct$ = this.prodService.getProdById(this.productId);
    this.fetchedProduct$.subscribe((res: IProduct) => {
      this.editedProduct = res;
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onSubmit() {
      this.subscription1 = this.prodService.updateProd(this.productId, this.editedProduct!).subscribe((res: IProduct) => {
        this.openSnackBar("Successfully added product!", "OK");
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

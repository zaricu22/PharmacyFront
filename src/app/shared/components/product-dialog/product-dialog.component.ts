import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IProduct } from "../../../core/models/iproduct";
import { IManufacturer } from "../../../core/models/imanufacturer";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";

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
    MatListModule
  ]
})
export class ProductDialogComponent {
  @Input() product: IProduct | null = { id:"",name:"",manufacturer:{id:"",name:""},expiryDate: new Date,price:0 };
  @Input() manufacturers: Array<IManufacturer> | null = new Array<IManufacturer>();
  @Output() submitEvent = new EventEmitter<IProduct>;

  onSubmit(){
    this.submitEvent.emit(this.product!);
  }
}

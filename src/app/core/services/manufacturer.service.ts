import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IManufacturer} from "../models/imanufacturer";
import {IProduct} from "../models/iproduct";
import {ProductNumberDTO} from "../dto/product-number-dto";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) {}

  getManuList(): Observable<Array<IManufacturer>> {
    return this.http.get<Array<IManufacturer>>(environment.apiUrl + '/manufacturers');
  }

  countProductsByManus(): Observable<Array<ProductNumberDTO>> {
    return this.http.get<Array<ProductNumberDTO>>(environment.apiUrl + '/manufacturers/products');
  }
}

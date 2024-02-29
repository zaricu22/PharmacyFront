import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IManufacturer} from "../models/imanufacturer";
import {ProductNumberDTO} from "../dto/product-number-dto";
import {CoreModule} from "../core.module";

@Injectable({
  providedIn: CoreModule
})
export class ManufacturerService {

  constructor(private http: HttpClient) {}

  getManuList(): Observable<Array<IManufacturer>> {
    return this.http.get<Array<IManufacturer>>(environment.apiUrl + '/manufacturers');
  }

  countProductsByManus(): Observable<Array<ProductNumberDTO>> {
    let params = new HttpParams()
      .set('countOnly', true);

    return this.http.get<Array<ProductNumberDTO>>(environment.apiUrl + '/manufacturers/products', { params: params });
  }
}

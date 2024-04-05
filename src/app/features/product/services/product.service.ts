import { Injectable } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ProductModule} from "../product.module";
import {ProductURL} from "../../../core/constants/api-url";

@Injectable({
  providedIn: ProductModule
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProdList(): Observable<Array<IProduct>> {
      return this.http.get<Array<IProduct>>(environment.apiUrl + '/products');
  }

  getProdPage(pageNumber: number, pageSize: number): Observable<Array<IProduct>> {
    let params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize);

    return this.http.get<Array<IProduct>>(environment.apiUrl + ProductURL.GET_PRODUCTS, { params: params });
  }

  getProdById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(environment.apiUrl + ProductURL.GET_PRODUCTS_BY + id);
  }

  saveProd(prod: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(environment.apiUrl + ProductURL.SAVE_PRODUCT, prod);
  }

  updateProd(id: string, prod: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(environment.apiUrl + ProductURL.UPDATE_PRODUCT + id, prod);
  }

  deleteProd(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + ProductURL.DELETE_PRODUCT + id, {observe: 'response'});
  }
}

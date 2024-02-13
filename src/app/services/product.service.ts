import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prods: Array<IProduct> = [];

  constructor(private http: HttpClient) {}

  getProdList(): Observable<Array<IProduct>> {
      return this.http.get<Array<IProduct>>(environment.apiUrl + '/getAllProducts');
  }
}

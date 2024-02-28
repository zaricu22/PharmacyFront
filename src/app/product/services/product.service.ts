import { Injectable } from '@angular/core';
import { IProduct } from '../../core/models/iproduct';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProdList(): Observable<Array<IProduct>> {
      return this.http.get<Array<IProduct>>(environment.apiUrl + '/products');
  }

  getProdPage(pageNumber: number, pageSize: number): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(
      environment.apiUrl +
          '/products/' +
          pageNumber + '/' +
          pageSize
    );
  }

  getProdPageSorted(pageNumber: number, pageSize: number, sortBy: string, sortDir: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(
      environment.apiUrl +
          '/products/' +
          pageNumber + '/' +
          pageSize + '/' +
          pageSize + '/' +
          pageSize
    );
  }

  getProdById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(environment.apiUrl + '/products/'+ id);
  }

  getProdFiveMostExpensive(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(environment.apiUrl + '/products/price/top-five');
  }

  getProdFiveLeastExpensive(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(environment.apiUrl + '/products/price/least-five');
  }

  saveProd(prod: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(environment.apiUrl + '/products', prod);
  }

  updateProd(id: string, prod: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(environment.apiUrl + '/products/' + id, prod);
  }

  deleteProd(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + '/products/' + id, {observe: 'response'});
  }
}

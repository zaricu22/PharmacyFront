import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../../../core/models/iproduct";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {StatisticsModule} from "../statistics.module";
import {StatisticURL} from "../../../core/constants/api-url";

@Injectable({
  providedIn: StatisticsModule
})
export class StatisticService {

  constructor(private http: HttpClient) {}

  getFiveProdOrderByPrice(orderDir: string): Observable<Array<IProduct>> {
    let params = new HttpParams()
      .set('orderDir', orderDir)

    return this.http.get<Array<IProduct>>(environment.apiUrl + StatisticURL.GET_PRODUCTS_ORDER_BY, { params: params });
  }

  getProdFiveLeastExpensive(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(environment.apiUrl + StatisticURL.GET_PRODUCTS_BY_PRICE);
  }
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../../../core/models/iproduct";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {StatisticsModule} from "../statistics.module";

@Injectable({
  providedIn: StatisticsModule
})
export class StatisticService {

  constructor(private http: HttpClient) {}

  getFiveProdOrderByPrice(orderDir: string): Observable<Array<IProduct>> {
    let params = new HttpParams()
      .set('orderDir', orderDir)

    return this.http.get<Array<IProduct>>(environment.apiUrl + '/products', { params: params });
  }

  getProdFiveLeastExpensive(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(environment.apiUrl + '/products/price/least-five');
  }
}

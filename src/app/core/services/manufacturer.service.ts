import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IManufacturer} from "../models/imanufacturer";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) {}

  getManuList(): Observable<Array<IManufacturer>> {
    return this.http.get<Array<IManufacturer>>(environment.apiUrl + '/manufacturers');
  }
}

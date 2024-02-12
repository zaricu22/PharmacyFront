import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { IManufacturer } from '../interfaces/imanufacturer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prods: Array<IProduct> = [];

  constructor() {
    let manu1: IManufacturer = { id: "0", name: "Galenika" };
    let manu2: IManufacturer = { id: "1", name: "Hemofarm" };
    let prod1: IProduct = { id: "0", name: "Oligovit", manufacturer:  manu1, price: 800, expiryDate: new Date('2024-05-26') };
    let prod2: IProduct = { id: "1", name: "Beviplex", manufacturer: manu1, price: 240, expiryDate: new Date('2024-07-19') };
    let prod3: IProduct = { id: "2", name: "Pantenol", manufacturer: manu1, price: 450, expiryDate: new Date('2025-08-26') };
    let prod4: IProduct = { id: "3", name: "Defrinol", manufacturer: manu1, price: 360, expiryDate: new Date('2026-03-05') };
    let prod5: IProduct = { id: "4", name: "Flonivin", manufacturer: manu1, price: 730, expiryDate: new Date('2026-04-13') };
    let prod6: IProduct = { id: "5", name: "Magnetrans", manufacturer: manu2, price: 390, expiryDate: new Date('2025-05-21') };
    let prod7: IProduct = { id: "6", name: "Febricet", manufacturer: manu2, price: 940, expiryDate: new Date('2026-02-07') };
    let prod8: IProduct = { id: "7", name: "Midol", manufacturer: manu2, price: 670, expiryDate: new Date('2025-08-30') };
    let prod9: IProduct = { id: "8", name: "Panlax", manufacturer: manu2, price: 790, expiryDate: new Date('2027-03-02') };
    this.prods = [ prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9 ];
  }

  ngOnInit(): void {

  }

  getProdList(): Array<IProduct> {
    return this.prods;
  }
}

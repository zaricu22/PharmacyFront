import {IManufacturer} from "./imanufacturer";

export interface IProduct {
  id: string;
  name: string;
  manufacturer: IManufacturer;
  price: number;
  expiryDate: Date;
}

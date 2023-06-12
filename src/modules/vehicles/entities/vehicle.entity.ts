import { randomUUID } from "crypto";
import { Url } from "url";

export class Vehicle {
  readonly id: string;
  brand: string;
  model: string;
  year: string;
  km: string;
  color: string;
  fipe_price: number;
  price: number;
  description: string;
  cover_img: Url;
  gallery_id: string[];

  constructor() {
    this.id = randomUUID();
  }
}

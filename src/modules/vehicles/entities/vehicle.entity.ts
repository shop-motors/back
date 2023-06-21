import { randomUUID } from "crypto";
import { Gallery } from "src/modules/gallery/entities/gallery.entity";
import { User } from "src/modules/users/entities/user.entity";


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
  cover_img: string; // if cover_img is a URL, you can use Url type, otherwise use string
  user: User;
  gallery: Gallery[]; // an array of Gallery entities

  constructor() {
    this.id = randomUUID();
  }
}

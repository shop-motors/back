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
  cover_img: string; 
  user: User;
  gallery: Gallery[]; 

  constructor() {
    this.id = randomUUID();
  }
}

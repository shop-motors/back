import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  cpf: string;
  phone: string;
  birth_date: number;
  description: string;

  constructor() {
    this.id = randomUUID();
  }
}

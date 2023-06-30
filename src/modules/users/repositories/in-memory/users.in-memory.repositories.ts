/* eslint-disable prettier/prettier */
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInMemoryRepository implements UsersRepository {
  
  
  private database: User[] = [];
  create(data: CreateUserDto): User | Promise<User> {
    const newUser = new User();
    Object.assign({
      ...data,
    });
    this.database.push(newUser);
    return plainToInstance(User, newUser);
  }

  findAll(): User[] | Promise<User[]> {
    return plainToInstance(User, this.database);
  }
  findOne(id: string): User | Promise<User> {
    const user = this.database.find((user) => user.id == id);
    return plainToInstance(User, user);
  }

  findByEmail(email: string): User | Promise<User> {
    const user = this.database.find((user) => user.email == email);
    return plainToInstance(User, user);
  }

  findByToken(email: string): User | Promise<User> {
    throw new Error('Method not implemented.');
  }
  
  update(id: string, data: UpdateUserDto): User | Promise<User> {
    const userIndex = this.database.findIndex(user => user.id == id);
    this.database[userIndex] = {
      ...this.database[userIndex],
      ...data,
    };
    return plainToInstance(User, this.database[userIndex]);
  }
  delete(id: string): void | Promise<void> {
    const userIndex = this.database.findIndex(user => user.id == id);
    this.database.splice(userIndex, 1)
  }

  updatePassword(id: string, password: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateToken(email: string, resetToken: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}

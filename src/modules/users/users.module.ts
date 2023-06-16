/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserInMemoryRepository } from './repositories/in-memory/users.in-memory.repositories';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from 'src/database/prisma.services';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UserInMemoryRepository,
    },
  ],
})
export class UsersModule {}

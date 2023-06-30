/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from 'src/database/prisma.services';
import { UsersPrismaRepository } from './repositories/prisma/user-prisma.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/utils/mail.services';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host:'smtp.gmail.com',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      },
      defaults: {
        from: 'gabiru.ortiz12@gmail.com'
      }
    })
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    MailService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },  
  ],
  exports: [UsersService],
})
export class UsersModule {}

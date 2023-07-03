/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    VehiclesModule,
    GalleryModule,
    AuthModule,
    CommentsModule,
  ],
})
export class AppModule {}

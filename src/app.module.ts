/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { GalleryModule } from './modules/gallery/gallery.module';

@Module({
  imports: [UsersModule, VehiclesModule, GalleryModule],
})
export class AppModule {}

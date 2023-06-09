import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './module/vehicles/vehicles.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [UsersModule, VehiclesModule],
})
export class AppModule {}

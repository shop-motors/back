import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesRepository } from './repositories/vehicles.repository';
import { VehiclesInMemoryRepository } from './repositories/in-memory/vehicles.in-memory.repository';
import { GalleryModule } from '../gallery/gallery.module';
 

@Module({
  imports: [GalleryModule], 
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    {
      provide: VehiclesRepository,
      useClass: VehiclesInMemoryRepository,
    },
  ],
})
export class VehiclesModule {}


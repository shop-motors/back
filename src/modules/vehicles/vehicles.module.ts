import { Module, forwardRef } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesRepository } from './repositories/vehicles.repository';
import { GalleryModule } from '../gallery/gallery.module';
import { PrismaVehiclesRepository } from './repositories/prisma/vehicles.prisma.repository';
import { PrismaService } from '../../database/prisma.services';

@Module({
  imports: [forwardRef(() => GalleryModule)],
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    PrismaService,
    {
      provide: VehiclesRepository,
      useClass: PrismaVehiclesRepository,
    },
  ],
  exports: [VehiclesService],
})
export class VehiclesModule {}

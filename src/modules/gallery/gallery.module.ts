import { GalleryPrismaRepository } from './repositories/prisma/gallery.prisma.repository';
import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './repositories/gallery.repository';
import { PrismaService } from '../../database/prisma.services';

@Module({
  controllers: [GalleryController],
  providers: [
    GalleryService,
    PrismaService,
    {
      provide: GalleryRepository,
      useClass: GalleryPrismaRepository,
    },
  ],
  exports: [GalleryRepository, GalleryService],
})
export class GalleryModule {}


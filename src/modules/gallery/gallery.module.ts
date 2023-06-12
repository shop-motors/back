import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './repositories/gallery.repository';
import { GalleryInMemoryRepository } from './repositories/in-memory/gallery.in-memory.repository';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService,
    {
      provide: GalleryRepository,
      useClass: GalleryInMemoryRepository,
    }
  ],
  exports: [GalleryRepository]
})
export class GalleryModule {}

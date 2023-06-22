import { CreateGalleryDto } from '../../dto/create-gallery.dto';
import { Gallery } from '../../entities/gallery.entity';
import { GalleryRepository } from '../gallery.repository';
import { PrismaService } from '../../../../database/prisma.services';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryPrismaRepository implements GalleryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateGalleryDto): Promise<Gallery> {
    const gallery = await this.prisma.gallery.create({
      data: {
        id: randomUUID(),
        image_url: data.img_url,
        vehicle: {
          connect: {
            id: data.vehicleId,
          },
        },
      },
      select: {
        id: true,
        image_url: true,
      },
    });
    return new Gallery(gallery.id, gallery.image_url);
  }



  async findAll(): Promise<Gallery[]> {
    return this.prisma.gallery.findMany();
  }

  async findOne(id: string): Promise<Gallery> {
    const galleryItem = await this.prisma.gallery.findUnique({
      where: {
        id: id,
      },
    });

    if (!galleryItem) throw new Error(`No gallery item found with id: ${id}`);

    return galleryItem;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.gallery.delete({
      where: {
        id: id,
      },
    });
  }
}

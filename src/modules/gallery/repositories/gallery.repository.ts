/* eslint-disable prettier/prettier */
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { Gallery } from '../entities/gallery.entity';
export abstract class GalleryRepository {
    abstract create(data: CreateGalleryDto): Promise<Gallery> | Gallery;
    abstract findAll(): Promise<Gallery[]> | Gallery[];
    abstract findOne(id: string): Promise<Gallery> | Gallery;
    abstract delete(id: string): Promise<void> | void;
  }
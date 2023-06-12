import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { GalleryRepository } from './repositories/gallery.repository';

@Injectable()
export class GalleryService {
  constructor (private galleryRepository: GalleryRepository){}
  async create(createGalleryDto: CreateGalleryDto) {
    const createNewImg = await this.galleryRepository.create(createGalleryDto)
    return createNewImg
  }


  async findAll() {
    const getAllImgs = await this.galleryRepository.findAll() 
    return getAllImgs;
  }

  async findOne(id: string) {
    const gallery = await this.galleryRepository.findOne(id);
    return gallery;
  }

  async remove(id: string) {
    await this.galleryRepository.delete(id);
    return `Gallery #${id} has been removed`;
  }
}
 
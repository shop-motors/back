/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { GalleryRepository } from '../gallery.repository';
import { CreateGalleryDto } from "../../dto/create-gallery.dto";
import { Gallery } from "../../entities/gallery.entity";


@Injectable()
export class GalleryInMemoryRepository implements GalleryRepository{
    private database: Gallery[] = []
    create(data: CreateGalleryDto): Gallery | Promise<Gallery> {
        const newGallery = new Gallery();
        Object.assign(newGallery, {
            ...data
        })
        this.database.push(newGallery)
        return newGallery
    }
    findAll(): Gallery[] | Promise<Gallery[]> {
        return this.database;
    }
    findOne(id: string): Gallery | Promise<Gallery> {
        const img = this.database.find((img) => img.id === id);
        if (!img){
          throw new Error('The requested image does not exist');
        }
        return img;
      }
      
    delete(id: string): void | Promise<void> {
        const imgToRemove = this.database.findIndex((img) => img.id === id)
        if (imgToRemove === -1){
            throw new Error('The requested image does not exist')
        }
        this.database.splice(imgToRemove, 1)
    }
}
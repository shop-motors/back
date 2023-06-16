/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { VehiclesRepository } from '../vehicles.repository';
import { CreateVehicleDto } from '../../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dto/update-vehicle.dto';
import { Vehicle } from '../../entities/vehicle.entity';
import { GalleryRepository } from '../../../gallery/repositories/gallery.repository';
import { CreateGalleryDto } from '../../../gallery/dto/create-gallery.dto';

@Injectable()
export class VehiclesInMemoryRepository implements VehiclesRepository {
  private database: Vehicle[] = [];
  constructor(private galleryRepository: GalleryRepository) {}

  async create(data: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = new Vehicle();
    Object.assign(newVehicle, {
      ...data,
    });
    const galleryItems = await Promise.all(
      data.galleryImages.map(async (image) => {
        const newGalleryItem: CreateGalleryDto = { img_url: image };
        return this.galleryRepository.create(newGalleryItem);
      }),
    );
    newVehicle.gallery_id = galleryItems.map((item) => item.id);

    this.database.push(newVehicle);
    return newVehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return Promise.all(this.database.map(async (vehicle) => {
      const galleryImages = await Promise.all(vehicle.gallery_id.map((galleryId) => this.galleryRepository.findOne(galleryId)));
      return { ...vehicle, galleryImages };
    }));
  }
  

  findOne(id: string): Vehicle | Promise<Vehicle> {
    const vehicle = this.database.find((vehicle) => vehicle.id === id);
    if (!vehicle) {
      throw new Error('The requested vehicle does not exist');
    }
    return vehicle;
  }

  async update(id: string, data: UpdateVehicleDto): Promise<Vehicle> {
    const vehicleIndex = this.database.findIndex((vehicle) => vehicle.id === id);
    if (vehicleIndex === -1) {
      throw new Error('The requested vehicle does not exist');
    }

    const newGalleryIds = data.galleryImages
      ? await Promise.all(
          data.galleryImages.map(async (imageUrl) => {
            const newGallery = await this.galleryRepository.create({
              img_url: imageUrl,
            });
            return newGallery.id;
          }),
        )
      : [];

    const updatedVehicle = new Vehicle();
    Object.assign(updatedVehicle, this.database[vehicleIndex], data, {
      gallery_id: newGalleryIds,
    });

    this.database[vehicleIndex] = updatedVehicle;
    return updatedVehicle;
  }


  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const vehicleIndex = this.database.findIndex((vehicle) => vehicle.id === id);
        if (vehicleIndex === -1) {
            reject(new Error('The requested vehicle does not exist'));
        }
        this.database.splice(vehicleIndex, 1);
        resolve();
    });
}
}

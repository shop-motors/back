import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { VehiclesRepository } from '../vehicles.repository';
import { PrismaService } from '../../../../database/prisma.services';
import { GalleryRepository } from '../../../gallery/repositories/gallery.repository';
import { CreateVehicleDto } from '../../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dto/update-vehicle.dto';
import { FuelType, Vehicle } from '../../entities/vehicle.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';


@Injectable()
export class PrismaVehiclesRepository implements VehiclesRepository {
  constructor(
    private prisma: PrismaService,
    private galleryRepository: GalleryRepository
  ) {}


  async create(data: CreateVehicleDto, userId: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicles.create({
      data: {
        brand: data.brand,
        model: data.model,
        year: data.year,
        km: data.km,
        fuel: FuelType[data.fuel],
        color: data.color,
        fipe_price: data.fipe_price,
        price: data.price,
        description: data.description,
        cover_img: data.cover_img,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            birth_date: true,
            description: true,
          },
        },
      },
    });
  
    const galleryItems = await Promise.all(
      data.galleryImages.map((imageUrl) => 
        this.galleryRepository.create({ img_url: imageUrl, vehicleId: vehicle.id })
      ),
    );
  
    const fullVehicle = await this.prisma.vehicles.findUnique({
      where: {
        id: vehicle.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            birth_date: true,
            description: true,
          },
        },
        gallery: true,
      },
    });
  
    return plainToInstance(Vehicle, fullVehicle);
  }
  
  async findAll(page = 0, limit = 12): Promise<{page: number, limit: number, total: number, data: Vehicle[]}> {
    const total = await this.prisma.vehicles.count();
    const vehicles = await this.prisma.vehicles.findMany({
      skip: page * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            birth_date: true,
            description: true,
          }
        },
        gallery: true,
      },
    });
    return {
      page,
      limit,
      total,
      data: vehicles.map(vehicle => plainToInstance(Vehicle, vehicle))
    };
  }


async findOne(id: string): Promise<Vehicle> {
  const vehicle = await this.prisma.vehicles.findUnique({
    where: { id: id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          phone: true,
          birth_date: true,
          description: true,
        },
      },
      gallery: true,
    },
  });
  if (!vehicle) {
    throw new NotFoundException(`Vehicle with ID ${id} not found`);
  }
  return plainToInstance(Vehicle, vehicle);
}

async update(id: string, data: UpdateVehicleDto): Promise<Vehicle> {
  const existingVehicle = await this.prisma.vehicles.findUnique({ where: { id }, include: { gallery: true } });

  if (!existingVehicle) {
    throw new NotFoundException(`Vehicle with id ${id} not found`);
  }

  const newImages = data.galleryImages;
  const oldImages = existingVehicle.gallery.map(g => g.image_url);

  const imagesToDelete = oldImages.filter(img => !newImages.includes(img));
  const imagesToCreate = newImages.filter(img => !oldImages.includes(img));

 
  if (imagesToDelete.length > 0) {
    await this.prisma.gallery.deleteMany({
      where: {
        AND: [
          { vehicleId: id },
          { image_url: { in: imagesToDelete } }
        ]
      },
    });
  }

 

const createdImages = imagesToCreate.length > 0
  ? await this.prisma.gallery.createMany({
    data: imagesToCreate.map(img => ({
      id: randomUUID(),
      image_url: img,
      vehicleId: id
    })),
  })
  : [];


  const updatedVehicle = await this.prisma.vehicles.update({
    where: { id },
    data: {
      brand: data.brand,
      model: data.model,
      year: data.year,
      km: data.km,
      fuel: data.fuel,
      color: data.color,
      fipe_price: data.fipe_price,
      price: data.price,
      description: data.description,
      cover_img: data.cover_img,
    },
    include: {
      user: true,
      gallery: true,
    },
  });
  
  return plainToInstance(Vehicle, updatedVehicle);
}

async delete(id: string): Promise<void> {
  const vehicle = await this.prisma.vehicles.findUnique({
    where: { id: id },
  });

  if (!vehicle) {
    throw new NotFoundException(`Vehicle with ID ${id} not found`);
  }

  await this.prisma.gallery.deleteMany({
    where: { vehicleId: id },
  });
  
  await this.prisma.vehicles.delete({
    where: { id: id },
  });
}

}
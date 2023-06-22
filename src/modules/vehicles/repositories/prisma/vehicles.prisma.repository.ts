import { Injectable, NotFoundException } from '@nestjs/common';
import { VehiclesRepository } from '../vehicles.repository';
import { PrismaService } from '../../../../database/prisma.services';
import { GalleryRepository } from '../../../gallery/repositories/gallery.repository';
import { CreateVehicleDto } from '../../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dto/update-vehicle.dto';
import { Vehicle } from '../../entities/vehicle.entity';
import { plainToInstance } from 'class-transformer';

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
  
  

  async findAll(userId: string): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicles.findMany({
        where: { userId: userId },
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
    return vehicles.map(vehicle => plainToInstance(Vehicle, vehicle));
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

// async update(id: string, data: UpdateVehicleDto): Promise<Vehicle> {
  // const existingVehicle = await this.prisma.vehicles.findUnique({ where: { id } });

  // if (!existingVehicle) {
  //   throw new NotFoundException(`Vehicle with id ${id} not found`);
  // }
  // const updatedVehicle = await this.prisma.vehicles.update({
  //   where: { id },
  //   data: {
  //     ...data,
  //     gallery: {
  //       create: data.galleryImages
  //         ? data.galleryImages.map((imageUrl) => ({ image_url: imageUrl }))
  //         : undefined,
  //     },
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         cpf: true,
  //         phone: true,
  //         birth_date: true,
  //         description: true,
  //       },
  //     },
  //     gallery: true,
  //   },
  // });

//   return throw new Error('not implemented')
// }

update(id: string, data: UpdateVehicleDto): Vehicle | Promise<Vehicle> {
  throw new Error('Method not implemented.');
}

async delete(id: string): Promise<void> {
  const vehicle = await this.prisma.vehicles.findUnique({
    where: { id: id },
  });

  if (!vehicle) {
    throw new NotFoundException(`Vehicle with ID ${id} not found`);
  }

  await this.prisma.vehicles.delete({
    where: { id: id },
  });
}

}
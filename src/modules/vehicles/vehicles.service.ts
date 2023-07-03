import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesRepository } from './repositories/vehicles.repository';


@Injectable()
export class VehiclesService {
  constructor(private vehicleRepository: VehiclesRepository){}
  async create(createVehicleDto: CreateVehicleDto, userId: string) {
    const vehicle = await this.vehicleRepository.create(createVehicleDto, userId)
    return vehicle
  }

  async findAll(page: number, limit: number) {
    const vehicle = await this.vehicleRepository.findAll(Number(page), Number(limit))
    return vehicle
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleRepository.findOne(id)
    return vehicle
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.update(id, updateVehicleDto)
    return vehicle
  }

  async remove(id: string) {
    await this.vehicleRepository.delete(id);
  }
}

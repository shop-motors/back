/* eslint-disable prettier/prettier */

import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { Vehicles } from '@prisma/client';

export abstract class VehiclesRepository {
  abstract create(data: CreateVehicleDto, userId: string): Promise<Vehicles> | Vehicle;
  abstract findAll(): Promise<Vehicles[]> | Vehicles[];
  abstract findOne(id: string): Promise<Vehicles> | Vehicles;
  abstract update(id: string, data: UpdateVehicleDto): Promise<Vehicles> | Vehicles;
  abstract delete(id: string): Promise<void> | void;
}
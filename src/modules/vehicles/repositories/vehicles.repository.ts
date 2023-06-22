/* eslint-disable prettier/prettier */

import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

export abstract class VehiclesRepository {
  abstract create(data: CreateVehicleDto): Promise<Vehicle> | Vehicle;
  abstract findAll(): Promise<Vehicle[]> | Vehicle[];
  abstract findOne(id: string): Promise<Vehicle> | Vehicle;
  abstract update(id: string, data: UpdateVehicleDto): Promise<Vehicle> | Vehicle;
  abstract delete(id: string): Promise<void> | void;
}
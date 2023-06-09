/* eslint-disable prettier/prettier */

import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';


export abstract class VehiclesRepository {
  abstract create(data: CreateVehicleDto, userId: string): Promise<Vehicle> | Vehicle;
  abstract findAll(page?:number, limit?:number): Promise<{ page: number, limit: number, total: number, data: Vehicle[] }> | { page: number, limit: number, total: number, data: Vehicle[] };
  abstract findOne(id: string): Promise<Vehicle> | Vehicle;
  abstract update(id: string, data: UpdateVehicleDto): Promise<Vehicle> | Vehicle;
  abstract delete(id: string): Promise<void> | void;
}
import { Injectable } from '@nestjs/common';
import { VehiclesRepository } from '../vehicles.repository';
import { CreateVehicleDto } from '../../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dto/update-vehicle.dto';
import { Vehicle } from '../../entities/vehicle.entity';

@Injectable()
export class VehiclesInMemoryRepository implements VehiclesRepository {
  private database: Vehicle[] = [];

  create(data: CreateVehicleDto): Vehicle | Promise<Vehicle> {
    const newVehicle = new Vehicle();
    Object.assign(newVehicle, {
      ...data,
    });
    this.database.push(newVehicle);
    return newVehicle;
  }

  findAll(): Vehicle[] | Promise<Vehicle[]> {
    return this.database;
  }

  findOne(id: string): Vehicle | Promise<Vehicle> {
    const vehicle = this.database.find((vehicle) => vehicle.id === id);
    if (!vehicle) {
      throw new Error('The requested vehicle does not exist');
    }
    return vehicle;
  }

  update(id: string, data: UpdateVehicleDto): Vehicle | Promise<Vehicle> {
    const vehicleIndex = this.database.findIndex(
      (vehicle) => vehicle.id === id,
    );
    if (vehicleIndex === -1) {
      throw new Error('The requested vehicle does not exist');
    }
    const updatedVehicle = new Vehicle();
    Object.assign(updatedVehicle, { ...data });
    this.database[vehicleIndex] = updatedVehicle;
    return updatedVehicle;
  }

  delete(id: string): void | Promise<void> {
    const vehicleIndex = this.database.findIndex(
      (vehicle) => vehicle.id === id,
    );
    if (vehicleIndex === -1) {
      throw new Error('The requested vehicle does not exist');
    }
    this.database.splice(vehicleIndex, 1);
  }
}

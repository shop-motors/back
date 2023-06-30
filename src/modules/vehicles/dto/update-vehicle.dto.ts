/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { VehicleBaseDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(VehicleBaseDto) {}

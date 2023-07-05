/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { FuelType } from '../entities/vehicle.entity';


export class VehicleBaseDto  {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  km: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  fuel: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fipe_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(9999)
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cover_img: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  galleryImages: string[];
}

export class CreateVehicleDto extends VehicleBaseDto {
 
}

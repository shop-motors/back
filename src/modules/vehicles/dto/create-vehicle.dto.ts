import { Type } from 'class-transformer';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Url } from 'url';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  km: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  color: string;

  @IsNotEmpty()
  @IsNumber()
  fipe_price: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(9999)
  description: string;

  @IsString()
  @IsNotEmpty()
  cover_img: Url;

  @IsString()
  gallery_id: string;
}

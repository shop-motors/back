/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateGalleryDto {
  @ApiProperty()
  @IsNotEmpty()
  img_url: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;
}


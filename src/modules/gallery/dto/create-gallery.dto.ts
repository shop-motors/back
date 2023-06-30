import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  img_url: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;
}


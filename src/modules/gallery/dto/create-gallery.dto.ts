/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  img_url: string;
}

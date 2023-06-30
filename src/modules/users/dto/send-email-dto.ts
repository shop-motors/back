/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsEmail()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

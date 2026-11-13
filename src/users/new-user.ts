import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import {Transform } from 'class-transformer';



export class NewUser {

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  @IsEmail()
  email: string;


}

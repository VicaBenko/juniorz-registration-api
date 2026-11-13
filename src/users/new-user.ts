import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import {Transform } from 'class-transformer';



export class NewUser {

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsEmail()
  email: string;


}

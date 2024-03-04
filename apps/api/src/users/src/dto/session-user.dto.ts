import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, isNumber } from "class-validator";
import { EGender } from "../domain/gender.enum";
import { ERoles } from "../domain";
import { Escape } from "class-sanitizer";


export class SessionUserDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Escape()
  email: string;

  @IsNotEmpty()
  @IsEnum(ERoles)
  role: ERoles = ERoles.user;
}
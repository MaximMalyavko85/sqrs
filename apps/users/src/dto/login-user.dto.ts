import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength, ValidateIf } from "class-validator";
import { EGender } from "../domain/gender.enum";
import { ERoles } from "../domain";
import { Escape } from "class-sanitizer";


export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Escape()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 32)
  @Escape()
  password: string;
}
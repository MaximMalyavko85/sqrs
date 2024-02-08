import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength, ValidateIf } from "class-validator";
import { EGender } from "../domain/gender.enum";
import { ERoles } from "../domain";
import { Escape } from "class-sanitizer";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Escape()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Escape()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Escape()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 32)
  @Escape()
  password: string;

  @ValidateIf(o => 'userName' in o)
  @IsString()
  @IsNotEmpty()
  @Escape()
  userName: string;

  @IsNotEmpty()
  @IsEnum(ERoles)
  role: ERoles = ERoles.user;

  @IsNotEmpty()
  @IsEnum(EGender)
  gender: EGender;
}
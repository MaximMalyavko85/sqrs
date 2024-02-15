import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, ValidateIf } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { UserDto } from "./user.dto";
import { Escape } from "class-sanitizer";
import { ERoles } from "@users/domain";
import { EGender } from "@users/domain/gender.enum";

export class FullUserDto implements UserDto, CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, MaxLength, MinLength, ValidateIf } from "class-validator";
import { EGender } from "../domain/gender.enum";
import { ERoles } from "../domain";
import { Escape } from "class-sanitizer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { FullUserDto } from "./full-user.dto";


export class UpdateUserDto implements Omit<FullUserDto, 'password'>{
  @ValidateIf(o => 'id' in o)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({description: "User email", type: 'string', default: `test_${Date.now()}@test.com`})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Escape()
  email: string;

  @ApiProperty({description: "User first name", type: 'string'})
  @IsString()
  @IsNotEmpty()
  @Escape()
  firstName: string;

  @ApiProperty({description: "User last name", type: 'string'})
  @IsString()
  @IsNotEmpty()
  @Escape()
  lastName: string;

  @ApiProperty({description: "User name of user", type: 'string'})
  @ValidateIf(o => 'userName' in o)
  @IsString()
  @IsNotEmpty()
  @Escape()
  userName: string;

  @ApiProperty({description: "User first name", enum: ERoles, default: ERoles.user})
  @IsNotEmpty()
  @IsEnum(ERoles)
  role: ERoles = ERoles.user;

  @ApiPropertyOptional({description: "User first name", enum: EGender})
  @IsNotEmpty()
  @IsEnum(EGender)
  gender: EGender;
}
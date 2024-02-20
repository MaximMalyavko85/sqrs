import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength, ValidateIf } from "class-validator";
import { EGender } from "../domain/gender.enum";
import { ERoles } from "../domain";
import { Escape } from "class-sanitizer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreateUserDto {
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

  @ApiProperty({description: "User password", type: 'string', default: "123456789Aa!"})
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 32)
  @Escape()
  password: string;

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
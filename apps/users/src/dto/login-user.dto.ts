import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength, ValidateIf } from "class-validator";
import { EGender } from "../domain/gender.enum";
import { ERoles } from "../domain";
import { Escape } from "class-sanitizer";
import { ApiProperty } from "@nestjs/swagger";


export class LoginUserDto {
  @ApiProperty({description: "User emeil", type: 'string', default: 'test_1708419978986@test.com'})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Escape()
  email: string;

  @ApiProperty({description: "User password", type: 'string', default: '123456789Aa!'})
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 32)
  @Escape()
  password: string;
}
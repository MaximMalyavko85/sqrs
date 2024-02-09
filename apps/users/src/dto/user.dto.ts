import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";


export class UserDto extends CreateUserDto{
  @IsString()
  @IsNotEmpty()
  id: string;
}
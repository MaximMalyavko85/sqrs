import { LoginUserDto } from "@users/dto";

export class LoginUserCommand {
  constructor(public readonly loginUserDto: LoginUserDto){}
}
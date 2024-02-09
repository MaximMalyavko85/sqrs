import { CreateUserDto } from "apps/users/src/dto";

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto){}
}
import { UpdateUserDto } from "@users/dto";

export class UpdateUserCommand {
  constructor(public readonly userId: number, public readonly updatedUserDto: UpdateUserDto){}
}
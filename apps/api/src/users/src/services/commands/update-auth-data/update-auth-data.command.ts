import { SessionUserDto } from "@users/dto";

export class UpdateAuthDataCommand{
  constructor(public readonly sessionUser: SessionUserDto){}
}
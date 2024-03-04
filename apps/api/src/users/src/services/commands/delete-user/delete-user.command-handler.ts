import { UserRepository } from "@users/providers";
import { BadRequestException } from "@nestjs/common";
import { DeleteUserCommand } from "./delete-user.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, boolean> {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async execute({userId}: DeleteUserCommand): Promise<boolean>{
    const isUserDeleted = await this.userRepository
      .deleteOneWhere({id: userId})
      .catch(err => {
        throw new BadRequestException(err);
      });

      return true;
  }
}
import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserAggregate } from "@users/domain";
import { UserRepository } from "@users/providers";
import { UpdateUserCommand } from "./update-user.command";

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, UserAggregate> {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async execute({ updatedUserDto, userId }: UpdateUserCommand): Promise<UserAggregate> {
    const _userAggregate = await this.userRepository
      .updateUser(userId, updatedUserDto)
      .catch(err => {
        throw new BadRequestException(err);
      });

    _userAggregate.removePassword();

    return _userAggregate;
  }
}
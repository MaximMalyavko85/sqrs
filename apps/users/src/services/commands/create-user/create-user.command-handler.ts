import { UserRepository } from "@users/providers";
import { BadRequestException } from "@nestjs/common";
import { ERoles, UserAggregate } from "@users/domain";
import { CreateUserCommand } from "./create-user.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";


@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, UserAggregate> {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async execute({ createUserDto }: CreateUserCommand): Promise<UserAggregate> {
    const _userAggregate: UserAggregate = UserAggregate.create({...createUserDto, role: ERoles.user});

    const _userExist: UserAggregate = await this.userRepository
      .findOneWhere({ email: _userAggregate.email })
      .catch(err => {
        throw new BadRequestException(err);
      });

    if (_userExist) throw new BadRequestException('User with this email already exist.');

    await _userAggregate.hashPassword();
    
    const _createdUser: UserAggregate = await this.userRepository
        .save(_userAggregate)
        .catch(err => {
            throw new BadRequestException(err);
        });

    _createdUser.removePassword();

    return _createdUser;
  }
}
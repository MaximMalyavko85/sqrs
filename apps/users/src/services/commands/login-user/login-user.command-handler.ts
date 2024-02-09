import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginUserCommand } from "./login-user.command";
import { UserAggregate } from "@users/domain";
import { LoginUserDto } from "@users/dto";
import { BadRequestException } from "@nestjs/common";
import { UserRepository } from "@users/providers/user.repository";

@CommandHandler(LoginUserCommand)
export class LoginCommandHandler implements ICommandHandler<LoginUserCommand, UserAggregate> {

  constructor(
    private readonly userRepository: UserRepository
  ){}

  async execute({ loginUserDto }: LoginUserCommand): Promise<UserAggregate> {
    const _userExist = await this.userRepository
      .findOneWhere({ email: loginUserDto.email })
      .catch(err => {
        throw new BadRequestException(err);
      });

    if (!_userExist) throw new BadRequestException('Wrong email or password.');

    const _userAggregate: UserAggregate = UserAggregate.create(_userExist);

    const _isPasswordValid = await _userAggregate.checkPassword(loginUserDto.password);

    if (!_isPasswordValid) throw new BadRequestException('Wrong email or password.');

    //generate tokens
    //save tokens

    return UserAggregate.create(_userExist);
  }
}
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginUserCommand } from "./login-user.command";
import { IUserAuth, UserAggregate } from "@users/domain";
import { BadRequestException } from "@nestjs/common";
import { UserRepository } from "@users/providers/user.repository";
import { TokenService } from "@auth/token.service";
import { SessionAggregate } from "@auth/domain/session.aggregate";
import { SessionRepository } from "@auth/providers/session.repository";

@CommandHandler(LoginUserCommand)
export class LoginCommandHandler implements ICommandHandler<LoginUserCommand, IUserAuth> {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
  ){}

  async execute({ loginUserDto }: LoginUserCommand): Promise<IUserAuth > {
    const _userExist = await this.userRepository
      .findOneWhere({ email: loginUserDto.email })
      .catch(err => {
        throw new BadRequestException(err);
      });

    if (!_userExist) throw new BadRequestException('Wrong email or password.');

    const _userAggregate = UserAggregate.create(_userExist);
    const _isPasswordValid = await _userAggregate.checkPassword(loginUserDto.password);
    if (!_isPasswordValid) throw new BadRequestException('Wrong email or password.');

    const accessToken: string = await this.tokenService.generateAccessToken({
      id: _userAggregate.id,
      ..._userExist
    });

    const refreshToken: string = await this.tokenService.generateRefreshToken({
      id: _userAggregate.id,
      ..._userExist
    });

    const sessionAgregate = SessionAggregate.create({userId: _userExist.id, refreshToken});
    await this.sessionRepository.save(sessionAgregate);

    return {
      ..._userAggregate,
      id: _userAggregate.id,
      accessToken,
      refreshToken,
     };
  }
}
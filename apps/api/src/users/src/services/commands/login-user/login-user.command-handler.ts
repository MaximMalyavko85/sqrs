import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginUserCommand } from "./login-user.command";
import { IUserAuth, UserAggregate } from "@users/domain";
import { BadRequestException } from "@nestjs/common";
import { UserRepository } from "@users/providers";
import { TokenService } from "@auth/token.service";
import { SessionAggregate } from "@auth/domain";
import { SessionRepository } from "@auth/providers";
import { NotificationAggregate } from "apps/notifications/src/domain";
import { ChannelProviderService } from "@common/channels/notifications";

@CommandHandler(LoginUserCommand)
export class LoginCommandHandler implements ICommandHandler<LoginUserCommand, IUserAuth> {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
    private readonly channelProviderService: ChannelProviderService,
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

    const _newNotification = NotificationAggregate.create({
      recipientId: _userExist.id.toString(),
      payload: {
        message: "You are successfully login on portal. Device: Google Chrome",
        ...{_userExist}
      },
    });

    await this.channelProviderService.createNotifications(_newNotification);

    return {
      ..._userAggregate,
      id: _userAggregate.id,
      accessToken,
      refreshToken,
     };
  }
}
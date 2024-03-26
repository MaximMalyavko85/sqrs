import { UserRepository } from "@users/providers";
import { BadRequestException } from "@nestjs/common";
import { ERoles, UserAggregate } from "@users/domain";
import { CreateUserCommand } from "./create-user.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChannelProviderService } from "@common/channels/notifications";
import { NotificationAggregate } from "@common/shared/domain";


@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, UserAggregate> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly channelProviderService: ChannelProviderService
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

    const _newNotification = NotificationAggregate.create({
      recipientId:  _createdUser.id.toString(),
      payload: {
        message: "You are successfully registred on portal",
        ...{_createdUser}
      },
    });

    await this.channelProviderService.createNotifications(_newNotification);

    return _createdUser;
  }
}
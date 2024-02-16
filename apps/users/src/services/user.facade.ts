import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto, LoginUserDto } from "../dto";
import { CreateUserCommand, CreateUserCommandHandler} from "./commands/create-user";
import { LoginUserCommand } from "./commands/login-user";
import { LoginCommandHandler } from "./commands/login-user/login-user.command-handler";
import { LogoutUserCommand, LogoutUserCommandHandler } from "./commands/logout-user";


@Injectable()
export class UserFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) { }

  commands = {
    createUser: (userDto: CreateUserDto) => this.createUser(userDto),
    loginUser: (loginUserDto: LoginUserDto) => this.loginUser(loginUserDto),
    refreshUserData: () => this.refreshUserData(),
    logout: (userId: number)=> this.logout(userId),
  };

  queries = {};
  events = {};

  private createUser(userDto: CreateUserDto){
    return this.commandBus.execute<
      CreateUserCommand,
      CreateUserCommandHandler['execute']
      >(new CreateUserCommand(userDto));
  }

  private loginUser(loginUserDto: LoginUserDto) {
    return this.commandBus.execute<
      LoginUserCommand,
      LoginCommandHandler['execute']
      >(new LoginUserCommand(loginUserDto));
  }

  private refreshUserData() {}

  private logout(userId: number) {
    return this.commandBus.execute<
      LogoutUserCommand,
      LogoutUserCommandHandler['execute']
      >(new LogoutUserCommand(userId));
  }
}
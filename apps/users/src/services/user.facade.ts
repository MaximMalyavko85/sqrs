import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto, LoginUserDto, SessionUserDto } from "../dto";
import { 
  CreateUserCommand, 
  LoginUserCommand,
  LogoutUserCommand,
  UpdateAuthDataCommand,
  CreateUserCommandHandler,
  LogoutUserCommandHandler,
  UpdateAuthDataCommandHandler,
} from "./commands";


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
    refreshUserData: (sessionUser: SessionUserDto) => this.refreshUserData(sessionUser),
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
      LogoutUserCommandHandler['execute']
      >(new LoginUserCommand(loginUserDto));
  }

  private refreshUserData(sessionUser: SessionUserDto) {
    return this.commandBus.execute<
      UpdateAuthDataCommand,
      UpdateAuthDataCommandHandler['execute']
      >(new UpdateAuthDataCommand(sessionUser))
  }

  private logout(userId: number) {
    return this.commandBus.execute<
      LogoutUserCommand,
      LogoutUserCommandHandler['execute']
      >(new LogoutUserCommand(userId));
  }
}
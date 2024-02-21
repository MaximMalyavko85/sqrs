import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto, LoginUserDto, SessionUserDto, UpdateUserDto } from "../dto";
import { 
  CreateUserCommand, 
  LoginUserCommand,
  LogoutUserCommand,
  UpdateAuthDataCommand,
  CreateUserCommandHandler,
  LogoutUserCommandHandler,
  UpdateAuthDataCommandHandler,
  UpdateUserCommand,
  UpdateUserCommandHandler,
} from "./commands";
import { GetUsersQuery } from "./queries/get-users/get-users.query";
import { GetUsersQueryHandler } from "./queries/get-users/get-users.query-handler";
import { PaginationDto } from "@common/shared/dtos";
import { GetUserQuery } from "./queries/get-user/get-user.query";


@Injectable()
export class UserFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus  : QueryBus,
    private readonly eventBus  : EventBus,
  ) {}

  commands = {
    createUser     : (userDto: CreateUserDto) => this.createUser(userDto),
    loginUser      : (loginUserDto: LoginUserDto) => this.loginUser(loginUserDto),
    refreshUserData: (sessionUser: SessionUserDto) => this.refreshUserData(sessionUser),
    logout         : (userId: number) => this.logout(userId),
    updateOneUser  : (userId: number, updatedUserDto: UpdateUserDto) => this.updateOneUser(userId, updatedUserDto)
  };

  queries = {
    getAllUsers: (pagination: PaginationDto)=> this.getAllUsers(pagination),
    getOneUser : (userId: number) => this.getOneUser(userId)
  };
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

  private getAllUsers(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetUsersQuery,
      GetUsersQueryHandler['execute']
      >(new GetUsersQuery(pagination));
  }

  private getOneUser(userId: number) {
    return this.queryBus.execute<
    GetUserQuery,
    GetUsersQueryHandler['execute']
    >(new GetUserQuery(userId));
  }

  private updateOneUser(userId: number, updateUserDto: UpdateUserDto) {
    return this.commandBus.execute<
    UpdateUserCommand,
    UpdateUserCommandHandler['execute']
    >(new UpdateUserCommand(userId, updateUserDto));
  }
}
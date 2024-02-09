import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { CreateSessionCommand } from "./commands/create-session/create-session.command";
import { CreateSessionCommandHandler } from "./commands/create-session/create-session.command-handler";
import { UpdateSessionCommand } from "./commands/update-session/update-session.command";
import { UpdateSessionCommandHandler } from "./commands/update-session/update-session.command-handler";
import { CreateUserDto } from "apps/users/src/dto/";

@Injectable()
export class AuthFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) { }

  commands = {
    createSession: (userDto: CreateUserDto) => this.createSession(userDto),
    updateToken: (token) => this.updateToken(token),
    deleteToken: () => this.deleteToken(),
  };

  queries = {
    getOneToken: () => this.getOneToken()
  };

  events = {};

  private createSession(userDto: CreateUserDto){
    //execute return Promise<any> - its bad. We can use generic for it
    // execute<InternalValue, returnValue>. Its more readable 
    return this.commandBus.execute< // dispatch
      CreateSessionCommand,  // incoming
      CreateSessionCommandHandler['execute'] // outcoming
      >(new CreateSessionCommand(userDto));
  }
  
  private updateToken(token){
    return this.commandBus.execute<
      UpdateSessionCommand,
      UpdateSessionCommandHandler['execute']
      >(new UpdateSessionCommand(token))
  }
  private deleteToken(){
    return 'delete token'
  }
  private getOneToken(){
    return 'get One token'
  }
}
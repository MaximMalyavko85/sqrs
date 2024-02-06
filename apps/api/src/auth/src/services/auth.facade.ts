import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";

@Injectable()
export class AuthFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) { }

  commands = {
    createToken: () => this.createToken(),
    updateToken: () => this.updateToken(),
    deleteToken: () => this.deleteToken(),
  };

  queries = {
    getOneToken: () => this.getOneToken()
  };

  events = {};

  private createToken(){
    return 'Create token'
  }
  private updateToken(){
    return 'update token'
  }
  private deleteToken(){
    return 'delete token'
  }
  private getOneToken(){
    return 'get One token'
  }
}
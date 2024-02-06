import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { AuthFacade } from "../services/auth.facade";


export const authFacadeFactory = (
  commandBus: CommandBus, 
  queryBus: QueryBus, 
  eventBus: EventBus 
) => new AuthFacade(commandBus, queryBus, eventBus)
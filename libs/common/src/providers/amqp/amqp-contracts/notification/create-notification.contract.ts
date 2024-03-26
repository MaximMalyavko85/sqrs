import { CreateUserDto } from "@users/dto";

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from "../../shared/interfaced";
import { EXCHANGE_NOTIFICATION } from "../../exchanges";
import { CreateNotificationDto } from "@common/shared/dtos";

export namespace CreateNotificationContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_NOTIFICATION,
    queue: `${EXCHANGE_NOTIFICATION.name}-create`,
    routingKey: `${EXCHANGE_NOTIFICATION.name}-create`,
    queueOptions: {
      durable: true, // if server was restarted - messeges will be delivered
    }
  }

  export type request = AmqpBaseRequest<CreateNotificationDto<{message: string}>>; // вынести  //create user dto
  export type response = AmqpBaseResponse<any>; 
}
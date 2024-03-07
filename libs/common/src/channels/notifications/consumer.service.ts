import { CreateNotificationContract } from "@common/providers/amqp/amqp-contracts";
import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common/decorators";
import { Logger } from "@nestjs/common/services";


@Injectable()
export class ChannelConsumerService {
  private readonly logger = new Logger(ChannelConsumerService.name);

  // constructor(private readonly userFacade: UserFacade) {}
  @RabbitRPC({ // listener
    exchange: CreateNotificationContract.queue.exchange.name,
    routingKey: CreateNotificationContract.queue.routingKey,
    queue: CreateNotificationContract.queue.queue,
  })
  private async createNotifications(request: CreateNotificationContract.request): Promise<any> { //CreateUserContract.response
    try{
      const data = request;
      console.log("============> Consumer", request);
      // return this.usertFacade.commands.createUser(userDto)
      
    } catch(error) {
      this.logger.error(error);
      return {
        ...request,
        payload: null,
        error: this.errorHandler(error),
      }
    }
  }

  private errorHandler(error: any) {
    return {
      code: error?.name || 'error',
      message: error?.message || JSON.stringify(error)
    }
  }
}
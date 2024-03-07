import { CreateNotificationContract } from "@common/providers/amqp/amqp-contracts";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common/decorators";
import { Logger } from "@nestjs/common/services";
import { UserAggregate } from "@users/domain";
import { CreateNotificationDto } from "apps/notifications/src/dto";


@Injectable()
export class ChannelProviderService {
  private readonly logger = new Logger(ChannelProviderService.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  async createNotifications(createNotificationDto: CreateNotificationDto<{message: string, _createdUser: UserAggregate}>): Promise<any> {
    this.amqpConnection.publish(
      CreateNotificationContract.queue.exchange.name, 
      CreateNotificationContract.queue.routingKey,
      createNotificationDto,
    );
  }
}
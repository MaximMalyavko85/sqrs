import { Global, Module } from "@nestjs/common/decorators";
import { AmqpConnectionManager, RabbitMQModule, RabbitRpcParamsFactory } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from "@nestjs/config";
import { AMQ_EXCHANGES } from "./exchanges";
import { ChannelModule } from "@common/channels/channels.module";


@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=> ({
        uri: configService.get<string>('RABBITMQ_HOST'),
        exchanges: AMQ_EXCHANGES,
        connectionOptions: { wait: false },
        connectionManagerOptions: {
          heartbeatIntervalInSeconds: 15, //sec
          reconnectTimeInSeconds    : 30
        }
      })
    }),
    ChannelModule
  ],
  providers: [
    RabbitRpcParamsFactory, 
    AmqpConnectionManager // push
  ],
  exports: [RabbitMQModule]
})
export class AmqpModule{} 
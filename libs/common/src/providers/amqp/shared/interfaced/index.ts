import { QueueOptions } from "@golevelup/nestjs-rabbitmq";

export interface RabbitExchangeConfig {
  name: string;
  type: 'topic' | 'direct' | 'fanout';
  options?: AssertExchange;
}

interface AssertExchange {
  durable?: boolean;
  internal?: boolean;
  autoDelete?: boolean;
  alternateExchange?: string;
  arguments?: unknown | unknown[]
}

export interface QueueDeclaration {
  exchange: RabbitExchangeConfig;
  routingKey: string;
  queue: string;
  queueOptions: QueueOptions;
}

export interface AmqpBaseRequest<T = unknown> {
  type: string;
  payload: T;
  requestId: string;
  timestamp: string;
  exchange?: string;
  routingKey?: string;
}

export interface AmqpBaseResponse<T=unknown> extends AmqpBaseRequest<T>{
  error?: {
    code: string;
    message: string;
  }
}

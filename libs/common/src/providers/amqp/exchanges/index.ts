import {  RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq";
import { EXCHANGE_NOTIFICATION } from "./notification.exchange";

export * from './notification.exchange';

export const AMQ_EXCHANGES: RabbitMQExchangeConfig[] = [
  EXCHANGE_NOTIFICATION
]
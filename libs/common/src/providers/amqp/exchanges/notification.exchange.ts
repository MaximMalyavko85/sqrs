
import { RabbitExchangeConfig } from "../shared/interfaced";

export const EXCHANGE_NOTIFICATION:RabbitExchangeConfig = {
  name: 'notification',
  type: 'direct',
}
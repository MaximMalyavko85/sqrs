import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from "path";

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath     : join(process.cwd(), 'apps', 'payments', 'config', `.env.${process.env?.NODE_ENV || 'local'}`),
      isGlobal        : true,
      validationSchema: Joi.object({
        HTTP_PORT                 : Joi.number().required(),
        TCP_PORT                  : Joi.number().required(),
        RABBITMQ_HOST             : Joi.string().required(),
        POSTGRES_HOST             : Joi.string().required(),
        POSTGRES_PORT             : Joi.number().required(),
        POSTGRES_DB               : Joi.string().required(),
        POSTGRES_USER             : Joi.string().required(),
        POSTGRES_PASSWORD         : Joi.string().required(),
      })
  })],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}

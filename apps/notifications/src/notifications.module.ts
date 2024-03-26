import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from "path";

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath     : join(process.cwd(), 'apps', 'notifications', 'config', `.env.${process.env?.NODE_ENV || 'local'}`),
      isGlobal        : true,
      validationSchema: Joi.object({
        TCP_PORT                  : Joi.number().required(),
        POSTGRES_HOST             : Joi.string().required(),
        POSTGRES_PORT             : Joi.number().required(),
        POSTGRES_DB               : Joi.string().required(),
        POSTGRES_USER             : Joi.string().required(),
        POSTGRES_PASSWORD         : Joi.string().required(),
        HTTP_PORT                 : Joi.number().required(),
    })
  })],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/src/auth.module';
import { CommonModule } from '@app/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    NestConfigModule.forRoot({
      isGlobal        : true,
      envFilePath     : join(process.cwd(), 'apps', 'api', 'config', `.env.${process.env?.NODE_ENV || 'local'}`),
      validationSchema: Joi.object({
        HTTP_PORT                 : Joi.number().required(),
        TCP_PORT                  : Joi.number().required(),
        MONGO_HOST                : Joi.string().required(),
        RABBITMQ_HOST             : Joi.string().required(),
        JWT_ACCESS_SECRET         : Joi.string().required(),
        JWT_REFRESH_SECRET        : Joi.string().required(),
        JWT_ACCESS_EXPIRE         : Joi.string().required(),
        JWT_REFRESH_EXPIRE_COOKIES: Joi.string().required(),
        JWT_REFRESH_EXPIRE        : Joi.string().required(),
        JWT_DOMEN                 : Joi.string().required(),
        POSTGRES_HOST             : Joi.string().required(),
        POSTGRES_PORT             : Joi.number().required(),
        POSTGRES_DB               : Joi.string().required(),
        POSTGRES_USER             : Joi.string().required(),
        POSTGRES_PASSWORD         : Joi.string().required(),
      }),
    }),
  ],
})
export class ApiModule {}

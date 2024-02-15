import { Module } from '@nestjs/common';
import { CommonModule, SharedServices } from '@app/common';
import { AuthModule } from './auth/src/auth.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    NestConfigModule.forRoot({
      isGlobal        : true,
      envFilePath     : SharedServices.getConfigBaseOnMode(),
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
        
        //HOST: Joi.string().required(),
        //GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        //GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        //GOOGLE_OAUTH_CLIENT_REFRESH_TOKEN: Joi.string().required(),
        //SMTP_USER: Joi.string().required()
      })
    })
]
})
export class ApiModule {}

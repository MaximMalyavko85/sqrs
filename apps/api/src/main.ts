import { SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApiModule } from './api.module';

const whitelist = ['http://localhost:3001'];

const CORS_SETTINGS = {
  allowedHeaders: ['content-type'],
  origin        : whitelist,
  credentials   : true,
};

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<string>("HTTP_PORT") || 7979;
  const SWAGGER_URL = configService.get("SWAGGER_URL") || "api";

  app.use(cookieParser());
  app.enableCors(CORS_SETTINGS);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  
  //const document = SwaggerModule.createDocument(app, new LocalConfig().getSwaggerConfig());
  //SwaggerModule.setup('api-doc', app, document);


  await app.listen(PORT, ()=> {
    Logger.log(`[INFO] The server started on http://localhost:${PORT} port`, 'Main');
    Logger.log(`[INFO] Swagger doc on http://localhost:${PORT}/${SWAGGER_URL}`, 'Main')
  });
}

bootstrap();
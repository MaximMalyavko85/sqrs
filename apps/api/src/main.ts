import { ApiModule } from './api.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

const whitelist = ['http://localhost:3001'];

const CORS_SETTINGS = {
  allowedHeaders : ['content-type'],
  origin         : whitelist,
  credentials    : true,
};

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<string>("HTTP_PORT") || 7979;
  const SWAGGER_URL = configService.get("SWAGGER_URL") || "api-doc";

  app.use(cookieParser());
  app.enableCors(CORS_SETTINGS);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  
  const document = SwaggerModule.createDocument(
    app, 
    new DocumentBuilder()
    .setTitle("BACK SQRS")
    .setDescription("CRUD posts API")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth({ type: 'http', schema: 'Bearer', bearerFormat: 'Token' }as SecuritySchemeObject, 'Bearer')
    .build()
  );
  
  SwaggerModule.setup(SWAGGER_URL, app, document);

  await app.listen(PORT, ()=> {
    Logger.log(`[INFO] The server started on http://localhost:${PORT} port`, 'Main');
    Logger.log(`[INFO] Swagger doc on http://localhost:${PORT}/${SWAGGER_URL}`, 'Main')
  });
}

bootstrap();
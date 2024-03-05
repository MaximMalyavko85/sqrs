import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PaymentsModule } from './payments.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1/payments/');

  const document = SwaggerModule.createDocument(
    app, 
    new DocumentBuilder()
    .setTitle("BACK SQRS")
    .setDescription("CRUD API PAYMENTS")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth({ type: 'http', schema: 'Bearer', bearerFormat: 'Token' } as SecuritySchemeObject, 'Bearer')
    .build()
  );

  const PORT = configService.get<string>("HTTP_PORT") || 9002;
  const SWAGGER_URL = configService.get("SWAGGER_URL") || "api-doc-payments";

  SwaggerModule.setup(SWAGGER_URL, app, document);
    
  await app.listen(PORT, ()=> {
    Logger.log(`[INFO] The server started on http://localhost:${PORT} port`, 'Main');
    Logger.log(`[INFO] Swagger doc on http://localhost:${PORT}/${SWAGGER_URL}`, 'Main')
  });
}

bootstrap();

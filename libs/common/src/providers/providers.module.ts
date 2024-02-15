import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject : [ConfigService],
      useFactory: async (confiService: ConfigService) => ({
        synchronize : true,
        logging     : true,
        schema      : 'public',
        type        : 'postgres',
        entities    : [UserEntity],
        host        : confiService.get('POSTGRES_HOST'),
        port        : confiService.get('POSTGRES_PORT'), 
        database    : confiService.get('POSTGRES_DB'),
        username    : confiService.get('POSTGRES_USER'),  
        password    : confiService.get('POSTGRES_PASSWORD'),
      }),
    }),
    MongooseModule.forRootAsync({
      imports   : [ConfigModule],
      inject    : [ConfigService],
      useFactory: async (confiService: ConfigService) => ({
        uri: confiService.get('MONGO_HOST'),
      }),
    }),
  ]
})
export class ProvidersModule {}
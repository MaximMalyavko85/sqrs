import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { ProvidersModule } from './providers/providers.module';
import { AllexceptionsFilter, SharedServices } from './shared';
import { APP_FILTER } from '@nestjs/core';


@Module({
  providers: [
    CommonService,
    {
      provide: APP_FILTER,
      useClass: AllexceptionsFilter
    }
  ],
  exports: [
    CommonService, 
   ],
  imports: [
    ConfigModule, 
    ProvidersModule
  ],
})
export class CommonModule {}

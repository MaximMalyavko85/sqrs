import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { AllexceptionsFilter } from './shared';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    {
      provide : APP_FILTER,
      useClass: AllexceptionsFilter
    },
  ],
  imports: [ 
    ProvidersModule,
    JwtModule.register({ global: true })
  ],
  exports: []
})
export class CommonModule {}

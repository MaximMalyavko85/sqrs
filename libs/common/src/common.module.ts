import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { AllexceptionsFilter } from './shared';
import { ProvidersModule } from './providers/providers.module';
import { ChannelModule } from './channels/channels.module';

@Module({
  providers: [
    {
      provide : APP_FILTER,
      useClass: AllexceptionsFilter
    },
  ],
  imports: [ 
    ProvidersModule,
    JwtModule.register({ global: true }),
    ChannelModule
  ],
  exports: []
})
export class CommonModule {}

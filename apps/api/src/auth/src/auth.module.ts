import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFacade } from './services/auth.facade';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { authFacadeFactory } from './providers/auth-facade.factory';

@Module({
  controllers: [AuthController],
  imports: [CqrsModule],
  providers: [
    AuthService,
    {
      provide: AuthFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: authFacadeFactory
    }
  ],
  exports: [AuthFacade]
})
export class AuthModule {}

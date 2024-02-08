import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthFacade } from './services/auth.facade';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { authFacadeFactory } from './providers/auth-facade.factory';
import { AUTH_COMMAND_HANDLERS } from './services/commands';
import { UsersModule } from 'apps/users/src/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    CqrsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: AuthFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: authFacadeFactory
    }, 
    ...AUTH_COMMAND_HANDLERS
  ],
  exports: [AuthFacade]
})
export class AuthModule {}

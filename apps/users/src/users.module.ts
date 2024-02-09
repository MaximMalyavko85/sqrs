import { Module } from '@nestjs/common';
import { UserRepository } from './providers/user.repository';
import { UserAdapter } from './providers/user.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@common/providers/typeorm';
import { UserFacade } from './services/user.facade';
import { userFacadeFactory } from './providers/user-facade.factory';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { USER_COMMAND_HANDLERS } from './services/commands';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
    {
      provide: UserFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: userFacadeFactory
    },
    ...USER_COMMAND_HANDLERS
  ],
  exports: [UserRepository, UserFacade]
})
export class UsersModule {}

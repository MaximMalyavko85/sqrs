import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from '@auth/token.service';
import { UserFacade } from './services/user.facade';
import { UsersController } from './users.controller';
import { QUERYS_HANDLERS } from './services/queries';
import { UserEntity } from '@common/providers/typeorm';
import { USER_COMMAND_HANDLERS } from './services/commands';
import { SessionModel, UserSession } from '@common/providers/mongo';
import { SessionRepository, SessionAdapter } from '@auth/providers';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { UserAdapter, UserRepository, userFacadeFactory } from './providers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forFeature([{name: UserSession.name, schema: SessionModel}])
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
    {
      provide: SessionRepository,
      useClass: SessionAdapter,
    },
    {
      provide: UserFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: userFacadeFactory
    },
    ...USER_COMMAND_HANDLERS,
    ...QUERYS_HANDLERS,
    TokenService
  ],
  exports: [UserRepository, UserFacade]
})
export class UsersModule {}

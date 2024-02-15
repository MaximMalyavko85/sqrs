import { Module } from '@nestjs/common';
import { UserRepository } from './providers/user.repository';
import { UserAdapter } from './providers/user.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@common/providers/typeorm';
import { UserFacade } from './services/user.facade';
import { userFacadeFactory } from './providers/user-facade.factory';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { USER_COMMAND_HANDLERS } from './services/commands';
import { TokenService } from '@auth/token.service';
import { SessionRepository, SessionAdapter } from '@auth/providers';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModel, UserSession } from '@common/providers/mongo/entities/session.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forFeature([{name: UserSession.name, schema: SessionModel}])
  ],
  controllers: [],
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
    TokenService
  ],
  exports: [UserRepository, UserFacade]
})
export class UsersModule {}

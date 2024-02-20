import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'apps/users/src/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModel, UserSession } from '@common/providers/mongo/entities/session.entity';
import { SessionRepository } from './providers/session.repository';
import { SessionAdapter } from './providers/session.adapter';
import { TokenService } from './token.service';


@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{name: UserSession.name, schema: SessionModel}])
  ],
  providers: [
    {
      provide : SessionRepository,
      useClass: SessionAdapter,
    },
    TokenService
  ],
  exports: [SessionRepository]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { SessionModel, UserSession } from '@common/providers/mongo';
import { SessionAdapter, SessionRepository } from './providers';


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

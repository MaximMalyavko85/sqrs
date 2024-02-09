import { Module } from '@nestjs/common';
import { UserRepository } from './providers/user.repository';
import { UserAdapter } from './providers/user.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/providers/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: UserAdapter,
    }
  ],
  exports: [UserRepository]
})
export class UsersModule {}

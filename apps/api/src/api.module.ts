import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule, SharedServices } from '@app/common';
import { AuthModule } from './auth/src/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: SharedServices.getConfigBaseOnMode(),
    }),
    CommonModule,
    AuthModule,
],
  controllers: [],
  providers: [],
})
export class ApiModule {}

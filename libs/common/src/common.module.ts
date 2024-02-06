import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
//import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ProvidersModule } from './providers/providers.module';
import { SharedServices } from './shared';


@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [ConfigModule, ProvidersModule], //DatabaseModule
})
export class CommonModule {}

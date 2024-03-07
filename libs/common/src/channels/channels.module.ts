import { Global, Module } from "@nestjs/common/decorators";
import { ChannelConsumerService, ChannelProviderService } from "./notifications";

@Global()
@Module({
  providers: [ChannelConsumerService, ChannelProviderService],
  exports: [ChannelProviderService],
})
export class ChannelModule {}
import { Module } from '@nestjs/common';
import { RoundModule } from './rounds/round.module';

@Module({
  imports: [RoundModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RoundModule } from './rounds/round.module';
import { RankingModule } from './rankings/ranking.module';

@Module({
  imports: [RoundModule, RankingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

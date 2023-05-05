import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { DatabaseModule } from '../database/database.module';
import { RankingService } from './ranking.service';
import { RepositoryName } from 'src/config/constants';
import { Player } from 'src/players/player.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [RankingController],
  providers: [
    RankingService,
    {
      provide: RepositoryName.PLAYER,
      useValue: Player,
    },
  ],
})
export class RankingModule {}

import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/players/player.entity';

@Controller('/rankings')
export class RankingController {
  constructor(private readonly roundService: RankingService) {}

  @Get()
  getRankings(): Promise<Player[]> {
    return this.roundService.getRankings();
  }
}

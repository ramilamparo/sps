import { Injectable, Inject } from '@nestjs/common';
import { RepositoryName } from 'src/config/constants';
import { Player } from 'src/players/player.entity';
import { literal } from 'sequelize';

@Injectable()
export class RankingService {
  constructor(
    @Inject(RepositoryName.PLAYER)
    private playerRepository: typeof Player,
  ) {}

  async getRankings(): Promise<Player[]> {
    const playerRankings = await this.playerRepository.findAll({
      limit: 5,
      order: [['score', 'DESC']],
      attributes: [
        'id',
        'username',
        [
          literal(
            `(SELECT MAX(points) FROM roundplayers WHERE roundplayers.playerId = Player.id)`,
          ),
          'score',
        ],
      ],
    });
    return playerRankings;
  }
}

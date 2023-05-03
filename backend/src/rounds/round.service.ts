import { Injectable, Inject } from '@nestjs/common';
import { Round } from './round.entity';
import { RepositoryName } from 'src/config/constants';
import { CreateRoundDto } from './dto/create-round.dto';
import { Player } from 'src/players/player.entity';
import { Op } from 'sequelize';
import { RoundPlayer } from 'src/round-players/round-player.entity';

@Injectable()
export class RoundService {
  constructor(
    @Inject(RepositoryName.ROUND)
    private roundRepository: typeof Round,
    @Inject(RepositoryName.PLAYER)
    private playerRepository: typeof Player,
    @Inject(RepositoryName.ROUND_PLAYER)
    private roundPlayerRepository: typeof RoundPlayer,
  ) {}

  async create(body: CreateRoundDto): Promise<Round> {
    const existingPlayers = await this.playerRepository.findAll({
      where: {
        username: {
          [Op.in]: body.usernames,
        },
      },
    });

    await this.playerRepository.bulkCreate(
      body.usernames
        .filter(
          (username) =>
            !existingPlayers.some((player) => player.username === username),
        )
        .map((username) => ({ username })),
    );

    const allPlayers = await this.playerRepository.findAll({
      where: {
        username: {
          [Op.in]: body.usernames,
        },
      },
    });

    const round = await this.roundRepository.create();

    await this.roundPlayerRepository.bulkCreate(
      allPlayers.map((player) => ({
        playerId: player.id,
        roundId: round.id,
        points: 1000,
      })),
    );

    await round.reload({ include: [Player] });

    return round;
  }
}

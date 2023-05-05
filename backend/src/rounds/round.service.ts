import { Injectable, Inject } from '@nestjs/common';
import { Round } from './round.entity';
import { RepositoryName } from 'src/config/constants';
import { CreateRoundDto } from './dto/create-round.dto';
import { Player } from 'src/players/player.entity';
import { Op, literal } from 'sequelize';
import { RoundPlayer } from 'src/round-players/round-player.entity';
import { BetRoundDto, RoundDtoBet } from './dto/bet-round.dto';

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
          [Op.in]: body.players,
        },
      },
    });

    await this.playerRepository.bulkCreate(
      body.players
        .filter(
          (username) =>
            !existingPlayers.some((player) => player.username === username),
        )
        .map((username) => ({ username })),
    );

    const allPlayers = await this.playerRepository.findAll({
      where: {
        username: {
          [Op.in]: body.players,
        },
      },
    });

    const round = await this.roundRepository.create();

    await this.roundPlayerRepository.bulkCreate(
      allPlayers.map((player) => ({
        playerId: player.id,
        roundId: round.id,
        points: INITIAL_POINTS,
      })),
    );

    await round.reload({ include: [{ all: true }] });

    return round;
  }

  async bet(roundId: number, body: BetRoundDto) {
    const round = await this.roundRepository.findOne({
      where: {
        id: roundId,
      },
      include: [{ all: true }],
    });
    const randomNumber = this.generateRandomNumber();
    const winner = body.bets.reduce<RoundDtoBet | null>((winner, bet) => {
      if (!winner && bet.bet > 0 && bet.guess <= randomNumber) {
        return bet;
      }
      if (winner && bet.bet > 0 && bet.guess <= randomNumber) {
        const distanceA = randomNumber - bet.guess;
        const distanceB = randomNumber - winner.guess;
        if (distanceA < distanceB) {
          return bet;
        }
      }
      return winner;
    }, null);

    if (winner) {
      const playerWinner = round.players.find(
        (player) => player.username === winner.player,
      );
      await playerWinner.$set('rounds', [round], {
        through: { points: literal(`points + ${winner.bet}`) },
      });
    }

    for (const player of round.players) {
      const bet = body.bets.find((bet) => bet.player === player.username);
      if (bet && bet.player !== winner?.player) {
        await player.$set('rounds', [round], {
          through: {
            points: literal(
              `points - ${Math.min(
                bet.bet,
                player.getDataValue('RoundPlayer').points,
              )}`,
            ),
          },
        });
      }
    }

    await round.reload();

    return { round, number: randomNumber };
  }

  private generateRandomNumber() {
    return Math.round(Math.random() * 100 * 10) / 100;
  }
}

const INITIAL_POINTS = 1000;

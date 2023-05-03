import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Player } from 'src/players/player.entity';
import { Round } from 'src/rounds/round.entity';

@Table
export class RoundPlayer extends Model {
  @ForeignKey(() => Player)
  @Column
  playerId: number;

  @ForeignKey(() => Round)
  @Column
  roundId: number;

  @Column
  points: number;
}

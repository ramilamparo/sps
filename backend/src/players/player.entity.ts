import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { RoundPlayer } from 'src/round-players/round-player.entity';
import { Round } from 'src/rounds/round.entity';

@Table({ tableName: 'Players', underscored: true })
export class Player extends Model {
  @Column({ unique: true })
  username: string;

  @BelongsToMany(() => Round, () => RoundPlayer)
  rounds: Round[];
}

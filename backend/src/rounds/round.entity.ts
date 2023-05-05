import { Table, Model, BelongsToMany } from 'sequelize-typescript';
import { Player } from 'src/players/player.entity';
import { RoundPlayer } from 'src/round-players/round-player.entity';

@Table({ tableName: 'Rounds', underscored: true })
export class Round extends Model {
  @BelongsToMany(() => Player, () => RoundPlayer)
  players: Player[];
}

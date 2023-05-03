import { Sequelize } from 'sequelize-typescript';
import { Round } from '../rounds/round.entity';
import { Player } from 'src/players/player.entity';
import { RoundPlayer } from 'src/round-players/round-player.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'sps',
      });
      sequelize.addModels([Round, Player, RoundPlayer]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

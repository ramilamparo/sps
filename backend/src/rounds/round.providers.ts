import { RepositoryName } from 'src/config/constants';
import { Round } from './round.entity';
import { RoundPlayer } from 'src/round-players/round-player.entity';
import { Player } from 'src/players/player.entity';

export const roundsProviders = [
  {
    provide: RepositoryName.ROUND,
    useValue: Round,
  },
  {
    provide: RepositoryName.ROUND_PLAYER,
    useValue: RoundPlayer,
  },
  {
    provide: RepositoryName.PLAYER,
    useValue: Player,
  },
];

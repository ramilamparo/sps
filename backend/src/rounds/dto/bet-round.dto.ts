export interface RoundDtoBet {
  bet: number;
  guess: number;
  player: string;
}

export class BetRoundDto {
  bets: RoundDtoBet[];
}

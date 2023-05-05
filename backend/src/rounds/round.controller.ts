import { Body, Controller, Post, Param } from '@nestjs/common';
import { RoundService } from './round.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { Round } from './round.entity';
import { BetRoundDto } from './dto/bet-round.dto';

@Controller('/rounds')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post()
  create(@Body() body: CreateRoundDto): Promise<Round> {
    return this.roundService.create(body);
  }

  @Post('/:roundId/bet')
  bet(
    @Param('roundId') roundId: number,
    @Body() body: BetRoundDto,
  ): Promise<{ round: Round; number: number }> {
    return this.roundService.bet(roundId, body);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { RoundService } from './round.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { Round } from './round.entity';

@Controller('/rounds')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post()
  create(@Body() body: CreateRoundDto): Promise<Round> {
    return this.roundService.create(body);
  }
}

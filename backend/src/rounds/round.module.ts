import { Module } from '@nestjs/common';
import { RoundController } from './round.controller';
import { DatabaseModule } from '../database/database.module';
import { RoundService } from './round.service';
import { roundsProviders } from './round.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RoundController],
  providers: [RoundService, ...roundsProviders],
})
export class RoundModule {}

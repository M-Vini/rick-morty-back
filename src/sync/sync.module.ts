import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { CharacterModule } from 'src/character/character.module';
import { ConfigModule } from '@nestjs/config';
import { OriginModule } from 'src/origin/origin.module';
import { LocationModule } from 'src/location/location.module';


@Module({
  imports: [CharacterModule, ConfigModule, OriginModule, LocationModule],
  controllers: [SyncController],
  providers: [SyncService]
})
export class SyncModule {}

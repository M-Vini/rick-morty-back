import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
// import { CharacterRepository } from './character.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { OriginModule } from 'src/origin/origin.module';
import { LocationModule } from 'src/location/location.module';
import { CharacterRepository } from './character.repository';

@Module({
  imports: [OriginModule, LocationModule],
  controllers: [CharacterController],
  providers: [CharacterService, PrismaService, CharacterRepository],
  exports: [CharacterService, CharacterRepository]
})

export class CharacterModule {}

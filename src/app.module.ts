import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CharacterModule } from './character/character.module';
import { PrismaModule } from './prisma/prisma.module';
import { OriginModule } from './origin/origin.module';
import { LocationModule } from './location/location.module';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CharacterModule,
    PrismaModule,
    OriginModule,
    LocationModule,
    SyncModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

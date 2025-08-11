import { Module } from '@nestjs/common';
import { OriginRepository} from './origin.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OriginRepository, PrismaService],
  exports: [OriginRepository]
})
export class OriginModule {}

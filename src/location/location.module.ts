import { Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [LocationRepository, PrismaService],
    exports: [LocationRepository]
})
export class LocationModule {}

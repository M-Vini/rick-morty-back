import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharacterRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.character.findMany({
            include: {
                origin: true,
                location: true
            }
        });
    };

    async upsert(data: any, externalId: number) {
        return await this.prisma.character.upsert({
            where: { externalId },
            update: {},
            create: data
        });
    };
};
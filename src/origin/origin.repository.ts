import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IOrigin } from "./interface/IOrigin";
@Injectable()
export class OriginRepository {
    constructor(private readonly prisma: PrismaService) { }

    async upsertById(origin: IOrigin) {
        if (!origin.id) return null;

        return await this.prisma.origin.upsert({
            where: { id: origin.id },
            update: {},
            create: { id: origin.id, name: origin.name, url: origin.url }
        })
    };
}
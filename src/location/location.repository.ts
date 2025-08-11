import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ILocation } from "./interface/ILocation";


@Injectable()
export class LocationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async upsertById(location: ILocation) {
        if (!location.id) return null;

        return await this.prisma.location.upsert({
            where: { id: location.id },
            update: {},
            create: { id: location.id, name: location.name, url: location.url }
        })
    }
}
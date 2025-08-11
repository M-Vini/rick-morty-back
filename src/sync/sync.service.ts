import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CharacterRepository } from 'src/character/character.repository';
import { LocationRepository } from 'src/location/location.repository';
import { OriginRepository } from 'src/origin/origin.repository';

@Injectable()
export class SyncService {
    constructor(
        private readonly characterRepository: CharacterRepository,
        private readonly originRepository: OriginRepository,
        private readonly locationRepository: LocationRepository,
        private configService: ConfigService
    ) { }

    async syncCharactersFromApi() {

        const urlBaseApi = this.configService.get('URL_BASE_API')
        let nextUrl: string | null = `${urlBaseApi}/character`

        while (nextUrl) {
            const response = await fetch(nextUrl);

            const { results, info }: any = response;

            for (const apiChar of results) {
                const origin = await this.originRepository.upsertById(apiChar.origin);
                const location = await this.locationRepository.upsertById(apiChar.location);

                await this.characterRepository.upsert(
                    {
                        externalId: apiChar.id,
                        name: apiChar.name,
                        status: apiChar.status,
                        species: apiChar.species,
                        type: apiChar.type,
                        gender: apiChar.gender,
                        originId: origin?.id ?? null,
                        locationId: location?.id ?? null,
                    },
                    apiChar.id
                )
            }
        }
    }
}

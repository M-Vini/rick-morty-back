import { Controller, Get } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('characters')
export class CharacterController {
    constructor(private readonly characterService: CharacterService){}

    @Get()
    async findAll(){
        return await this.characterService.findAll();
    }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

type Location = {
  name: string | null;
  url: string | null;
}

type Origin = {
  name: string | null;
  url: string | null;
}

interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
}

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) { }

  async getCharacters() {
    const urlBaseApi = this.configService.get('URL_BASE_API');

    let allCharacters: ICharacter[] = [];
    let nextPage: string | null = `${urlBaseApi}/character`;

    for (let i = 1; i <= 10 && nextPage; i++) {
    // while(nextPage){
      const req = await fetch(nextPage);

      if(!req.ok){
        throw new Error(`Erro ao buscar personagens: ${req.statusText}`);
      }
      
      const data:any = await req.json();

      console.log(data)

      if(!data.results || !data.info){
        throw new Error('Dados inválidos recebidos da API');
      }

      allCharacters = allCharacters.concat(
        data.results.map((char: ICharacter) => ({
          id: char.id,
          name: char.name,
          status: char.status,
          species: char.species,
          gender: char.gender,
          origin: {
            name: char.origin.name,
            url: char.origin.url
          },
          location: {
            name: char.location.name,
            url: char.location.url
          },
          image: char.image
        }))
      );
      nextPage = data.info.next;
    }

    console.log('Quantidade de personagens: ', allCharacters.length)

    return allCharacters;
  }
}
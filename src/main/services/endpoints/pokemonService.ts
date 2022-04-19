import { HttpClient } from '../models/axios';
import { Pokemon, PokemonResponse } from '../../../models/pokemon';

export default function PokemonServiceI(httpClient: HttpClient) {
  const basePath = '/pokemon';

  function getPokemons(offset?: number, limit?: number): Promise<PokemonResponse> {
    return httpClient.get(`${basePath}?offset=${offset}&limit=${limit}`);
  }

  function getPokemonByIdOrName(idName: number | string): Promise<Pokemon> {
    return httpClient.get(`${basePath}/${idName}`);
  }

  return {
    getPokemons,
    getPokemonByIdOrName,
  };
}

import AxiosClient from './axios/axiosClient';
import pokemonService from './endpoints/pokemonService';
import { InitialConfiguration } from './models/axios';

function apiClient(configuration: InitialConfiguration) {
  const httpClient = new AxiosClient(configuration);

  return {
    // builder for every service
    buildPokemonService: () => pokemonService(httpClient),
  };
}

const servicesFactory = apiClient({ baseUrl: 'https://pokeapi.co/api/v2/' });
export const PokemonService = servicesFactory.buildPokemonService();

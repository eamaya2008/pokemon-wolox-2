import { Pokemon } from '../../../models/pokemon';
import { createActionCreator as actionCreator } from '../storeHandlers';

export const obtainPokemons = actionCreator('main/obtain_all_pokemons', (offset?: number, limit?: number) => ({
  offset,
  limit,
}));

export const obtainAllPokemonsSuccess = actionCreator('main/obtain_all_pokemons_success', (pokemons: Pokemon[]) => ({
  pokemons,
}));

export const obtainPokemonByIdOrName = actionCreator('main/obtain_pokemon_by_id_name', (idName: number | string) => ({
  idName,
}));

export const obtainListOfPokemonsNameSuccess = actionCreator(
  'main/obtain_a_list_of_all_pokemons_name',
  (nameList: string[]) => ({ nameList }),
);

export const loading = actionCreator('main/loading', (isLoading: boolean) => ({ isLoading }));

export const showModalDetails = actionCreator('main/open_modal_details', (isOpen: boolean) => ({ isOpen }));

export const setPokemonToShowDetails = actionCreator('main/set_pokemon_to_details', (pokemon: Pokemon) => ({
  pokemon,
}));

export const addPokemonToCompare = actionCreator('main/add_pokemon_to_compare', (pokemon: Pokemon) => ({ pokemon }));

export const deletePokemonToCompare = actionCreator('main/delete_pokemon_to_compare', (pokemon: Pokemon) => ({
  pokemon,
}));

export const cleanComparator = actionCreator('main/clean_comparator');

export const cleanChecks = actionCreator('main/clean_checks', (areClean: boolean) => ({ areClean }));

export const setMaxLimit = actionCreator('main/set_max_limit', (limit: number) => ({ limit }));

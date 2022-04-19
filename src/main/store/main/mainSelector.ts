import { RootState } from '../moduleTypes';

export const selectAllPokemons = (state: RootState) => state.main.pokemons;
export const selectLoading = (state: RootState) => state.main.loading;
export const selectNameList = (state: RootState) => state.main.nameList;
export const selectShowModal = (state: RootState) => state.main.showModal;
export const selectPokemonInModal = (state: RootState) => state.main.pokemonInModal;
export const selectPokemonsInComparison = (state: RootState) => state.main.pokemonsToCompare;
export const selectCheckCleaner = (state: RootState) => state.main.checksAreClean;
export const selectMaxLimit = (state: RootState) => state.main.maxLimit;

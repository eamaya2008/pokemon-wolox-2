import { createReducer, ActionCreatorPayload as ACP } from '../storeHandlers';
import { Pokemon } from '../../../models/pokemon';
import {
  obtainAllPokemonsSuccess,
  loading,
  obtainListOfPokemonsNameSuccess,
  showModalDetails,
  setPokemonToShowDetails,
  addPokemonToCompare,
  deletePokemonToCompare,
  cleanComparator,
  cleanChecks,
  setMaxLimit,
} from './mainActions';

export type State = {
  loading: boolean;
  pokemons: Pokemon[];
  nameList: string[];
  showModal: boolean;
  pokemonInModal: Pokemon | null;
  pokemonsToCompare: Pokemon[];
  checksAreClean: boolean;
  maxLimit: number;
};

export const initialState: State = {
  loading: false,
  pokemons: [],
  nameList: [],
  showModal: false,
  pokemonInModal: null,
  pokemonsToCompare: [],
  checksAreClean: false,
  maxLimit: 20,
};

function handleAddPokemonToCompare(state: State, { pokemon }: ACP<typeof addPokemonToCompare>) {
  if (pokemon) {
    state.pokemonsToCompare = [...state.pokemonsToCompare, pokemon];
  }
}

function handleDeletePokemonToCompare(state: State, { pokemon }: ACP<typeof addPokemonToCompare>) {
  if (pokemon) {
    const newList = state.pokemonsToCompare.filter((p) => p.id !== pokemon.id);
    state.pokemonsToCompare = newList;
  }
}

const rootMainReducer = createReducer(initialState)
  .handleAction(loading, (s, { isLoading }) => {
    s.loading = isLoading;
  })
  .handleAction(obtainAllPokemonsSuccess, (s, { pokemons }) => {
    s.pokemons = pokemons;
  })
  .handleAction(obtainListOfPokemonsNameSuccess, (s, { nameList }) => {
    s.nameList = nameList;
  })
  .handleAction(showModalDetails, (s, { isOpen }) => {
    s.showModal = isOpen;
  })
  .handleAction(setPokemonToShowDetails, (s, { pokemon }) => {
    s.pokemonInModal = pokemon;
  })
  .handleAction(addPokemonToCompare, handleAddPokemonToCompare)
  .handleAction(deletePokemonToCompare, handleDeletePokemonToCompare)
  .handleAction(cleanComparator, (s) => {
    s.pokemonsToCompare = [];
  })
  .handleAction(cleanChecks, (s, { areClean }) => {
    s.checksAreClean = areClean;
  })
  .handleAction(setMaxLimit, (s, { limit }) => {
    s.maxLimit = limit;
  });

export default rootMainReducer;

import { SagaIterator } from 'redux-saga';
import { all, put, takeLatest, call, fork } from 'redux-saga/effects';
import {
  obtainPokemons,
  obtainAllPokemonsSuccess,
  loading,
  obtainPokemonByIdOrName,
  obtainListOfPokemonsNameSuccess,
  cleanComparator,
  cleanChecks,
  setMaxLimit,
} from './mainActions';
import { PokemonService } from '../../services';
import { Pokemon, PokemonResponse, Stat } from '../../../models/pokemon';

function* handleGetPokemonsByIdOrName({ payload }: ReturnType<typeof obtainPokemonByIdOrName>) {
  const { idName } = payload!;
  if (idName) {
    try {
      const pokemon: Pokemon = yield call(PokemonService.getPokemonByIdOrName, idName);
      if (pokemon) {
        yield put(obtainAllPokemonsSuccess([pokemon]));
      }
    } catch (error) {
      // TODO: Manage error
    }
  }
}

function* getAllPokemonsName(limit: number) {
  if (limit) {
    yield put(setMaxLimit(limit));
    try {
      const response: PokemonResponse = yield call(PokemonService.getPokemons, undefined, limit);
      if (response) {
        const nameList = response.results.map((r) => r.name);
        yield put(obtainListOfPokemonsNameSuccess(nameList));
      }
    } catch (error) {
      // TODO: Manage error
    }
  }
}

function* handleObtainPokemons({ payload }: ReturnType<typeof obtainPokemons>) {
  yield put(loading(true));
  const { offset, limit } = payload!;
  try {
    const response: PokemonResponse = yield call(PokemonService.getPokemons, offset, limit);
    if (response) {
      // Open a fork to get all names base on the response
      yield fork(getAllPokemonsName as any, response.count);
      // Create a new array with the obtained pokemons
      let pokemonsWithDetails: Pokemon[] = [];
      for (const pokemon of response.results) {
        const pokemonDetail: Pokemon = yield call(PokemonService.getPokemonByIdOrName, pokemon.name);
        if (pokemonDetail) {
          pokemonsWithDetails = [...pokemonsWithDetails, pokemonDetail];
        }
      }
      if (pokemonsWithDetails.length > 0) {
        yield put(obtainAllPokemonsSuccess(pokemonsWithDetails));
        yield put(loading(false));
      }
    }
  } catch (error) {
    // TODO: Manage error
  }
}

function* handleCleanComparator() {
  yield put(cleanChecks(true));
}

export default function* mainSaga(): SagaIterator {
  return yield all([
    takeLatest(obtainPokemons.type, handleObtainPokemons),
    takeLatest(obtainPokemonByIdOrName.type, handleGetPokemonsByIdOrName),
    takeLatest(cleanComparator.type, handleCleanComparator),
  ]);
}

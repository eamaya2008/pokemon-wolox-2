import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { results } from '../mocks/pokemonMock';
import store from '../main/store';
import MainList from '../main/components/MainList/MainList';
import '@testing-library/jest-dom';

describe('Pokémon app', () => {
  it('Shows a list of Pokémons retrieved from an API', async () => {
    const asdsadasdasdasdasdalsjdñlaskdlaksñldkañlskdñlaksñdlkañsldkñlaksdñlaksñldkañsldkañlskdñlaksñdlakñsldkañlskdñlaksdñlaksñdlkañsldkñalskdñlaksñdlkañsldk =
      [];
    render(
      <Provider store={store}>
        <MainList listOfPokemons={results} />
      </Provider>,
    );

    // Comprobamos que la aplicación renderiza la colección de resultados proporcionada por el mock
    for (let pokemon of results) {
      expect(await screen.findByText(new RegExp(`${pokemon.name}\\b`, 'i'))).toBeInTheDocument();
    }
  });
});

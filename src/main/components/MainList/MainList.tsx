import React, { FunctionComponent } from 'react';
import { Pokemon } from '../../../models/pokemon';
import Card from '../Card/Card';

type MainListProps = {
  listOfPokemons: Pokemon[];
};

const MainList: FunctionComponent<MainListProps> = ({ listOfPokemons }) => {
  return (
    <article className="pokemon-list">
      {listOfPokemons && listOfPokemons.map((pokemon) => <Card key={pokemon.name} character={pokemon} />)}
    </article>
  );
};

export default MainList;

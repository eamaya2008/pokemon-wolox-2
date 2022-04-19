import React, { FunctionComponent } from 'react';
import { Pokemon } from '../../../models/pokemon';
import PokemonTypes from './PokemonTypes';
import StatMove from './StatMove';

type DetailsBodyProps = {
  character: Pokemon;
};

const DetailsBody: FunctionComponent<DetailsBodyProps> = ({ character }) => {
  const { name, types, moves, stats, height, weight } = character;

  return (
    <div className="details-body">
      <h3 className="details-title">{name}</h3>
      <PokemonTypes types={types} />
      <StatMove stats={stats} moves={moves} height={height} weight={weight} />
    </div>
  );
};

export default DetailsBody;

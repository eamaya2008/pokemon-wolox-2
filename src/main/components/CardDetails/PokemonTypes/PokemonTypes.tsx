import React, { FunctionComponent } from 'react';
import { PokemonClassType } from '../../../../models/pokemon';
import DetailType from './DetailType';

type PokemonTypesProps = {
  types: PokemonClassType[];
};

const PokemonTypes: FunctionComponent<PokemonTypesProps> = ({ types }) => (
  <article className="details-types">{types && types.map((t, index) => <DetailType key={index} type={t} />)}</article>
);

export default PokemonTypes;

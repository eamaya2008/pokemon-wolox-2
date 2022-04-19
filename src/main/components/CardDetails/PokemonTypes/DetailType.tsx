import React, { FunctionComponent } from 'react';
import { PokemonClassType } from '../../../../models/pokemon';
import { classColor } from '../../../utils/constants';

type DetailTypeProps = {
  type: PokemonClassType;
};

const DetailType: FunctionComponent<DetailTypeProps> = ({ type }) => {
  const colorOfTheClass = classColor[type.type.name];

  return (
    <p className="details-type" style={{ backgroundColor: colorOfTheClass && colorOfTheClass }}>
      {type.type.name}
    </p>
  );
};
export default DetailType;

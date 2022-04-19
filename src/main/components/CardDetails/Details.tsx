import React, { FunctionComponent } from 'react';
import ColoredBG from '../ColoredBG/ColoredBG';
import { Pokemon, Sprites } from '../../../models/pokemon';
import { classColor } from '../../utils/constants';
import DetailsBody from './DetailsBody';

type CardType = {
  character: Pokemon;
};

enum SpritesKeys {
  OTHER = 'other',
  DREAMWORLD = 'dream_world',
  FRONT_DEFAULT = 'front_default',
}

const Details: FunctionComponent<CardType> = ({ character }) => {
  const { sprites, types, id } = character;
  const colorOfTheClass = classColor[types[0].type.name];

  function getImage() {
    if (sprites[SpritesKeys.OTHER]) {
      const l1 = sprites[SpritesKeys.OTHER] as Sprites;
      if (l1[SpritesKeys.DREAMWORLD]) {
        const l2 = l1[SpritesKeys.DREAMWORLD] as Sprites;
        if (l2[SpritesKeys.FRONT_DEFAULT]) {
          return l2[SpritesKeys.FRONT_DEFAULT] as string;
        } else {
          return sprites[SpritesKeys.FRONT_DEFAULT] as string;
        }
      }
    }
  }

  return (
    <div className="card-details">
      <ColoredBG className="detail-header" color={colorOfTheClass}>
        <div className="detail-id">{id}</div>
        <img src={getImage()} alt="" className="card-body-img" />
      </ColoredBG>
      <DetailsBody character={character} />
    </div>
  );
};

export default Details;

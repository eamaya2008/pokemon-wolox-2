import React, { FunctionComponent } from 'react';
import CardBody from './CardBody';
import ColoredBG from '../ColoredBG/ColoredBG';
import { firstLetterToUpperCase } from '../../utils/functions';
import Checkbox from '../Checkbox/Checkbox';
import { Pokemon } from '../../../models/pokemon';
import { classColor } from '../../utils/constants';
import { useDirectDispatch } from '../../../hooks';
import { showModalDetails, setPokemonToShowDetails } from '../../store/main/mainActions';

type CardType = {
  character: Pokemon;
};

const Card: FunctionComponent<CardType> = ({ character }) => {
  const { name, sprites, types, id } = character;
  const label = firstLetterToUpperCase(name);
  const colorOfTheClass = classColor[types[0].type.name];
  // Actions
  const showModal = useDirectDispatch(showModalDetails);
  const setPokemon = useDirectDispatch(setPokemonToShowDetails);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setPokemon(character);
    showModal(true);
  };

  return (
    <>
      <section className="card" onClick={handleClick}>
        <ColoredBG className="card-header" color={colorOfTheClass}>
          <div className="card-id">{id}</div>
        </ColoredBG>
        <CardBody imgSrc={sprites['front_default'] as string} name={label} />
        <ColoredBG className="card-footer" color={colorOfTheClass}>
          <Checkbox pokemon={character} />
        </ColoredBG>
      </section>
    </>
  );
};

export default Card;

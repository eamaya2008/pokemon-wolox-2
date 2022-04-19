import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCheckCleaner, selectPokemonsInComparison } from '../../store/main/mainSelector';
import {
  addPokemonToCompare as addPokemonToCompareAction,
  cleanChecks as cleanChecksAction,
  deletePokemonToCompare as deletePokemonToCompareAction,
} from '../../store/main/mainActions';
import style from './Checkbox.module.scss';
import { noop } from 'lodash';
import { useDirectDispatch } from '../../../hooks';
import { Pokemon } from '../../../models/pokemon';

type CheckboxProps = {
  pokemon: Pokemon;
};

const Checkbox: FunctionComponent<CheckboxProps> = ({ pokemon }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const pokemonsInComparison = useSelector(selectPokemonsInComparison);
  const checkCleaner = useSelector(selectCheckCleaner);
  // Actions
  const addPokemonToCompare = useDirectDispatch(addPokemonToCompareAction);
  const deletePokemonToCompare = useDirectDispatch(deletePokemonToCompareAction);
  const cleanChecks = useDirectDispatch(cleanChecksAction);

  useEffect(() => {
    if (checkCleaner) {
      setIsChecked(false);
      cleanChecks(false);
    }
  }, [checkCleaner]);

  function onClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.stopPropagation();
    if (pokemonsInComparison.length < 3 && !isChecked) {
      setIsChecked(true);
      addPokemonToCompare(pokemon);
    } else {
      setIsChecked(false);
      deletePokemonToCompare(pokemon);
    }
  }

  return (
    <div onClick={onClick} className="card-footer-buttons">
      <label>Compare</label>
      <input type="checkbox" className={style.check} checked={isChecked} onChange={() => noop}></input>
    </div>
  );
};

export default Checkbox;

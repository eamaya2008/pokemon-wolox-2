import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { X as CloseIcon } from 'react-feather';
import { selectPokemonsInComparison } from '../store/main/mainSelector';
import { useDirectDispatch } from '../../hooks';
import { cleanComparator } from '../store/main/mainActions';

const Comparator: FunctionComponent<{}> = () => {
  const buttonStyle = classNames('nav-button', 'btn');
  const pokemonsInComparison = useSelector(selectPokemonsInComparison);
  const clean = useDirectDispatch(cleanComparator);

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    clean();
  };

  return (
    <div className="comparator">
      <div className="comparator-container">
        <div className="comparator-detail">
          <div className="comparator-detail-label">{`Pokemons to compare (${pokemonsInComparison.length})`}</div>
          <ul className="comparator-list">
            {pokemonsInComparison.map((p) => (
              <li key={p.id}></li>
            ))}
          </ul>
        </div>
        <div className="comparator-actions">
          <NavLink to={'compare'} className={buttonStyle}>
            Compare
          </NavLink>
          <div className="close-compare" onClick={handleClose}>
            <CloseIcon size={'16px'} />
            <span>Clean</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparator;

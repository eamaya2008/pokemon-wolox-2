import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDirectDispatch, useOnMountAndUnmount } from '../../hooks';
import Details from '../components/CardDetails/Details';
import { cleanComparator } from '../store/main/mainActions';
import { selectPokemonsInComparison } from '../store/main/mainSelector';
import { CornerDownLeft as ReturnIcon } from 'react-feather';

const Compare: FunctionComponent<{}> = () => {
  const navigate = useNavigate();
  const pokemonsInComparison = useSelector(selectPokemonsInComparison);
  const clean = useDirectDispatch(cleanComparator);

  useOnMountAndUnmount(() => {
    if (pokemonsInComparison.length <= 0) {
      navigate('/home');
    }
  });

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    clean();
    navigate('/home');
  };

  return (
    <div className="comparison-area">
      <header>
        <h2>Compare Pokemons</h2>
        <div className="close-compare" onClick={handleClose}>
          <ReturnIcon size={'16px'} />
          <span>Return Home</span>
        </div>
      </header>
      <div className="comparison-area-container">
        {pokemonsInComparison.length > 0 ? (
          pokemonsInComparison.map((pokemon) => (
            <div key={pokemon.id} className="detail-container">
              <Details character={pokemon} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Compare;

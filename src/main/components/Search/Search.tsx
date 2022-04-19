import React, { FunctionComponent, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Search as Lupe } from 'react-feather';
import classNames from 'classnames';
import Autocomplete from '../Autocomplete/Autocomplete';
import { selectNameList } from '../../store/main/mainSelector';
import { useDirectDispatch } from '../../../hooks';
import { obtainPokemonByIdOrName } from '../../store/main/mainActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { noop } from 'lodash';

type SearchProps = {
  onClick?: Function;
};

const Search: FunctionComponent<SearchProps> = memo(({ onClick = noop }) => {
  const { t } = useTranslation('common');
  const [input, setInput] = useState<string>('');
  const listOfNames = useSelector(selectNameList);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const obtainPokemon = useDirectDispatch(obtainPokemonByIdOrName);

  const buttonStyle = classNames('search-button', 'btn');

  const handleClick = () => {
    if (onClick !== null) {
      onClick();
    }
    if (pathname !== '/home') {
      navigate('/home');
    }
    obtainPokemon(input);
  };

  const handleChange = (value: string) => {
    setInput(value.toLocaleLowerCase());
  };

  return (
    <div className="search-wrapper">
      <Autocomplete
        suggestions={listOfNames}
        listClassName="search-list"
        inputClassName="search-input"
        inputPlaceholder={t('Menu.search')}
        handleChange={handleChange}
      />
      <button type="button" className={buttonStyle} onClick={handleClick}>
        <Lupe color="white" />
      </button>
    </div>
  );
});

export default Search;

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { useDirectDispatch } from '../../../hooks';
import { cleanComparator } from '../../store/main/mainActions';
import { noop } from 'lodash';

type NavBarProps = {
  onClick?: Function;
};

const Navbar: FunctionComponent<NavBarProps> = ({ onClick = noop }) => {
  const buttonStyle = classNames('nav-button', 'btn');
  const { pathname } = useLocation();
  const clean = useDirectDispatch(cleanComparator);

  const handleClick = () => {
    if (pathname !== '/home') {
      clean();
    }
    if (onClick !== null) {
      onClick();
    }
  };

  return (
    <>
      <NavLink to={'/home'} className={buttonStyle} onClick={handleClick}>
        Home
      </NavLink>
    </>
  );
};

export default Navbar;

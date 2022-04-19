import React, { FunctionComponent, useState } from 'react';
import Navbar from './Navbar';
import Search from '../Search/Search';
import logo from '../../../assets/images/logo-pokemon.png';
import { Menu } from 'react-feather';

const Header: FunctionComponent<{}> = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="header-container">
      <header className="header">
        <img src={logo} alt="logo" className="nav-logo"></img>
        <nav className="long-nav-menu">
          <Navbar />
          <Search />
        </nav>
        <button className="burger-menu-button" onClick={() => setShowMenu(!showMenu)}>
          <Menu />
        </button>
      </header>
      {showMenu && (
        <nav className="burger-menu">
          <Navbar onClick={() => setShowMenu(false)} />
          <Search onClick={() => setShowMenu(false)} />
        </nav>
      )}
    </div>
  );
};

export default Header;

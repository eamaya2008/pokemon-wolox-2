import React, { FunctionComponent, Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import { selectPokemonsInComparison } from '../store/main/mainSelector';
import Comparator from '../components/Comparator';
import { useOnMountAndUnmount } from '../../hooks';

const Layout: FunctionComponent<{}> = () => {
  const pokemonsInComparison = useSelector(selectPokemonsInComparison);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useOnMountAndUnmount(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  });

  return (
    <>
      <Header />
      <main className="main">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {pokemonsInComparison.length > 0 && pathname === '/home' && <Comparator />}
    </>
  );
};

export default Layout;

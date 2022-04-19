import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useDirectDispatch } from '../../hooks';
import { showModalDetails } from '../store/main/mainActions';
import { selectAllPokemons, selectLoading, selectPokemonInModal, selectShowModal } from '../store/main/mainSelector';
import Card from '../components/Card/Card';
import Modal from '../components/Modal/Modal';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/Loader';
import MainList from '../components/MainList/MainList';

const Home: FunctionComponent<{}> = () => {
  const listOfPokemons = useSelector(selectAllPokemons);
  const pokemonDetail = useSelector(selectPokemonInModal);
  const modalIsOpen = useSelector(selectShowModal);
  const showModal = useDirectDispatch(showModalDetails);
  const isLoading = useSelector(selectLoading);

  return (
    <>
      <Pagination />
      {isLoading ? <Loader /> : <MainList listOfPokemons={listOfPokemons} />}
      {modalIsOpen && pokemonDetail && (
        <Modal isVisible={modalIsOpen} onClose={() => showModal(false)} pokemon={pokemonDetail} />
      )}
    </>
  );
};

export default Home;

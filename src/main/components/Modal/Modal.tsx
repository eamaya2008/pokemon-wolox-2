import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Pokemon } from '../../../models/pokemon';
import Details from '../CardDetails/Details';

type ModalProps = {
  isVisible: boolean;
  onClose: Function;
  pokemon: Pokemon;
};

const Modal: FunctionComponent<ModalProps> = ({ isVisible, onClose, pokemon }) => {
  const modalClass = classNames('modal', 'card', {
    ['is-visible']: isVisible,
    ['is-not-visible']: !isVisible,
  });

  function doOnClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (onClose != null) {
      onClose(e);
    }
  }

  return (
    <div className={modalClass} id="modal1">
      <div className="modal-dialog">
        <header>
          <button className="close-modal" aria-label="close modal" data-close onClick={doOnClose}>
            ✕
          </button>
        </header>
        <Details character={pokemon} />
      </div>
    </div>
  );
};

export default Modal;

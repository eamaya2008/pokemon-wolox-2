import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Moves } from '../../../../models/pokemon';

type MoveListProps = {
  moves: Moves[];
};

const MoveList: FunctionComponent<MoveListProps> = ({ moves }) => {
  const movesArray = moves.map((m) => m.move.name);

  const listClass = classNames('details-move-list', {
    ['one-column']: movesArray.length < 8,
    ['two-columns']: movesArray.length > 8,
  });

  return <ul className={listClass}>{movesArray && movesArray.map((name, index) => <li key={index}>{name}</li>)}</ul>;
};

export default MoveList;

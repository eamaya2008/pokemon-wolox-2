import classNames from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import { Moves, Stat } from '../../../../models/pokemon';
import MoveList from './MoveList';
import StatTable from './StatTable';

type StatMoveProps = {
  stats: Stat[];
  moves: Moves[];
  height: number;
  weight: number;
};

enum ButtonState {
  STATS = 'stats',
  MOVES = 'moves',
}

const StatMove: FunctionComponent<StatMoveProps> = ({ stats, moves, height, weight }) => {
  const [activeSection, setActiveSection] = useState<string>(ButtonState.STATS);

  const buttonClass = classNames('btn', 'details-buttons');

  return (
    <article className="details-stats-moves">
      <nav>
        <button
          className={buttonClass}
          style={{ backgroundPosition: activeSection === ButtonState.STATS ? '50%' : '' }}
          onClick={() => setActiveSection(ButtonState.STATS)}
        >
          {ButtonState.STATS.toLocaleUpperCase()}
        </button>
        <button
          className={buttonClass}
          style={{ backgroundPosition: activeSection === ButtonState.MOVES ? '50%' : '' }}
          onClick={() => setActiveSection(ButtonState.MOVES)}
        >
          {ButtonState.MOVES.toLocaleUpperCase()}
        </button>
      </nav>
      {activeSection === ButtonState.STATS ? (
        <section className="details-section">
          <StatTable stats={stats} height={height} weight={weight} />
        </section>
      ) : (
        <section className="details-section">
          <MoveList moves={moves} />
        </section>
      )}
    </article>
  );
};

export default StatMove;

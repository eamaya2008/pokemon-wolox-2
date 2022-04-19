import React, { FunctionComponent } from 'react';
import { Stat } from '../../../../models/pokemon';

type StatTableProps = {
  stats: Stat[];
  height: number;
  weight: number;
};

const StatTable: FunctionComponent<StatTableProps> = ({ stats, height, weight }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td className="stat-label">{'HEIGHT'}</td>
            <td className="stat-number">{`${height} m`}</td>
          </tr>
          <tr>
            <td className="stat-label">{'WEIGHT'}</td>
            <td className="stat-number">{`${weight} kg`}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          {stats &&
            stats.map((s, index) => {
              let maxStatPerStat: number = 0;
              let label: string = '';

              switch (s.stat.name) {
                case 'hp':
                  maxStatPerStat = 255;
                  label = 'HP';

                  break;
                case 'attack':
                  maxStatPerStat = 190;
                  label = 'ATK';

                  break;
                case 'defense':
                  maxStatPerStat = 250;
                  label = 'DEF';

                  break;
                case 'special-attack':
                  maxStatPerStat = 194;
                  label = 'S-ATK';

                  break;
                case 'special-defense':
                  maxStatPerStat = 250;
                  label = 'S-DEF';

                  break;
                case 'speed':
                  maxStatPerStat = 200;
                  label = 'SPD';

                  break;
                default:
                  maxStatPerStat = 0;
                  label = '';

                  break;
              }

              return (
                <tr key={index}>
                  <td className="stat-label">{label}</td>
                  <td className="stat-number">{s.base_stat}</td>
                  <td>
                    <progress max={maxStatPerStat} value={s.base_stat} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default StatTable;

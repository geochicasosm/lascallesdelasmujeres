import { useTranslation } from 'react-i18next';
import { City } from '../../types/city.types';

type SortKey = 'name' | 'pcFemale' | 'pcMale' | 'pcLink' | 'totalNames';
type SortDir = 'asc' | 'desc';

interface StatsTableProps {
  cities: City[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

export const StatsTable = ({ cities, sortKey, sortDir, onSort }: StatsTableProps) => {
  const { t } = useTranslation();

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return <i className="fas fa-sort stats-table-sort-icon inactive"></i>;
    return (
      <i
        className={`fas fa-sort-${sortDir === 'asc' ? 'up' : 'down'} stats-table-sort-icon active`}
      ></i>
    );
  };

  return (
    <div className="stats-table-wrapper">
      <table className="stats-table">
        <thead>
          <tr>
            <th
              className="stats-th sortable"
              onClick={() => onSort('name')}
            >
              {t('stats.table.city')} <SortIcon col="name" />
            </th>
            <th className="stats-th">{t('stats.table.total')}</th>
            <th
              className="stats-th sortable stats-th-female"
              onClick={() => onSort('pcFemale')}
            >
              {t('stats.table.female')} <SortIcon col="pcFemale" />
            </th>
            <th
              className="stats-th sortable"
              onClick={() => onSort('pcMale')}
            >
              {t('stats.table.male')} <SortIcon col="pcMale" />
            </th>
            <th
              className="stats-th sortable stats-th-wiki"
              onClick={() => onSort('pcLink')}
            >
              {t('stats.table.wikiPc')} <SortIcon col="pcLink" />
            </th>
            <th className="stats-th">{t('stats.table.wikiNum')}</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, idx) => (
            <tr key={city.id} className={idx % 2 === 0 ? 'stats-tr-even' : 'stats-tr-odd'}>
              <td className="stats-td stats-td-city">{city.name}</td>
              <td className="stats-td stats-td-center">
                {city.datos.totalNames.toLocaleString()}
              </td>
              <td className="stats-td stats-td-center">
                <span className="stats-badge stats-badge-female">
                  {city.datos.numFemale.toLocaleString()}
                  <span className="stats-badge-pc">({city.datos.pcFemale}%)</span>
                </span>
              </td>
              <td className="stats-td stats-td-center">
                <span className="stats-badge stats-badge-male">
                  {city.datos.numMale.toLocaleString()}
                  <span className="stats-badge-pc">({city.datos.pcMale}%)</span>
                </span>
              </td>
              <td className="stats-td stats-td-center">
                <div className="stats-bar-cell">
                  <div
                    className="stats-bar-fill stats-bar-wiki"
                    style={{ width: `${city.datos.pcLink}%` }}
                  ></div>
                  <span className="stats-bar-label">{city.datos.pcLink}%</span>
                </div>
              </td>
              <td className="stats-td stats-td-center">
                {city.datos.numLink.toLocaleString()} / {(city.datos.numLink + city.datos.numNoLink).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

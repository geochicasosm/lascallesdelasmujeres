import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { City } from '../../types/city.types';

interface CityStatsCardProps {
  city: City;
}

export const CityStatsCard = ({ city }: CityStatsCardProps) => {
  const { t } = useTranslation();
  const { datos } = city;

  return (
    <div className="city-stats-card">
      <div className="city-stats-card-header">
        <h3 className="city-stats-card-name">{city.name}</h3>
        <Link to={`/map/${city.id}`} className="city-stats-card-link">
          <i className="fas fa-map-marker-alt"></i>
        </Link>
      </div>

      {/* Gender bar */}
      <div className="city-stats-gender-bar">
        <div
          className="city-stats-gender-female"
          style={{ width: `${datos.pcFemale}%` }}
          title={`${datos.pcFemale}% ${t('chart.women')}`}
        ></div>
        <div
          className="city-stats-gender-male"
          style={{ width: `${datos.pcMale}%` }}
          title={`${datos.pcMale}% ${t('chart.men')}`}
        ></div>
      </div>

      {/* Stats grid */}
      <div className="city-stats-grid">
        <div className="city-stats-item city-stats-female">
          <span className="city-stats-value">{datos.numFemale}</span>
          <span className="city-stats-pct">({datos.pcFemale}%)</span>
          <span className="city-stats-item-label">{t('chart.women')}</span>
        </div>
        <div className="city-stats-item city-stats-male">
          <span className="city-stats-value">{datos.numMale}</span>
          <span className="city-stats-pct">({datos.pcMale}%)</span>
          <span className="city-stats-item-label">{t('chart.men')}</span>
        </div>
        <div className="city-stats-item city-stats-total">
          <span className="city-stats-value">{datos.totalNames}</span>
          <span className="city-stats-item-label">{t('stats.table.total')}</span>
        </div>
      </div>

      {/* Wikipedia progress */}
      <div className="city-stats-wiki">
        <div className="city-stats-wiki-label">
          <i className="fab fa-wikipedia-w"></i>
          <span>{t('stats.wikiOf')} {city.name}</span>
          <span className="city-stats-wiki-pct">{datos.pcLink}%</span>
        </div>
        <div className="city-stats-wiki-bar">
          <div
            className="city-stats-wiki-fill"
            style={{ width: `${datos.pcLink}%` }}
          ></div>
        </div>
        <div className="city-stats-wiki-nums">
          <span className="city-stats-wiki-with">
            {datos.numLink} {t('chart.have')}
          </span>
          <span className="city-stats-wiki-without">
            {datos.numNoLink} {t('chart.notHave')}
          </span>
        </div>
      </div>
    </div>
  );
};

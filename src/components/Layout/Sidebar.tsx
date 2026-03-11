import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { CityList } from '../CityList';

export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src="/src/images/logo_proyecto.svg"
          alt="Las Calles de las Mujeres"
          className="logo"
        />
      </div>

      <div className="sidebar-footer">
        <p className="project-by">{t('footer.projectBy')}</p>
        <a href="http://geochicas.org/" target="_blank" rel="noopener noreferrer">
          <img
            src="/src/images/logo_geo.svg"
            alt="Geochicas"
            className="logo-geochicas"
          />
        </a>
      </div>

      <div className="separator"></div>

      <div className="sidebar-cities">
        <CityList />
      </div>

      <div className="separator"></div>

      {/* <div className="sidebar-nav">
        <Link
          to="/stats"
          className={`sidebar-nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
        >
          <i className="fas fa-chart-bar"></i> {t('stats.navLink')}
        </Link>
      </div> */}

      <div className="separator"></div>

      <div className="sidebar-social">
        <a
          href="https://github.com/geochicasosm/lascallesdelasmujeres"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i> geochicasosm
        </a>
      </div>
    </div>
  );
};

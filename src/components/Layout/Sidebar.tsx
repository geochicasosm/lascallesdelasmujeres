import { useTranslation } from 'react-i18next';
import { CityList } from '../CityList';
import { LanguageSwitcher } from '../UI/LanguageSwitcher';

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src="/src/images/logo_proyecto.svg"
          alt="Las Calles de las Mujeres"
          className="logo"
        />
        <LanguageSwitcher />
      </div>

      <div className="sidebar-description">
        <p className="description-text">{t('description.text1')}</p>
        <p className="description-text">{t('description.text2')}</p>
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

      <div className="sidebar-social">
        <a
          href="https://twitter.com/GeochicasOSM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i> @GeochicasOSM
        </a>
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

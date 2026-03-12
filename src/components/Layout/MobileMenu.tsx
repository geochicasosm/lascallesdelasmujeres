import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CityList } from '../CityList';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <img
                src="/src/images/logo_proyecto.svg"
                alt="Las Calles de las Mujeres"
                className="mobile-logo"
              />
              <button
                className="mobile-menu-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="mobile-menu-content">
              <div className="mobile-cities">
                <CityList />
              </div>

              <div className="separator"></div>

              <div className="mobile-footer">
                <p className="project-by">{t('footer.projectBy2')}</p>
                <a
                  href="http://geochicas.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/src/images/logo_geo.svg"
                    alt="Geochicas"
                    className="logo-geochicas-mobile"
                  />
                </a>
              </div>

              <div className="mobile-social">
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
          </div>
        </>
      )}
    </>
  );
};

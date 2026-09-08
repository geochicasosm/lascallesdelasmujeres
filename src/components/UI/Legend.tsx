import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../utils/constants';

export const Legend = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        className="legend-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle legend"
      >
        <i className="fas fa-info-circle"></i>
      </button>

      {isOpen && (
        <div className="legend-panel">
          <button
            className="legend-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close legend"
          >
            <i className="fas fa-times"></i>
          </button>

          <h3 className="legend-title">Leyenda / Legend</h3>

          <div className="legend-content">
            <div className="legend-section">
              <h4>Calles / Streets</h4>
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: COLORS.female }}
                ></div>
                <span>{t('chart.women')} (Con nombre de mujer)</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: COLORS.male }}
                ></div>
                <span>{t('chart.men')} (Con nombre de hombre)</span>
              </div>
            </div>

            <div className="legend-section">
              <h4>Wikipedia</h4>
              <div className="legend-item">
                <i className="fas fa-check-circle" style={{ color: COLORS.female }}></i>
                <span>Con artículo en Wikipedia</span>
              </div>
              <div className="legend-item">
                <i className="fas fa-times-circle" style={{ color: '#999' }}></i>
                <span>Sin artículo en Wikipedia</span>
              </div>
            </div>

            <div className="legend-section">
              <h4>Interacción / Interaction</h4>
              <ul className="legend-list">
                <li>🖱️ Click en ciudades para seleccionar</li>
                <li>🖱️ Click en calles para ver información</li>
                <li>📊 Click en gráfico para ver estadísticas</li>
                <li>🔍 Zoom con rueda del ratón</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

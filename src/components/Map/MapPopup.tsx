import { Popup } from 'react-map-gl';
import { useTranslation } from 'react-i18next';

interface MapPopupProps {
  longitude: number;
  latitude: number;
  name: string;
  gender: 'Female' | 'Male';
  wikipediaLink: string;
  onClose: () => void;
}

/**
 * Extracts the person's name from the street name by removing common prefixes
 * @param streetName - Full street name (e.g., "Calle María Zambrano")
 * @returns Extracted person name (e.g., "María Zambrano")
 */
const extractPersonName = (streetName: string): string => {
  // Remove common street prefixes in multiple languages
  const cleaned = streetName.replace(
    /^(Calle|Avenida|Rua|Rue|Via|Plaza|Paseo|Carrer|Travesía|Ronda|Camino|Alameda)\s+/i,
    ''
  );
  return cleaned.trim();
};

export const MapPopup = ({
  longitude,
  latitude,
  name,
  gender,
  wikipediaLink,
  onClose,
}: MapPopupProps) => {
  const { t } = useTranslation();
  const isFemale = gender === 'Female';
  const hasWikipedia = !!wikipediaLink;
  const personName = extractPersonName(name);

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
      anchor="bottom"
      offset={15}
    >
      <div className={isFemale ? 'popup-female-card' : 'popup-male-card'}>
        <h3 className="popup-person-name">{personName}</h3>
        <p className="popup-subtitle">
          {t(isFemale ? 'popup.namedAfterWoman' : 'popup.namedAfterMan')}
        </p>

        {isFemale && (
          <>
            {hasWikipedia ? (
              <a
                href={wikipediaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-button"
                aria-label={`${t('popup.learnMore')} ${personName}`}
              >
                <i className="fab fa-wikipedia-w popup-button-icon"></i>
                {t('popup.learnMore')}
              </a>
            ) : (
              <button
                disabled
                className="popup-button"
                title={t('popup.noArticleTooltip')}
                aria-label={`${t('popup.noArticleTooltip')}: ${personName}`}
              >
                <i className="fab fa-wikipedia-w popup-button-icon"></i>
                {t('popup.learnMore')}
              </button>
            )}
          </>
        )}
      </div>
    </Popup>
  );
};

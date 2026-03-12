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
  const backgroundColor = isFemale ? '#ffca3af2' : '#0e9686f2';

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
      anchor="bottom"
      style={{ maxWidth: '200px' }}
    >
      <div
        style={{
          backgroundColor,
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          border: '2px solid white',
        }}
      >
        <div className={isFemale ? 'popup-female' : 'popup-male'}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{name}</p>
          {isFemale && (
            <>
              {wikipediaLink ? (
                <a
                  href={wikipediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                  style={{
                    display: 'inline-block',
                    padding: '5px 10px',
                    backgroundColor: 'white',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <i className="fab fa-wikipedia-w"></i>
                </a>
              ) : (
                <span
                  style={{
                    fontSize: '12px',
                    display: 'block',
                    marginTop: '5px',
                    opacity: 0.9,
                  }}
                >
                  <i className="fas fa-exclamation"></i> {t('popup.noArticle')}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Popup>
  );
};

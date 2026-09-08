import { useEffect, useState, useCallback } from 'react';
import Map, { NavigationControl, ScaleControl } from 'react-map-gl';
import { useMap } from '../../hooks';
import { useCityStore } from '../../stores/cityStore';
import { MAP_STYLE } from '../../utils/constants';
import { StreetLayer } from './StreetLayer';
import { CityMarker } from './CityMarker';
import { MapPopup } from './MapPopup';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface PopupInfo {
  longitude: number;
  latitude: number;
  name: string;
  gender: 'Female' | 'Male';
  wikipediaLink: string;
}

export const MapContainer = () => {
  const { viewState, setViewState, flyToCity } = useMap();
  const selectedCity = useCityStore((state) => state.selectedCity);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [isHoveringStreet, setIsHoveringStreet] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      flyToCity(selectedCity.center);
    }
  }, [selectedCity, flyToCity]);

  const handleMapClick = (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      const { name, gender, wikipedia_link } = feature.properties;
      
      setPopupInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        name,
        gender,
        wikipediaLink: wikipedia_link || '',
      });
    }
  };

  const handleMouseMove = useCallback((event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const features = event.features;
    const hasFeatures = features && features.length > 0;
    
    // Only update state if it's actually changing to prevent unnecessary re-renders
    if (hasFeatures && !isHoveringStreet) {
      setIsHoveringStreet(true);
    } else if (!hasFeatures && isHoveringStreet) {
      setIsHoveringStreet(false);
    }
  }, [isHoveringStreet]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        interactiveLayerIds={
          selectedCity
            ? ['streets-line', 'streets-fill']
            : []
        }
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        cursor={isHoveringStreet || popupInfo ? 'pointer' : 'grab'}
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" />

        {selectedCity && (
          <>
            <StreetLayer cityId={selectedCity.id} />
            <CityMarker
              longitude={selectedCity.center[0]}
              latitude={selectedCity.center[1]}
              cityId={selectedCity.id}
            />
          </>
        )}

        {popupInfo && (
          <MapPopup {...popupInfo} onClose={() => setPopupInfo(null)} />
        )}
      </Map>
    </div>
  );
};

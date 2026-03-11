import { Source, Layer } from 'react-map-gl';
import { useGeoJSON } from '../../hooks';
import { FEMALE, COLORS } from '../../utils/constants';
import { useIsMobile } from '../../hooks';
import type { LayerProps } from 'react-map-gl';

interface StreetLayerProps {
  cityId: string;
}

export const StreetLayer = ({ cityId }: StreetLayerProps) => {
  const { data, loading, error } = useGeoJSON(cityId);
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        Loading streets...
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const widthFemale = isMobile ? 5 : 4;
  const widthMale = isMobile ? 4 : 3;

  const lineLayer: LayerProps = {
    id: 'streets-line',
    type: 'line',
    paint: {
      'line-color': [
        'case',
        ['==', ['get', 'gender'], FEMALE],
        COLORS.female,
        COLORS.male,
      ],
      'line-width': [
        'case',
        ['==', ['get', 'gender'], FEMALE],
        widthFemale,
        widthMale,
      ],
      'line-blur': ['case', ['==', ['get', 'wikipedia_link'], ''], 4, 1],
    },
    filter: ['==', '$type', 'LineString'],
  };

  const fillLayer: LayerProps = {
    id: 'streets-fill',
    type: 'fill',
    paint: {
      'fill-color': [
        'case',
        ['==', ['get', 'gender'], FEMALE],
        COLORS.female,
        COLORS.male,
      ],
      'fill-opacity': ['case', ['==', ['get', 'wikipedia_link'], ''], 0.2, 0.6],
    },
    filter: ['==', '$type', 'Polygon'],
  };

  return (
    <Source id="streets-source" type="geojson" data={data}>
      <Layer {...lineLayer} />
      <Layer {...fillLayer} />
    </Source>
  );
};

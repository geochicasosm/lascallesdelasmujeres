import { useEffect, useState } from 'react';
import { Source, Layer } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';

interface CityMarkerProps {
  longitude: number;
  latitude: number;
  cityId: string;
}

export const CityMarker = ({ longitude, latitude, cityId }: CityMarkerProps) => {
  const [radius, setRadius] = useState(5);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let animationFrame: number;
    const maxRadius = 18;
    const framesPerSecond = 60;

    const animate = () => {
      setRadius((prev) => {
        const newRadius = prev + (maxRadius - prev) / framesPerSecond;
        return newRadius;
      });

      setOpacity((prev) => {
        const newOpacity = prev - 0.9 / framesPerSecond;
        if (newOpacity <= 0) {
          setRadius(5);
          return 1;
        }
        return newOpacity;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const pointData = {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [longitude, latitude],
        },
        properties: {},
      },
    ],
  };

  const outerLayer: LayerProps = {
    id: `${cityId}-marker-outer`,
    type: 'circle',
    paint: {
      'circle-radius': radius,
      'circle-color': '#FFCA3A',
      'circle-opacity': Math.max(0, opacity),
    },
    minzoom: 1,
    maxzoom: 7,
  };

  const innerLayer: LayerProps = {
    id: `${cityId}-marker-inner`,
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#FFCA3A',
    },
    minzoom: 1,
    maxzoom: 7,
  };

  return (
    <Source id={`${cityId}-marker-source`} type="geojson" data={pointData}>
      <Layer {...outerLayer} />
      <Layer {...innerLayer} />
    </Source>
  );
};

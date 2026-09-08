import { useState, useEffect } from 'react';
import { URL_DATA } from '../utils/constants';

interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
    gender: 'Female' | 'Male';
    wikipedia_link: string;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

export const useGeoJSON = (cityId: string | null) => {
  const [data, setData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cityId) {
      setData(null);
      return;
    }

    const fetchGeoJSON = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${URL_DATA}/data/${cityId}/final_tile.geojson`);
        if (!response.ok) throw new Error(`Failed to fetch GeoJSON for ${cityId}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching GeoJSON:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJSON();
  }, [cityId]);

  return { data, loading, error };
};

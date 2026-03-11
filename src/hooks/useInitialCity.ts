import { useEffect } from 'react';
import { useCityStore } from '../stores/cityStore';
import { getCityById } from '../data/cities';

export const useInitialCity = () => {
  const selectCity = useCityStore((state) => state.selectCity);

  useEffect(() => {
    // Get city ID from URL hash (e.g., #barcelona)
    const hash = window.location.hash.replace('#', '');
    
    if (hash) {
      const city = getCityById(hash);
      if (city) {
        selectCity(city);
      }
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash) {
        const city = getCityById(newHash);
        if (city) {
          selectCity(city);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [selectCity]);
};

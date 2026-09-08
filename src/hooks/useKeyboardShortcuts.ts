import { useEffect } from 'react';
import { useCityStore } from '../stores/cityStore';
import { getAllCities } from '../data/cities';

export const useKeyboardShortcuts = () => {
  const { selectedCity, selectCity } = useCityStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const cities = getAllCities();
      const currentIndex = selectedCity 
        ? cities.findIndex((c) => c.id === selectedCity.id)
        : -1;

      switch (e.key) {
        case 'ArrowRight':
        case 'n': // Next city
          if (currentIndex < cities.length - 1) {
            selectCity(cities[currentIndex + 1]);
            window.location.hash = cities[currentIndex + 1].id;
          }
          break;

        case 'ArrowLeft':
        case 'p': // Previous city
          if (currentIndex > 0) {
            selectCity(cities[currentIndex - 1]);
            window.location.hash = cities[currentIndex - 1].id;
          }
          break;

        case 'Escape':
          // Could close panels or reset selection
          break;

        case '?':
          // Show keyboard shortcuts help
          console.log('Keyboard shortcuts:', {
            'Arrow Left / p': 'Previous city',
            'Arrow Right / n': 'Next city',
            'Escape': 'Close panels',
            '?': 'Show this help',
          });
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCity, selectCity]);
};

import { City } from '../../types/city.types';
import { useCityStore } from '../../stores/cityStore';

interface CityItemProps {
  city: City;
}

export const CityItem = ({ city }: CityItemProps) => {
  const { selectedCity, selectCity } = useCityStore();
  const isSelected = selectedCity?.id === city.id;

  const handleClick = () => {
    selectCity(city);
    // Update URL hash
    window.location.hash = city.id;
  };

  return (
    <div
      className={`city-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {city.name.toUpperCase()}
    </div>
  );
};

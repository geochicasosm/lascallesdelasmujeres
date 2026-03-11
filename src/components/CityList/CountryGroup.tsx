import { Country } from '../../types/city.types';
import { CityItem } from './CityItem';

interface CountryGroupProps {
  country: Country;
  isExpanded: boolean;
  onToggle: () => void;
}

export const CountryGroup = ({ country, isExpanded, onToggle }: CountryGroupProps) => {
  const cityCount = country.citiesList.length;

  return (
    <div className="country-group">
      <div
        className="country-name"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isExpanded}
        aria-label={`${country.name}, ${cityCount} ${cityCount === 1 ? 'city' : 'cities'}`}
      >
        <span className="country-chevron">{isExpanded ? '▼' : '►'}</span>
        <span className="country-text">
          {country.name.toUpperCase()} ({cityCount})
        </span>
      </div>
      {isExpanded && (
        <div className="cities-container">
          {country.citiesList.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </div>
      )}
    </div>
  );
};

import { Country } from '../../types/city.types';
import { CityItem } from './CityItem';

interface CountryGroupProps {
  country: Country;
}

export const CountryGroup = ({ country }: CountryGroupProps) => {
  return (
    <div className="country-group">
      <div className="country-name">{country.name.toUpperCase()}</div>
      <div className="cities-container">
        {country.citiesList.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
};

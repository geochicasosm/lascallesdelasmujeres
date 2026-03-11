import { countriesList } from '../../data/cities';
import { CountryGroup } from './CountryGroup';

export const CityList = () => {
  return (
    <div className="city-list-container">
      {countriesList.map((country) => (
        <CountryGroup key={country.id} country={country} />
      ))}
    </div>
  );
};

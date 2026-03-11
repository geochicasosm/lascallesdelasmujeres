import { useState, useEffect } from 'react';
import { countriesList } from '../../data/cities';
import { CountryGroup } from './CountryGroup';
import { useCityStore } from '../../stores/cityStore';

export const CityList = () => {
  const { selectedCity } = useCityStore();
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  // Initialize: expand the country containing the selected city
  useEffect(() => {
    if (selectedCity) {
      const selectedCountry = countriesList.find((country) =>
        country.citiesList.some((city) => city.id === selectedCity.id)
      );
      if (selectedCountry) {
        setExpandedCountries(new Set([selectedCountry.id]));
      }
    } else {
      // Default: expand first country if no city selected
      setExpandedCountries(new Set([countriesList[0]?.id].filter(Boolean)));
    }
  }, [selectedCity]);

  const toggleCountry = (countryId: string) => {
    setExpandedCountries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(countryId)) {
        newSet.delete(countryId);
      } else {
        newSet.add(countryId);
      }
      return newSet;
    });
  };

  return (
    <div className="city-list-container">
      {countriesList.map((country) => (
        <CountryGroup
          key={country.id}
          country={country}
          isExpanded={expandedCountries.has(country.id)}
          onToggle={() => toggleCountry(country.id)}
        />
      ))}
    </div>
  );
};

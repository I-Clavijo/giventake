import React, { useState, useEffect } from 'react';
import styles from './CitySelector.module.css';
// import citiesData from '../../assets/Cities_il.json';
import { TextInput } from 'flowbite-react';
import useCitiesInCountry from '../../../hooks/useCitiesInCountry';

export const showAs = {
  CHANGE: 'Change',
  SEARCH: 'Search',
};

function CitySelector({ field, styleOrder = showAs.SEARCH, countryName, disabled, helperText, onChange }) {

  const { cities, loading } = useCitiesInCountry(countryName);
  const [searchInput, setSearchInput] = useState(field.value || '');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    field.onChange('');
  };

  const handleCitySelect = (city) => {
    field.onChange(city.name);
    setSearchInput(city.name);
    onChange(city);
  };

  // Filter cities based on the first letters of the search input
  const filteredCities = cities.filter((city) =>
    city.name?.toLowerCase().startsWith(searchInput.toLowerCase())
  ).slice(0,10);

  return (
    <div className='mb-2'>
      <div className={styles.locationSelection}>
        <div className={styles.input}>
          <TextInput
            className={styles.searchInput}
            placeholder={`${styleOrder === showAs.CHANGE ? showAs.CHANGE : showAs.SEARCH} your city here...`}
            value={searchInput}
            onChange={handleSearchInputChange}
            {...{ disabled, helperText }}

            color='light'
          />
          {searchInput && (
            <ul className={!field.value ? styles.searchResults : styles.searchResultsAfter}>
              {filteredCities.length === 0
                ? <p style={{ marginLeft: '10px' }}>No matching cities found</p>
                : (filteredCities.map((city, index) => (
                  <li key={city.name + index} onClick={() => handleCitySelect(city)}>{city.name}</li>
                )))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CitySelector;

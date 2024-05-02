import React, { useState, useEffect } from 'react';
import styles from './CitySelector.module.css';
import citiesData from '../assets/Cities_il.json';

export const showAs = {
  CHANGE: 'Change',
  SEARCH: 'Search',
};

function CitySelector({ register, setValue, styleOrder = showAs.SEARCH, onCitySelected }) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setSelectedCity(''); // Reset selected city when search input changes
  };

  const handleCitySelect = (cityName) => {
    setSearchInput(cityName);
    setSelectedCity(cityName);
    if (onCitySelected) {
      onCitySelected(cityName); // Call the prop function with the selected city
    }
    setValue('city', cityName);
  };

  // Filter cities based on the first letters of the search input
  const filteredCities = citiesData.filter((city) =>
    city.city.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <div className={styles.locationSelection}>
      <div className={styles.input}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={`${styleOrder === showAs.CHANGE ? showAs.CHANGE : showAs.SEARCH} your city here...`}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        {searchInput && (
          <ul className={!selectedCity ? styles.searchResults : styles.searchResultsAfter}>
            {filteredCities.length === 0 ? (
              <p style={{ marginLeft: '10px' }}>No matching cities found</p>
            ) : (
              filteredCities.map((city, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleMouseEnter(city.city)} // Optional functionality
                  onClick={() => handleCitySelect(city.city)}
                >
                  {city.city}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CitySelector;

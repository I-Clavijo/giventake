import React, { useState, useEffect } from 'react';
import styles from './LocationSelector.module.css';
import countriesData from '../assets/Countries.json';

export const showAs = {
  CHANGE: 'Change',
  SEARCH: 'Search',
};

function CountrySelector({ countryCode, setValue, styleOrder = showAs.SEARCH, onCountrySelected }) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setSelectedCountry(''); // Reset selected country when search input changes
  };

  const handleCountrySelect = (countryName) => {
    setSearchInput(countryName);
    setSelectedCountry(countryName);
    if (onCountrySelected) {
      onCountrySelected(countryName); // Call the prop function with the selected country
    }
    setValue('country', countryName);
  };

  // Filter countries based on the first letters of the search input
  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <div className={styles.locationSelection}>
      <div className={styles.input}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder = {countryCode? countryCode : 'Search your country here...'}
          //placeholder={`${styleOrder === showAs.CHANGE ? showAs.CHANGE : showAs.SEARCH} your country here...`}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        {searchInput && (
          <ul className={!selectedCountry ? styles.searchResults : styles.searchResultsAfter}>
            {filteredCountries.length === 0 ? (
              <p style={{ marginLeft: '10px' }}>No matching countries found</p>
            ) : (
              filteredCountries.map((country, index) => (
                <li
                  key={index}
                 // onMouseEnter={() => handleMouseEnter(country.country)} // Optional functionalountry
                  onClick={() => handleCountrySelect(country.name)}
                >
                  {country.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CountrySelector;

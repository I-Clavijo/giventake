import React, { useState, useEffect } from 'react';
import styles from './LocationSelection2.module.css';

import citiesData from '../assets/Cities_il.json'; // Assuming JSON file is in the same directory

function LocationSelection2() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setSelectedCity(''); // Reset selected city when search input changes
  };

  const handleCitySelect = (cityName) => {
    setSearchInput(cityName);
    setSelectedCity(cityName);
    setSearchInput('');
    
  };

  const handleMouseLeave = () => {
    
  };

  // Filter cities based on the first letters of the search input
  const filteredCities = citiesData.filter((city) =>
    city.city.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <div className={styles.locationSelection}>
      <input
        type="text"
        placeholder="Search your city..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {searchInput && (
        <ul className={styles.searchResults}>
          {filteredCities.length === 0 ? (
            <p>No matching cities found</p>
          ) : (
            filteredCities.map((city, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(city.city)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCitySelect(city.city)}
              >
                {city.city}
              </li>
            ))
          )}
        </ul>
      )}

      {selectedCity && (
        <div>
          <h3>Selected City</h3>
          <p>Name: {selectedCity}</p>
          {/* You can add more details about the selected city here */}
        </div>
      )}
    </div>
  );
}

export default LocationSelection2;
import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import styles from "./RadiusSelector.module.css";
import CitySelector from "./CitySelector";

export function RadiusSelector({ country, city, lat, lng, onCitySelected }) {
  
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [selectedCity, setSelectedCity] = useState(city || ""); // Initialize with initial city

  const handleChangeButtonClick = () => {
    setShowCitySelector(!showCitySelector);
  };

  const handleCitySelected = (cityName) => {
    setSelectedCity(cityName);
    console.log(`Selected city: ${cityName}`);
    setShowCitySelector(!showCitySelector);
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.currentLocation}>Location: {selectedCity ? selectedCity + ", " + country : country}</div>
      <div className={styles.changeButton} onClick={handleChangeButtonClick}>
        Change
      </div>
      {showCitySelector && (
        <CitySelector country={country} onCitySelected={handleCitySelected} />
      )}
      <div className={styles.radiusContainer}>
        <Dropdown className={styles.dropdown} size="sm" label="Radius" inline>
          <Dropdown.Item>All</Dropdown.Item>
          <Dropdown.Item>1 km</Dropdown.Item>
          <Dropdown.Item>10 km</Dropdown.Item>
          <Dropdown.Item>100 km</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}

export default RadiusSelector;
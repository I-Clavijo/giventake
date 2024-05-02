import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import styles from "./CityRadiusSelector.module.css";
import CitySelector from "./CitySelector";

export function CityRadiusSelector({ user }) {
  
  const { country, city } = user;
  
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
      <div className={styles.currentLocation}>
        <div className={styles.locationLabel}>Location:</div>
        <div className={styles.currentCity}>
          {selectedCity ? selectedCity + ", " + country : country}
        </div>
      </div>
      <div className={styles.changeCity}>
        <div className={styles.changeButton} onClick={handleChangeButtonClick}>
          Change City
        </div>
        <div className={styles.citySelector}>
          {showCitySelector && (
            <CitySelector country={country} onCitySelected={handleCitySelected} />
          )}
        </div>
      </div>
      <div className={styles.radiusContainer}>
        <Dropdown className={styles.dropdown} label="Radius" inline>
          <Dropdown.Item className={styles.item}>All</Dropdown.Item>
          <Dropdown.Item className={styles.item}>1 km</Dropdown.Item>
          <Dropdown.Item className={styles.item}>10 km</Dropdown.Item>
          <Dropdown.Item className={styles.item}>100 km</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}

export default CityRadiusSelector;
import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import styles from "./CityRadiusSelector.module.css";
import CitySelector from "./CitySelector";

export function CityRadiusSelector({ user , onRadiusChange }) {
  
  let city = user?.location?.city || "";
  let country = user?.location?.country || "";

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

  const handleRadiusChange = (radius) => {
    console.log("Selected Radius: " + radius);
    onRadiusChange(radius);
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
            <CitySelector onCitySelected={handleCitySelected} />
          )}
        </div>
      </div>
      <div className={styles.radiusContainer}>
        <Dropdown className={styles.dropdown} label="Radius" inline>
          <Dropdown.Item className={styles.item} onClick={() => handleRadiusChange(0)}>All</Dropdown.Item>
          <Dropdown.Item className={styles.item} onClick={() => handleRadiusChange(1)}>1 km</Dropdown.Item>
          <Dropdown.Item className={styles.item} onClick={() => handleRadiusChange(10)}>10 km</Dropdown.Item>
          <Dropdown.Item className={styles.item} onClick={() => handleRadiusChange(100)}>100 km</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}

export default CityRadiusSelector;
import React, {useEffect} from "react";
import { Dropdown } from "flowbite-react";
import styles from "./RadiusSelector.module.css";
import CitySelector, {showAs} from "./CitySelector";


export function RadiusSelector({ country, city, lat, lng, onCityChange}) {

  const [showCitySelector, setShowCitySelector] = React.useState(false); // State to control CitySelector visibility
  let selectedCity = city;
  const currentLocationText= city ? city + ", " + country : country ;

  const handleButtonClick = () => {
    setShowCitySelector(true); // Show CitySelector on button click
  };

  useEffect(() => {
    // You can use the selectedCity here if needed
    // For example, update the city state or perform actions based on the selected city
    if (selectedCity) {
      console.log("Selected City:", selectedCity);
    }
  }, [selectedCity]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.currentLocation}>Your location: {currentLocationText}</div>
      <div className={styles.changeButton} onClick={handleButtonClick}>Change</div>
      {showCitySelector && ( 
        <CitySelector country={country} styleOrder={showAs.CHANGE} onCitySelect={onCityChange}/>
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
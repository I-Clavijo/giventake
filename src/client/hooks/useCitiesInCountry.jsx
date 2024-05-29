import { useState, useEffect } from 'react';
import axios from 'axios';

const USERNAME = 'giventake';

const useCitiesInCountry = (countryName) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCountryCode = async (country) => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
    const countryCode = response.data[0]?.cca2;
    if (countryCode) {
      return countryCode;
    } else {
      throw new Error('Country not found');
    }
  };

  const fetchCities = async (countryCode, username) => {

    const response = await axios.get(`secure.geonames.org/searchJSON?country=${countryCode}&maxRows=1000&username=${username}`);
    const cityData = response.data.geonames.map(city => ({
      name: city.name,
      lat: city.lat,
      long: city.lng
    }));
    
    return cityData;
  };

  useEffect(() => {

    (async () => {
      try {
        if(countryName){
          const countryCode = await fetchCountryCode(countryName);
          const fetchedCities = await fetchCities(countryCode, USERNAME);
          setCities(fetchedCities);
        }
        
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);

      } finally {
        setLoading(false);
      }

    })();
  }, [countryName]);

  return { cities, loading };
};

export default useCitiesInCountry;

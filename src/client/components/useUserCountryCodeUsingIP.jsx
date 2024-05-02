import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUserCountryCodeUsingIP = () => {
  const [countryCode, setCountryCode] = useState(null);
  const [error, setError] = useState(null);  // Add error state for better handling

  useEffect(() => {
    const fetchIPAndCountry = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;

        const countryResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
        const countryCode = countryResponse.data.country;

        setCountryCode(countryCode);  // Update only with country code
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);  // Store error for potential handling
      }
    };

    fetchIPAndCountry();
  }, []);

  return countryCode;

};

export default GetUserCountryCodeUsingIP;
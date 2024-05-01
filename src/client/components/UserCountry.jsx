import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCountry = () => {
  const [userCountry, setUserCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state for better handling

  useEffect(() => {
    const fetchIPAndCountry = async () => {
      try {
        // Fetch user's IP address with proper error handling
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;

        // Fetch country based on IP address with error handling
        const countryResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
        const country = countryResponse.data.country;

        setUserCountry(country);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Store error for display or logging
      } finally {
        setLoading(false); // Ensure loading state is updated even on errors
      }
    };

    fetchIPAndCountry();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching country: {error.message}</p> // Display error message
      ) : userCountry ? (
        <p>Your country: {userCountry}</p>
      ) : (
        <p>Unable to determine your country.</p>
      )}
    </div>
  );
};

export default UserCountry;

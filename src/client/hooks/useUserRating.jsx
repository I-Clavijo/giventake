import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function useUserRating(userId) {

  const response = await axios.get('/api/v1/users/rating', { userId });
  console.log(response.data.rating);
  /*
  const fetchRating = async () => {
    const response = await axios.get('/users/rating', { userId });
    return response.data.rating;
  };

  return useQuery({
    queryKey: ['userRating', userId], // Unique key for caching
    queryFn: fetchRating,
  });
  */
}

export default useUserRating;
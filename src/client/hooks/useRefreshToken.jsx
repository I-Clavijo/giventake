import { useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';
import { QUERY_KEY } from '../constants/queryKeys';

const useRefreshToken = () => {
    const queryClient = useQueryClient();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        queryClient.setQueryData([QUERY_KEY.user], prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        })

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
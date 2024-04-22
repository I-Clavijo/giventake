import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../axios';
import { QUERY_KEY } from '../constants';

const verifyRefreshToken = async () => axios.get('/auth/refresh', { withCredentials: true });

const useRefreshToken = () => {
    const queryClient = useQueryClient();

    const refresh = async () => {
        const { data } = await verifyRefreshToken();
        queryClient.setQueryData([QUERY_KEY.user], prev => ({ ...prev, ...data }));
        return data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';

export const useUser = () => {
    const query = useQuery({
        queryKey: [QUERY_KEY.user],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        initialData: {}
    });
    const user = query.data;

    return {
        ...query,
        isLoggedIn: !!user?.accessToken || false
    };
};
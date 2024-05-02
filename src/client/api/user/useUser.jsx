import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';
import axios from '../axios';
import { useSnackbar } from 'notistack';

export const useUser = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const { userId } = props || {};
    if (userId) {
        return useQuery({
            queryKey: [QUERY_KEY.user, userId],
            queryFn: async () => {
                const { data } = await axios.get('/users', { userId });
                return data;
            },
            onError: (err) => {
                let errMessage = err.message || 'Something went wrong. Please try again!';
                enqueueSnackbar(errMessage, { variant: 'error' });    
            },
            retry:false
        });

    } else {
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
    }
};
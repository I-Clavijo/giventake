import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';
import axios, { axiosPrivate } from '../axios';
import { useSnackbar } from 'notistack';
import PageError from '../../utils/PageError';

export const useUser = ({ userId, enabled } = {}) => {
    const { enqueueSnackbar } = useSnackbar();

    const query = useQuery({
        queryKey: [QUERY_KEY.user, ...(userId ? [userId] : [])],
        queryFn: async ({ queryKey }) => {
            const [_, userId] = queryKey;
            if (userId) {
                const { data } = await axiosPrivate.get('/users', { params: { userId } });
                return data;
            }
        },
        onError: (err) => {
            let errMessage = err.message || 'Something went wrong. Please try again!';
            enqueueSnackbar(errMessage, { variant: 'error' });
        },
        refetchOnMount: userId ?? false,
        refetchOnWindowFocus: userId ?? false,
        refetchOnReconnect: userId ?? false,
        initialData: {},
        retry: false,
        enabled: enabled ?? true
    });
    const user = query.data;

    return {
        ...query,
        ...(userId ? {} : { isLoggedIn: !!user?.accessToken || false })
    };
    // }
};
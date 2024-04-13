import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKeys';

const getUser = async (user, signal) => {
    const axiosPrivate = useAxiosPrivate();
    return await axiosPrivate.get(`/users/${user.userInfo.id}`, { signal });
};

export const useUser = () => {

    const { data: user } = useQuery({
        queryKey: [QUERY_KEY.user],
        queryFn: async () => getUser(user),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });


    return {
        user: user ?? null,
        isLoggedIn: !!user?.accessToken || false
    }
};
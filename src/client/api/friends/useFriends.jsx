
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from "../constants";
import useAxiosPrivate from "../useAxiosPrivate";
import { isObjectEmpty } from "../../utils/lib";

export const useFriends = ({ userId, enabled }={}) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosPrivate = useAxiosPrivate();

    return useQuery({
        queryKey: [QUERY_KEY.friends, userId],
        queryFn: async () => {
            const { data } = await axiosPrivate.get('/friends', { params: { userId } });
            return data;
        },
        onError: (err) => {
            let errMessage = err.message || 'Something went wrong. Please try again!';
            enqueueSnackbar(errMessage, { variant: 'error' });
        },
        enabled: enabled ?? true,
        staleTime: 0
    })
};
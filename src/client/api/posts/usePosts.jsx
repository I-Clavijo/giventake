import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from "../constants";
import axios from "../axios";
import useAxiosPrivate from "../user/useAxiosPrivate";


export const usePosts = () => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosPrivate = useAxiosPrivate();

    return useQuery({
        queryKey: [QUERY_KEY.posts],
        queryFn: async () => {
            const { data } = await axiosPrivate.get('/posts');
            return data;
        },
        onError: (error) => {
            let errMsg = 'Error on post creation. Please try again!';
            enqueueSnackbar(errMsg, { variant: 'error' });
        }
    })
};
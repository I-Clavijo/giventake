import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../../useAxiosPrivate';
import { QUERY_KEY } from "../../constants";
import useOptimisticMutation from "../../../hooks/useOptimisticMutation";


export const useFriendAction = () => {
    const axiosPrivate = useAxiosPrivate();
    const { enqueueSnackbar } = useSnackbar();
    const { getPreviousData } = useOptimisticMutation();

    return useMutation({
        mutationFn: async (data) => {
            console.log(data);
            return await axiosPrivate.post('/users/friends/actions', data)
        },
        onMutate: async (data) => ({
            previousMessages: await getPreviousData({ // Get previous data from the hook
              cacheKey,
              newValue: data,
            })
        }),
        onSuccess: ({ data }) => {
        },

        onError: (error) => {
            let errMsg = 'Error on User Follow. Please try again!';
            enqueueSnackbar(errMsg, { variant: 'error' });
        }
    })
};
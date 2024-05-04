import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../useAxiosPrivate';


export const useFriendAction = () => {
    const axiosPrivate = useAxiosPrivate();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async ({data}) => {
            console.log(data);
            return await axiosPrivate.post('/users/friends/actions', data)
        },

        onSuccess: ({ data }) => {
        },

        onError: (error) => {
            let errMsg = 'Error on User Follow. Please try again!';
            enqueueSnackbar(errMsg, { variant: 'error' });
        }
    })
};
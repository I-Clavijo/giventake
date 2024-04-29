import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../user/useAxiosPrivate';


export const usePostAction = () => {
    const axiosPrivate = useAxiosPrivate();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (data) => {
            console.log(data);
            // data = {
            //     postId: ObjectId,
            //     actions: {
            //         like: Boolean,
            //         intersted: Boolean,
            //         report: {
            //              key: Enum REPORTS_KEYS,
            //              description: String
            //     }
            // };

            return await axiosPrivate.post('/posts/action', data)
        },

        onError: (error) => {
            let errMsg = 'Error on post action. Please try again!';
            enqueueSnackbar(errMsg, { variant: 'error' });
        }
    })
};
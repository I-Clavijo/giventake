import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../useAxiosPrivate';
import { QUERY_KEY } from "../constants";


export const usePostAction = () => {
    const axiosPrivate = useAxiosPrivate();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {

            // ### EXAMPLE:
            // data = {
            //     postId: ObjectId,
            //     actions: {
            //         isSavedByUser: Boolean,
            //         isUserInterested: Boolean,
            //         isUserReported: Boolean
            //         report: {
            //              key: Enum REPORTS_KEYS,
            //              description: String
            //     }
            // };

            return await axiosPrivate.post('/posts/action', data)
        },

        onMutate: (data) => {

            const posts = queryClient.getQueryData([QUERY_KEY.posts]);

            // Find the index of the post with the specific ID
            const indexToEdit = posts.findIndex(post => post._id === data.postId);
            // If the post with the specific ID is found
            if (indexToEdit !== -1) {
                // Modify the post at the found index
                const updatedPosts = posts.map((post, index) => {
                    if (index === indexToEdit) {
                        return {
                            ...post,
                            ...(data.actions.hasOwnProperty('isSavedByUser') && {isSavedByUser: data.actions.isSavedByUser}),
                            ...(data.actions.hasOwnProperty('isUserInterested') && {isUserInterested: data.actions.isUserInterested}),
                            ...(data.actions.hasOwnProperty('isUserReported') && {isUserReported: data.actions.isUserReported}),
                        };
                    }
                    return post;
                });
                queryClient.setQueryData([QUERY_KEY.posts], updatedPosts);
                
                if(data.actions.hasOwnProperty('isUserReported'))
                    enqueueSnackbar("Report sent.", { variant: 'success' });
            }
        },

        onError: (error) => {
            let errMsg = 'Error on post action. Please try again!';
            enqueueSnackbar(errMsg, { variant: 'error' });
        }
    })
};
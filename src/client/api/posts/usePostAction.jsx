import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../useAxiosPrivate';
import { QUERY_KEY } from '../constants';
import { isObjectEmpty } from '../../utils/lib';

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

export const usePostAction = ({ filters = {} } = {}) => {
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const filtersKeys = isObjectEmpty(filters) ? [] : [filters];

  return useMutation({
    mutationFn: async (data) => {
      return await axiosPrivate.post('/posts/action', data);
    },

    onMutate: (data) => {
      const posts = queryClient.getQueryData([QUERY_KEY.posts, ...filtersKeys]);

      // Find the index of the post with the specific ID
      const indexToEdit = posts.findIndex((post) => post._id === data.postId);

      // If the post with the specific ID is found
      if (indexToEdit !== -1) {
        // Modify the post at the found index
        const updatedPosts = posts.map((post, index) => {
          if (index === indexToEdit) {
            return {
              ...post,
              ...(data.actions.hasOwnProperty('isSavedByUser') && {
                isSavedByUser: data.actions.isSavedByUser
              }),
              ...(data.actions.hasOwnProperty('isUserInterested') && {
                isUserInterested: data.actions.isUserInterested
              }),
              ...(data.actions.hasOwnProperty('isUserReported') && {
                isUserReported: data.actions.isUserReported
              })
            };
          }
          return post;
        });
        queryClient.setQueryData([QUERY_KEY.posts, ...filtersKeys], updatedPosts);

        if (data.actions.hasOwnProperty('isUserReported'))
          enqueueSnackbar('Report sent.', { variant: 'success' });
      }
    },

    onError: (error) => {
      console.log(error);
      let errMsg = 'Error on post action. Please try again!';
      enqueueSnackbar(errMsg, { variant: 'error' });
    }
  });
};

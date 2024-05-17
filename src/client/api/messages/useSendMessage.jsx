import useAxiosPrivate from '../useAxiosPrivate';
import { QUERY_KEY } from '../constants';
import useOptimisticMutation from '../../hooks/useOptimisticMutation';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';

export const useSendMessage = ({ selfUserId }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useOptimisticMutation({
    mutationFn: async (variables) => {
      console.log(variables);
      const { data } = await axiosPrivate.post('/messages', variables);
      return data;
    },
    optimistic: ({ contact, message } = variables) => {
      return [
        {
          queryKey: [QUERY_KEY.conversations, contact],
          updater: (currentData) => {
            const uniqueId = uuidv4();

            const newMessage = {
              _id: uniqueId,
              conversation: contact?.conversationId,
              sender: selfUserId,
              createdAt: new Date(),
              body: {
                text: message
              },
              fromSelf: true
            };

            const result = {
              ...currentData,
              messages: [newMessage, ...(currentData?.messages ?? [])]
            };
            console.log(result);
            return result;
          }
        }
      ];
    },
    onSuccess: () => {
      console.log('onSuccess');
      queryClient.invalidateQueries(QUERY_KEY.conversations);
    }
  });
};

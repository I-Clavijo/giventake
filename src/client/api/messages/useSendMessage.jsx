import useAxiosPrivate from '../useAxiosPrivate';
import { QUERY_KEY } from '../constants';
import useOptimisticMutation from '../../hooks/useOptimisticMutation';
import { v4 as uuidv4 } from 'uuid';

export const useSendMessage = ({ selfUserId }) => {
  const axiosPrivate = useAxiosPrivate();

  return useOptimisticMutation({
    mutationFn: async (variables) => {
      console.log(variables);
      const { data } = await axiosPrivate.post('/messages', variables);
      return data;
    },
    optimistic: ({ conversationId, userId, isNewContact, postId, message } = variables) => {
      return [
        {
          queryKey: [QUERY_KEY.conversations, conversationId],
          updater: (currentData) => {
            const uniqueId = uuidv4();

            const newMessage = {
              _id: uniqueId,
              conversation: conversationId,
              sender: selfUserId,
              createdAt: new Date(),
              body: {
                text: message
              },
              fromSelf: true
            };
            return {
              ...currentData,
              messages: [...newMessage, ...currentData.messages]
            };
          }
        }
      ];
    }
  });
};

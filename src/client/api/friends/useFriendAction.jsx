import useAxiosPrivate from '../useAxiosPrivate';
import { QUERY_KEY } from "../constants";
import useOptimisticMutation from "../../hooks/useOptimisticMutation";
import { useUser } from '../users/useUser';


export const useFriendAction = () => {
    const axiosPrivate = useAxiosPrivate();
    const { data: authUser } = useUser();
    const auth_userId = authUser._id;


    return useOptimisticMutation({
        mutationFn: async (variables) => {
            console.log(variables);
            const { data } = await axiosPrivate.post('/users/friends/actions', variables);
            return data;
        },
        optimistic: ({ toUser, actions } = variables) => {
            return [
                {
                queryKey: [QUERY_KEY.user], // first updates the authenticated user friends
                updater: (currentData) => {
                    console.log('currentData',currentData)
                    if ('follow' in actions) {   // 'auth_userId' started follow 'toUser'
                        return {
                            ...currentData,
                            following: [
                                ...(currentData?.following || []),
                                toUser
                            ]
                        }
                    } else if ('unfollow' in actions) {   // 'auth_userId' unfollowed 'toUser'
                        return {
                            ...currentData,
                            following: currentData?.following?.filter((userId) => userId !== toUser)
                        }
                    }
                }
            },
            {
                queryKey: [QUERY_KEY.user, toUser],// updates the other user that has been affected
                updater: (currentData) => {
                    console.log('currentData',currentData)
                    if ('follow' in actions) {   // 'auth_userId' started follow 'toUser'
                        return {
                            ...currentData,
                            followers: [
                                ...(currentData?.followers || []),
                                auth_userId
                            ]
                        }
                    } else if ('unfollow' in actions) {   // 'auth_userId' unfollowed 'toUser'
                        return {
                            ...currentData,
                            followers: currentData?.followers?.filter((userId) => userId !== toUser)
                        }
                    }
                }
            },
        ];
        }
    });
};
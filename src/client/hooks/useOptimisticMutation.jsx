import { useQueryClient } from "@tanstack/react-query";

const useOptimisticMutation = () => {
    const queryClient = useQueryClient();

    const onMutate = async ({ cacheKey, newValue }) => {
        await queryClient.cancelQueries(cacheKey);
    
        // Snapshot the previous value
        const previousData = queryClient.getQueryData(cacheKey);
    
        // Optimistically update to the new value
        queryClient.setQueryData(cacheKey, (old) => [...old, newValue]);
    
        // Return a context object with the snapshotted value
        return { previousData };
      };

      const onError = (_, __, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        queryClient.setQueryData(cacheKey, context.previousMessages);
      };
    
      return { onMutate, onError };
};

export default useOptimisticMutation;
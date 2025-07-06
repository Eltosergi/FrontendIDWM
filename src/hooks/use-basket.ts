import { useAddToBasket, useRemoveFromBasket, useGetBasket } from '@/services';
import { BasketRequest } from '@/models';
import { useQueryClient } from '@tanstack/react-query';

export const useBasket = () => {
  const queryClient = useQueryClient();

  const {
    data: basket,
    isLoading: isLoadingBasket,
    isError: isErrorBasket,
    error: errorBasket,
  } = useGetBasket();

  const {
    mutate: addToBasket,
    isAdding,
    error: errorAdd,
  } = useAddToBasket();

  const {
    mutate: removeFromBasket,
    isRemoving,
    error: errorRemove,
  } = useRemoveFromBasket();

  
  const handleAdd = (item: BasketRequest) => {
    addToBasket(item, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['basket'] });
      },
    });
  };

  const handleRemove = (item: BasketRequest) => {
    removeFromBasket(item, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['basket'] });
      },
    });
  };

  return {
    basket,
    isLoading: isLoadingBasket,
    isAdding,
    isRemoving,

    isError: isErrorBasket || !!errorAdd || !!errorRemove,
    error: errorBasket || errorAdd || errorRemove,
    
    addToBasket: handleAdd,
    
    removeFromBasket: handleRemove,
  };
};

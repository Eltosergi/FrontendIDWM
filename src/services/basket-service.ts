import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { productBasket } from '@/clients';
import { BasketRequest, BasketReponse, ApiResponse } from '@/models';

export const useAddToBasket = (): UseMutationResult<
  ApiResponse<BasketReponse>,
  Error,
  BasketRequest
> & { isAdding: boolean } => {
  const mutation = useMutation<ApiResponse<BasketReponse>, Error, BasketRequest>({
    mutationFn: async (basketRequest) => {
      const response = await productBasket.addToBasket(basketRequest);
      if (!response.data) {
        throw new Error('Error al agregar el producto al carrito');
      }
      return response;
    },
  });

  return {
    ...mutation,
    isAdding: mutation.isPending,
  };
};

export const useRemoveFromBasket = (): UseMutationResult<
  ApiResponse<BasketReponse>,
  Error,
  BasketRequest
> & { isRemoving: boolean } => {
  const mutation = useMutation<ApiResponse<BasketReponse>, Error, BasketRequest>({
    mutationFn: async (basketRequest) => {
      const response = await productBasket.removeFromBasket(basketRequest);
      if (!response.data) {
        throw new Error('Error al eliminar el producto del carrito');
      }
      return response;
    },
  });

  return {
    ...mutation,
    isRemoving: mutation.isPending,
  };
};

export const useGetBasket = () => {
  return useQuery<BasketReponse>({
    queryKey: ['basket'],
    queryFn: async (): Promise<BasketReponse> => {
      const response = await productBasket.getBasket();
      if (!response.data) {
        throw new Error('Error al obtener el carrito');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { orderBasket } from '@/clients';
import { OrderResponse, OrderSummaryResponse, ApiResponse } from '@/models';

export const useGetOrders = () => {
  return useQuery<OrderSummaryResponse[]>({
    queryKey: ['orders'],
    queryFn: async (): Promise<OrderSummaryResponse[]> => {
      const response = await orderBasket.getOrders();
      if (!response.data) {
        throw new Error('Error al obtener los pedidos');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetOrderById = (id: number) => {
  return useQuery<OrderResponse>({
    queryKey: ['order', id],
    queryFn: async (): Promise<OrderResponse> => {
      const response = await orderBasket.getOrderById(id);
      if (!response.data) {
        throw new Error('Error al obtener el pedido');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateOrder = (): UseMutationResult<
  ApiResponse<OrderResponse>,
  Error,
  void
> & { isCreating: boolean } => {
  const mutation = useMutation<ApiResponse<OrderResponse>, Error, void>({
    mutationFn: async () => {
      const response = await orderBasket.createOrder();
      if (!response.data) {
        throw new Error('Error al crear el pedido');
      }
      return response;
    },
  });

  return {
    ...mutation,
    isCreating: mutation.isPending,
  };
}
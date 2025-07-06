'use client';
import { useGetOrders, useGetOrderById, useCreateOrder } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error: errorOrders,
  } = useGetOrders();

  const {
    data: order,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
    error: errorOrder,
  } = useGetOrderById(0);

  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    error: errorCreateOrder,
  } = useCreateOrder();

  const handleCreateOrder = () => {
    createOrder(undefined, {
      onSuccess: () => {
        toast.success('✅ ¡Orden creada exitosamente!');
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        queryClient.invalidateQueries({ queryKey: ['basket'] }); // 👈 importante
        router.replace(window.location.pathname); // 👈 fuerza recarga visible
      },
      onError: () => {
        toast.error('❌ Error al crear la orden');
      },
    });
  };

  return {
    orders,
    order,
    isLoadingOrders,
    isLoadingOrder,
    isCreatingOrder,
    isError: isErrorOrders || isErrorOrder || !!errorCreateOrder,
    error: errorOrders || errorOrder || errorCreateOrder,
    createOrder: handleCreateOrder,
  };
};

'use client'
import { useGetOrders, useGetOrderById, useCreateOrder } from "@/services"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useOrder = (orderId?: number) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error: errorOrders,
  } = useGetOrders()

  const {
    data: order,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
    error: errorOrder,
  } = useGetOrderById(orderId ?? 0) 

  const {
    mutate: createOrderMutation,
    isPending: isCreatingOrder,
    error: errorCreateOrder,
  } = useCreateOrder()

  const createOrder = (onSuccess?: (orderId: number) => void) => {
    createOrderMutation(undefined, {
      onSuccess: (response) => {
        const newOrderId = response?.data?.id
        toast.success('✅ ¡Orden creada exitosamente!')

        queryClient.invalidateQueries({ queryKey: ['orders'] })
        queryClient.invalidateQueries({ queryKey: ['basket'] })

        if (newOrderId && onSuccess) {
          onSuccess(newOrderId)
        }
      },
      onError: () => {
        toast.error('❌ Error al crear la orden')
      },
    })
  }

  return {
    orders,
    order,
    isLoadingOrders,
    isLoadingOrder,
    isCreatingOrder,
    isError: isErrorOrders || isErrorOrder || !!errorCreateOrder,
    error: errorOrders || errorOrder || errorCreateOrder,
    createOrder,
  }
}

'use client'
import {useGetOrderById, useCreateOrder } from "@/services"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useOrder = (orderId?: number) => {
  const queryClient = useQueryClient()
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
    order,
    isLoadingOrder,
    isCreatingOrder,
    isError: isErrorOrder || !!errorCreateOrder,
    error: errorOrder || errorCreateOrder,
    createOrder,
  }
}

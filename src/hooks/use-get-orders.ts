'use client'
import {useGetOrders } from "@/services"

export const useGetAllOrders = () => {
    const {
        data: orders,
        isLoading: isLoadingOrders,
        isError: isErrorOrders,
        error: errorOrders,
    } = useGetOrders()
    
    return {
        orders,
        isLoadingOrders,
        isErrorOrders,
        errorOrders,
    }
}


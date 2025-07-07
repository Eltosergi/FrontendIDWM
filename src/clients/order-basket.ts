import { axiosClient } from '@/clients';
import {
  ApiResponse,
  OrderResponse,
  OrderSummaryResponse,
} from '@/models';

export const orderBasket= {
    getOrders: async (): Promise<ApiResponse<OrderSummaryResponse[]>> => {
        const response = await axiosClient.get<ApiResponse<OrderSummaryResponse[]>>('/order');
    
        return {
        data: response.data.data ,
        success: response.data.success,
        message: response.data.message,
        errors: response.data.errors,
        };
    },
    
    getOrderById: async (id: number): Promise<ApiResponse<OrderResponse>> => {
        const response = await axiosClient.get<ApiResponse<OrderResponse>>(`/Order/${id}`);
    
        return {
        data: response.data.data,
        success: response.data.success,
        message: response.data.message,
        errors: response.data.errors,
        };
    },

    createOrder: async (): Promise<ApiResponse<OrderResponse>> => {
        const response = await axiosClient.post<ApiResponse<OrderResponse>>('/order');
    
        return {
        data: response.data.data,
        success: response.data.success,
        message: response.data.message,
        errors: response.data.errors,
        };
    }
};
    

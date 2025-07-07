import { axiosClient } from '@/clients';
import {
  ApiResponse,
  BasketReponse,
  BasketRequest
  
} from '@/models';


export const productBasket = {
    addToBasket: async (basketRequest: BasketRequest): Promise<ApiResponse<BasketReponse>> => {
        const response = await axiosClient.post<ApiResponse<BasketReponse>>(
            `/basket?productId=${basketRequest.productId}&quantity=${basketRequest.quantity}`
        );

        return response.data;
    
    },
    removeFromBasket: async (basketRequest: BasketRequest): Promise<ApiResponse<BasketReponse>> => {
        const response = await axiosClient.delete<ApiResponse<BasketReponse>>(
            `/basket?productId=${basketRequest.productId}&quantity=${basketRequest.quantity}`
        );

        return response.data;
    },
    getBasket: async (): Promise<ApiResponse<BasketReponse>> => {
        const response = await axiosClient.get<ApiResponse<BasketReponse>>('/basket');

        return response.data;
    }

}
import { axiosClient } from '@/clients';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/models';


export const authClient = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);

    return response.data;
  },
  register: async (userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    
    const response = await axiosClient.post<ApiResponse<RegisterResponse>>('/auth/register', userData);

    return response.data;
  }
  
  
};

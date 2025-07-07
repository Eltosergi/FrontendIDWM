import { axiosClient } from '@/clients';
import { ApiResponse, User, ShippingAddress , UpdateProfileRequest, ChangePasswordRequest, CreateShippingAddressRequest } from '@/models';

export const userClient = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await axiosClient.get<ApiResponse<User>>('/user/profile');

    return {
      data: response.data.data,
      success: response.data.success,
      message: response.data.message,
      errors: response.data.errors,
    };
  },
    updateProfile: async (profileData: UpdateProfileRequest): Promise<ApiResponse<User>> => {
        const response = await axiosClient.patch<ApiResponse<User>>('/user/profile', profileData);
    
        return {
        data: response.data.data,
        success: response.data.success,
        message: response.data.message,
        errors: response.data.errors,
        };
  },
  changePassword: async (passwordData: ChangePasswordRequest): Promise<ApiResponse<void>> => {
    const response = await axiosClient.patch<ApiResponse<void>>('/user/profile/password', passwordData);

    return {
      data: response.data.data,
      success: response.data.success,
      message: response.data.message,
      errors: response.data.errors,
    };
  },
  updateShippingAddress: async (addressData: CreateShippingAddressRequest): Promise<ApiResponse<ShippingAddress>> => {
    const response = await axiosClient.put<ApiResponse<ShippingAddress>>('/user/address', addressData);
    return {
      data: response.data.data,
      success: response.data.success,
      message: response.data.message,
      errors: response.data.errors,
    };
  }

  
  
};
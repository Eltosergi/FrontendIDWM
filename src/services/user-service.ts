import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { userClient } from '@/clients';
import { ApiResponse, User, UpdateProfileRequest, ShippingAddress, ChangePasswordRequest, CreateShippingAddressRequest } from '@/models';

export const useGetProfile = () => {
  return useQuery<User>({
    queryKey: ['profile'],
    queryFn: async (): Promise<User> => {
      const response = await userClient.getProfile();
      if (!response.data) {
        throw new Error('Error al obtener el perfil');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useUpdateProfile = (): UseMutationResult<
  ApiResponse<User>,
  Error,
  UpdateProfileRequest
> & { isUpdating: boolean } => {
    const mutation = useMutation<ApiResponse<User>, Error, UpdateProfileRequest>({
        mutationFn: async (profileData) => {
        const response = await userClient.updateProfile(profileData);
        if (!response.data) {
            throw new Error('Error al actualizar el perfil');
        }
        return response;
        },
    });
    
    return {
        ...mutation,
        isUpdating: mutation.isPending,
    };
}

export const useChangePassword = (): UseMutationResult<
  ApiResponse<void>,
  Error,
  ChangePasswordRequest 
> & { isChangingPassword: boolean } => {
    const mutation = useMutation<ApiResponse<void>, Error, ChangePasswordRequest>({
        mutationFn: async (passwordData) => {
            const response = await userClient.changePassword(passwordData);
            if (!response.data) {
                throw new Error('Error al cambiar la contraseña');
            }
            return response;
        },
    });

    return {
        ...mutation,
        isChangingPassword: mutation.isPending,
    };
}

export const useUpdateShippingAddress = (): UseMutationResult<
  ApiResponse<ShippingAddress>,
  Error,
  CreateShippingAddressRequest
> & { isUpdatingAddress: boolean } => {
    const mutation = useMutation<ApiResponse<ShippingAddress>, Error, CreateShippingAddressRequest>({
        mutationFn: async (addressData) => {
            const response = await userClient.updateShippingAddress(addressData);
            if (!response.data) {
                throw new Error('Error al actualizar la dirección de envío');
            }
            return response;
        },
    });

    return {
        ...mutation,
        isUpdatingAddress: mutation.isPending,
    };
}


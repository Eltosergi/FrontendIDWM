'use client';
import { useGetProfile, useUpdateProfile, useChangePassword, useUpdateShippingAddress } from "@/services/user-service";
import { UpdateProfileRequest, CreateShippingAddressRequest, ChangePasswordRequest } from "@/models";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProfile = () => {
  const queryClient = useQueryClient();
    const {
        data: profile,
        isLoading: isLoadingProfile,
        isError: isErrorProfile,
        error: errorProfile,
    } = useGetProfile();

    const {
        mutate: updateProfileMutation,
        isPending: isUpdatingProfile,
        error: errorUpdateProfile,
    } = useUpdateProfile();

    const updateProfile = (profileData: UpdateProfileRequest, onSuccess?: () => void) => {
        updateProfileMutation(profileData, {
            onSuccess: (response) => {
                toast.success('✅ Perfil actualizado exitosamente');
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error('❌ Error al actualizar el perfil');
            },
        });
    };

    const {
        mutate: changePasswordMutation,
        isPending: isChangingPassword,
        error: errorChangePassword,
    } = useChangePassword();

    const changePassword = (passwordData: ChangePasswordRequest, onSuccess?: () => void) => {
        changePasswordMutation(passwordData, {
            onSuccess: (response) => {
                toast.success('✅ Contraseña cambiada exitosamente');
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error('❌ Error al cambiar la contraseña');
            },
        });
    };

    const {
        mutate: updateShippingAddressMutation,
        isPending: isUpdatingShippingAddress,
        error: errorUpdateShippingAddress,
    } = useUpdateShippingAddress();


    const updateShippingAddress = (addressData: CreateShippingAddressRequest, onSuccess?: () => void) => {
        updateShippingAddressMutation(addressData, {
            onSuccess: (response) => {
                toast.success('✅ Dirección de envío actualizada exitosamente');
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error('❌ Error al actualizar la dirección de envío');
            },
        });
    };

    return {
        profile,
        isLoadingProfile,
        isUpdatingProfile,
        isErrorProfile,
        errorProfile,
        updateProfile,
        changePassword,
        isChangingPassword,
        errorChangePassword,
        updateShippingAddress,
        isUpdatingShippingAddress,
        errorUpdateShippingAddress,
    };

}
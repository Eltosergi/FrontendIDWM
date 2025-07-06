'use client';

import { useRouter } from 'next/navigation';
import { signIn, getSession, signOut } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LoginRequest, RegisterRequest } from '@/models';
import { authClient } from '@/clients';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Correo o contraseña inválidos');
      }

      if (!result?.ok) {
        throw new Error('Error al iniciar sesión');
      }

      return result;
    },

    onSuccess: async () => {
      toast.success('¡Bienvenido de vuelta!', {
        description: 'Has iniciado sesión correctamente.',
      });

      // Espera a que la sesión esté lista
      const session = await getSession();
      const role = session?.user?.role;

      if (role === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }

      router.refresh();
    },

    onError: (error: Error) => {
      toast.error('Error al iniciar sesión', {
        description: error.message || 'Ocurrió un error inesperado',
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },

    onSuccess: () => {
      toast.success('¡Hasta luego!', {
        description: 'Has cerrado sesión correctamente.',
      });

      router.push('/login');
    },

    onError: (error: Error) => {
      toast.error('Error al cerrar sesión', {
        description: error.message || 'Ocurrió un error inesperado',
      });
    },
  });
};


export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      console.log('Datos de registro:', userData);
      const result = await authClient.register(userData);
      
      if (!result.success) {
        throw new Error(result.message || 'Error al registrar usuario');
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success('¡Registro exitoso!', {
        description: 'Tu cuenta ha sido creada correctamente.',
      });

      router.push('/login');
    },
    onError: (error: Error) => {
      toast.error('Error al registrar usuario', {
        description: error.message || 'Ocurrió un error inesperado',
      });
    },
      
  });
};

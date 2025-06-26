'use client';

import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LoginRequest } from '@/models';

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


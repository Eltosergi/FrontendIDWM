'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff} from 'lucide-react';

import { Button, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components';
import { useLogin } from '@/hooks';
import { LoginRequest, loginSchema } from '@/models';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="flex items-center gap-2 mb-4">
              <Button
                type="button"
                onClick={() => router.back()}
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 cursor-pointer"
              >
                <ArrowLeft size={24} className="pointer-events-none text-black" />
              </Button>
              <h1 className="text-2xl font-bold text-center w-full text-black">Iniciar Sesión</h1>
            </section>

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "El email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-2 border border-gray-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black">Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border border-gray-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black pr-10 bg-white text-black"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
            >
              Iniciar sesión
            </Button>

            <p className="text-sm text-gray-600 text-center">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-black underline hover:text-gray-800">
                Regístrate
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>

  );
};

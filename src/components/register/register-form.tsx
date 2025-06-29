'use client';

import { useRegister } from '@/hooks';
import { RegisterRequest, registerSchema } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from '@/components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { format, subYears } from 'date-fns';
import { es } from 'date-fns/locale';

export const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const RegisterMutation = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firtsName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      thelephone: '',
      birthDate: '',
      street: '',
      number: '',
      commune: '',
      region: '',
      postalCode: '',
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    await RegisterMutation.mutateAsync(data);
  };

  const handleNext = () => {
    form
      .trigger([
        'firtsName',
        'lastName',
        'email',
        'password',
        'confirmPassword',
        'thelephone',
        'birthDate',
      ])
      .then((valid) => {
        if (valid) setStep(2);
      });
  };

  

  const inputClass =
    'w-full px-4 py-2 border border-gray-400 rounded-xl shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-black';

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-2xl mx-auto rounded-2xl p-6 shadow-md bg-white border border-gray-200"
        >
          {/* Header */}
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
            <h1 className="text-2xl font-bold text-center w-full text-black">
              Registro de usuario
            </h1>
          </section>

          {/* Paso 1: Datos personales */}
          {step === 1 && (
            <>
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="firtsName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black">Nombre</FormLabel>
                      <FormControl>
                        <input {...field} placeholder="Nombre" className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black">Apellido</FormLabel>
                      <FormControl>
                        <input {...field} placeholder="Apellido" className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        placeholder="example@gmail.com"
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thelephone"
                rules={{
                  required: 'El teléfono es requerido',
                  validate: (v) => v.replace(/\D/g, '').length >= 8 || 'Número demasiado corto',
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-muted-foreground">Teléfono</FormLabel>
                    <FormControl>
                      <PhoneInput
                        country="cl"
                        value={field.value}
                        onChange={field.onChange}
                        inputClass="!w-full !h-11 !rounded-2xl !border !border-gray-600 !bg-background !pl-14 !pr-4 !text-sm !text-foreground !shadow-sm focus:!border-primary focus:!ring-1 focus:!ring-primary"
                        buttonClass="!border-none !bg-transparent !left-3 !top-1/2 !-translate-y-1/2 !absolute"
                        dropdownClass="!z-[9999] !rounded-xl !shadow-lg !bg-white"
                        containerClass="!relative !w-full"
                        enableSearch={true}
                        specialLabel=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black">Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            className={`${inputClass} pr-10`}
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black">Confirmar contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirmar contraseña"
                            className={`${inputClass} pr-10`}
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
              </div>

              {/* Aquí va el campo birthDate mejorado */}
              <FormField
                control={form.control}
                name="birthDate"
                rules={{
                  required: 'La fecha de nacimiento es requerida',
                  validate: (value) => {
                    if (!value) return 'Fecha inválida';
                    const min = subYears(new Date(), 13);
                    const date = new Date(value);
                    if (isNaN(date.getTime())) return 'Fecha inválida';
                    if (date > min) return 'Debes tener al menos 13 años';
                    return true;
                  },
                }}
                render={({ field }) => {
                  const [month, setMonth] = useState<Date | undefined>(
                    field.value ? new Date(field.value) : undefined
                  );
                  const [open, setOpen] = useState(false);
                  const [inputValue, setInputValue] = useState(
                    field.value
                      ? format(new Date(field.value), 'dd/MM/yyyy', { locale: es })
                      : ''
                  );

                  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                  const minDate = subYears(new Date(), 13);

                  // Siempre borde gris (sin rojo)
                  const inputClassDate =
                    'h-12 rounded-xl px-4 w-full bg-white text-black border border-gray-500';

                  return (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-black">Fecha de nacimiento</FormLabel>
                      <div className="relative flex gap-2">
                        <Input
                          placeholder="dd/mm/aaaa"
                          value={inputValue}
                          onChange={(e) => {
                            const val = e.target.value;
                            setInputValue(val);

                            if (dateRegex.test(val)) {
                              const [d, m, y] = val.split('/');
                              const parsedDate = new Date(`${y}-${m}-${d}`);
                              if (!isNaN(parsedDate.getTime()) && parsedDate <= minDate) {
                                field.onChange(parsedDate.toISOString().split('T')[0]);
                                setMonth(parsedDate);
                              } else {
                                field.onChange('');
                              }
                            } else {
                              field.onChange('');
                            }
                          }}
                          onFocus={() => setOpen(true)}
                          className={inputClassDate}
                        />
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"
                            >
                              <CalendarIcon className="h-4 w-4 text-gray-600" />
                              <span className="sr-only">Seleccionar fecha</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2" align="end">
                            <Calendar
                              mode="single"
                              locale={es}
                              captionLayout="dropdown"
                              selected={month}
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(date.toISOString().split('T')[0]);
                                  setInputValue(format(date, 'dd/MM/yyyy', { locale: es }));
                                  setMonth(date);
                                  setOpen(false);
                                }
                              }}
                              month={month}
                              onMonthChange={setMonth}
                              disabled={(date) => date > minDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button
                type="button"
                className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
                onClick={handleNext}
              >
                Siguiente
              </Button>
            </>
          )}

          {/* Paso 2: Dirección */}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Calle</FormLabel>
                    <FormControl>
                      <input {...field} placeholder="Calle" className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Número</FormLabel>
                    <FormControl>
                      <input {...field} placeholder="Número" className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commune"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Comuna</FormLabel>
                    <FormControl>
                      <input {...field} placeholder="Comuna" className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Región</FormLabel>
                    <FormControl>
                      <input {...field} placeholder="Región" className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Código Postal</FormLabel>
                    <FormControl>
                      <input {...field} placeholder="Código Postal" className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
              >
                Registrarse
              </Button>
            </>
          )}

          <p className="text-sm text-gray-600 text-center">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-black underline hover:text-gray-800">
              Inicia sesión
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
};

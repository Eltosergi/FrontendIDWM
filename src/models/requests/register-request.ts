import z from 'zod';

export const registerSchema = z
  .object({
    firtsName: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres'),

    lastName: z
      .string()
      .min(3, 'El apellido debe tener al menos 3 caracteres'),

    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('El email no es válido'),

    thelephone: z
      .string()
      .min(10, 'El teléfono es requerido'),

    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/,
        'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial'
      ),

    confirmPassword: z
      .string()
      .min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/,
        'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial'
      ),

    birthDate: z
      .string()
      .min(1, 'La fecha de nacimiento es requerida'),
      
    street: z
      .string(),
    number: z
        .string(),
    commune: z
        .string(),
    region: z
        .string(),
    postalCode: z
        .string(),
        
    
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });

export type RegisterRequest = z.infer<typeof registerSchema>;

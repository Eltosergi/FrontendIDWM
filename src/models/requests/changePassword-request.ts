import {z} from 'zod';

export const changePasswordRequestSchema = z.object({
  currentPassword: z.string()
    .min(8, 'La contraseña actual debe tener al menos 8 caracteres')
    .max(100, 'La contraseña actual no puede exceder los 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/,
      'La contraseña actual debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
    ),
  newPassword: z.string()
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .max(100, 'La nueva contraseña no puede exceder los 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/
      , 'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
    ),
  confirmPassword: z.string()
    .min(8, 'La confirmación de la contraseña debe tener al menos 8 caracteres')
    .max(100, 'La confirmación de la contraseña no puede exceder los 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/
      , 'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
    ),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;


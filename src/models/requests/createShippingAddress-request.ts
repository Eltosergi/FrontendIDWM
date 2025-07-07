import {z} from 'zod';

export const createShippingAddressRequestSchema = z.object({
  street: z.string()
    .min(1, 'La calle es requerida')
    .max(100, 'La calle no puede exceder los 100 caracteres'),
  number: z.string()
    .min(1, 'El número es requerido')
    .max(10, 'El número no puede exceder los 10 caracteres')
    .regex(/^\d+$/, 'El número debe ser un valor numérico'),
  commune: z.string()
    .min(1, 'La comuna es requerida')
    .max(50, 'La comuna no puede exceder los 50 caracteres'),
  region: z.string()
    .min(1, 'La región es requerida')
    .max(50, 'La región no puede exceder los 50 caracteres'),
  postalCode: z.string()
    .min(1, 'El código postal es requerido')
    .max(20, 'El código postal no puede exceder los 20 caracteres')
    .regex(/^\d+$/, 'El código postal debe ser un valor numérico'),

});

export type CreateShippingAddressRequest = z.infer<typeof createShippingAddressRequestSchema>;
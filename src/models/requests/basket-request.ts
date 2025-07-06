import { z } from 'zod';


export const basketRequestSchema = z.object({
  productId: z.number().min(1, "El ID del producto debe ser un número mayor a 0"),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
});
export type BasketRequest = z.infer<typeof basketRequestSchema>;  
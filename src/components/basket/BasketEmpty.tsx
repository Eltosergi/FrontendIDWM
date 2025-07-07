import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export const BasketEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 text-center">
      <ShoppingCart size={64} className="text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Aún no has agregado productos. ¿Por qué no echas un vistazo a la tienda?
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
      >
        Ir a la tienda
      </Link>
    </div>
  );
};

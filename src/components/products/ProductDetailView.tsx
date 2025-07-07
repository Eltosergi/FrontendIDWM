'use client';

import Image from 'next/image';
import { Badge, Button } from '@/components';
import { formatPrice } from '@/lib';
import { Product, ProductCondition } from '@/models';
import { useBasket } from '@/hooks';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView = ({ product }: ProductDetailViewProps) => {
  const { addToBasket, isAdding } = useBasket();

  const handleAddToCart = () => {
    addToBasket({ productId: product.id, quantity: 1 });
  };

  const getConditionLabel = (condition: ProductCondition) => {
    return condition === ProductCondition.NEW ? 'Nuevo' : 'Usado';
  };

  const getConditionColor = (condition: ProductCondition) => {
    return condition === ProductCondition.NEW
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 max-w-6xl mx-auto">
      {/* Imagen */}
      <div className="w-full">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.urls?.[0] || 'https://cdn-icons-png.flaticon.com/512/9402/9402212.png'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Miniaturas */}
        {product.urls && product.urls.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {product.urls.map((url, index) => (
              <div key={index} className="w-20 h-20 relative rounded border">
                <Image
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className={getConditionColor(product.condition)}>
            {getConditionLabel(product.condition)}
          </Badge>
          <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <div className="text-sm space-y-1">
          <div><span className="font-semibold">Marca:</span> {product.brand}</div>
          <div><span className="font-semibold">Categoría:</span> {product.category}</div>
        </div>

        <div className="text-4xl font-bold text-primary">{formatPrice(product.price)}</div>

        <Button
          className="w-full mt-4"
          disabled={product.stock === 0 || !product.isActive || isAdding}
          onClick={handleAddToCart}
        >
          {product.stock === 0
            ? 'Sin stock disponible'
            : isAdding
            ? 'Agregando...'
            : 'Agregar al carrito'}
        </Button>
      </div>
    </div>
  );
};

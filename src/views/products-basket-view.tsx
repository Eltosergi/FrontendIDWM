'use client';

import { useBasket } from '@/hooks';
import { BasketItemList, BasketSummary, BasketEmpty} from '@/components';

export const BasketView = () => {
  const {
    basket,
    isLoading,
    isError,
    error,
    addToBasket,
    removeFromBasket,
    isAdding,
    isRemoving,
  } = useBasket();

  if (isLoading) return <p className="text-muted-foreground">Cargando carrito...</p>;
  if (isError) return <p className="text-destructive">Error: {error?.message}</p>;
  if (!basket || basket.items.length === 0) return <BasketEmpty />;

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-6">
      <h2 className="text-2xl font-bold">Tu carrito</h2>

      <BasketItemList
        items={basket.items}
        onAdd={(id) => addToBasket({ productId: id, quantity: 1 })}
        onRemoveOne={(id) => removeFromBasket({ productId: id, quantity: 1 })}
        onRemoveAll={(id, qty) => removeFromBasket({ productId: id, quantity: qty })}
        isAdding={isAdding}
        isRemoving={isRemoving}
      />

      <BasketSummary total={basket.totalPrice} />
    </div>
  );
};

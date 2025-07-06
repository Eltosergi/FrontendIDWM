import { BasketItemCard } from './BasketItemCard';
import { BasketItem } from '@/models';

interface Props {
  items: BasketItem[];
  onAdd: (productId: number) => void;
  onRemoveOne: (productId: number) => void;
  onRemoveAll: (productId: number, quantity: number) => void;
  isAdding?: boolean;
  isRemoving?: boolean;
}

export const BasketItemList = ({
  items,
  onAdd,
  onRemoveOne,
  onRemoveAll,
  isAdding,
  isRemoving,
}: Props) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <BasketItemCard
          key={item.productId}
          item={item}
          onAdd={() => onAdd(item.productId)}
          onRemoveOne={() => onRemoveOne(item.productId)}
          onRemoveAll={() => onRemoveAll(item.productId, item.quantity)}
          isAdding={isAdding}
          isRemoving={isRemoving}
        />
      ))}
    </ul>
  );
};

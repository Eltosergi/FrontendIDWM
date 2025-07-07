import { BasketItem } from '@/models';
import { formatPrice } from '@/lib';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Props {
  item: BasketItem;
  onAdd: () => void;
  onRemoveOne: () => void;
  onRemoveAll: () => void;
  isAdding?: boolean;
  isRemoving?: boolean;
}

export const BasketItemCard = ({
  item,
  onAdd,
  onRemoveOne,
  onRemoveAll,
  isAdding,
  isRemoving,
}: Props) => {
  return (
    <li className="flex items-center gap-4 rounded-xl border p-4 bg-white shadow-sm">
      <Image
        src={item.pictureUrl}
        alt={item.name}
        width={64}
        height={64}
        className="rounded-md object-cover border"
      />

      <div className="flex flex-col flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          {item.brand} — {item.category}
        </p>
        <p className="text-sm">{formatPrice(item.price)} c/u</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={onRemoveOne}
            disabled={isRemoving || item.quantity <= 1}
          >
            −
          </button>
          <span className="px-2 text-center w-6">{item.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={onAdd}
            disabled={isAdding}
          >
            +
          </button>
        </div>
      </div>

      <div className="text-right min-w-[100px]">
        <p className="text-sm font-semibold">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      <button
        onClick={onRemoveAll}
        className="ml-2 p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
        title="Eliminar del carrito"
      >
        <X size={16} />
      </button>
    </li>
  );
};

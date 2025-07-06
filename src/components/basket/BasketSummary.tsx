'use client';

import { formatPrice } from '@/lib';
import { Button } from '@/components';
import { useOrder } from '@/hooks';

interface Props {
  total: number;
}

export const BasketSummary = ({ total }: Props) => {
  const { createOrder, isCreatingOrder } = useOrder();

  return (
    <div className="flex justify-end pt-4 border-t">
      <Button
        className="text-lg font-bold px-6 py-3"
        disabled={isCreatingOrder}
        onClick={createOrder}
      >
        {isCreatingOrder ? 'Procesando pago...' : `Pagar ${formatPrice(total)}`}
      </Button>
    </div>
  );
};

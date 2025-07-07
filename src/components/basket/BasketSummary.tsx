'use client';

import { useOrder } from '@/hooks';
import { formatPrice } from '@/lib';
import { Button } from '@/components';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface BasketSummaryProps {
  total: number;
}

export const BasketSummary = ({ total }: BasketSummaryProps) => {
  const { createOrder, isCreatingOrder } = useOrder();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    createOrder((orderId: number) => {
      toast.success('✅ ¡Orden creada exitosamente!');
      router.replace(`/orders/${orderId}`);
    });
  };

  return (
    <>
      <div className="flex justify-end pt-4 border-t">
        <Button
          className="text-lg font-bold px-6 py-3"
          disabled={isCreatingOrder}
          onClick={() => setOpen(true)}
        >
          {isCreatingOrder ? 'Procesando pago...' : `Pagar ${formatPrice(total)}`}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>¿Está seguro de que desea realizar la compra?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                disabled={isCreatingOrder}
                onClick={handleConfirm}
              >
                {isCreatingOrder ? 'Procesando...' : 'Confirmar compra'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

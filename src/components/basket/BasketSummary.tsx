import { formatPrice } from '@/lib';

interface Props {
  total: number;
}

export const BasketSummary = ({ total }: Props) => {
  return (
    <div className="flex justify-end pt-4 border-t">
      <p className="text-lg font-bold">Total: {formatPrice(total)}</p>
    </div>
  );
};

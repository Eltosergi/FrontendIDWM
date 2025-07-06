import { useGetProductById } from '@/services';

export const useProductById = (id: string) => {
  const query = useGetProductById(id);
  return {
    product: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
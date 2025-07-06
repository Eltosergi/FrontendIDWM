import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { productClient } from '@/clients';
import {
  Product,
  ProductFiltersResponse,
  ProductParamsRequest,
  ProductsWithPaginationResponse,
} from '@/models';

export const useGetProducts = (
  params: ProductParamsRequest,
): UseQueryResult<ProductsWithPaginationResponse> => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async (): Promise<ProductsWithPaginationResponse> => {
      const response = await productClient.getProducts(params);

      if (!response.data) {
        throw new Error('Error al obtener los productos');
      }

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProductFilters = (): UseQueryResult<ProductFiltersResponse> => {
  return useQuery({
    queryKey: ['product-filters'],
    queryFn: async (): Promise<ProductFiltersResponse> => {
      const response = await productClient.getProductFilters();

      if (!response.data) {
        throw new Error('Error al obtener los filtros de los productos');
      }

      return response.data;
    },
    staleTime: 30 * 60 * 1000,
  });
};

export const useGetProductById = (id: string): UseQueryResult<Product> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      const response = await productClient.getProductById(id);

      if (!response.data) {
        throw new Error('Error al obtener el producto');
      }

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

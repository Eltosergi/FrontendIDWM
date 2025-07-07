'use client';

import { useState } from 'react';
import { NoProducts, Pagination, ProductCard, ProductFilters } from '@/components';
import { useProducts } from '@/hooks';
import { ProductsSkeletonView } from '@/views';
import { Button } from '@/components/ui/button'; // Asegúrate de tener este componente

export const ProductsView = () => {
  const {
    products,
    pagination,
    availableFilters,
    form,
    isLoading,
    isError,
    error,
    setPage,
    setPageSize,
    onSubmit,
    onSearchSubmit,
    onClear,
  } = useProducts();

  const [showFilters, setShowFilters] = useState(false);

  if (isLoading) {
    return <ProductsSkeletonView />;
  }

  if (isError) {
    return (
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold'>Error al cargar productos</h1>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='space-y-8'>

        {/* Botón para expandir/contraer filtros en móviles */}
        <div className='lg:hidden'>
          <Button
            variant="outline"
            className='w-full'
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </Button>

          {/* Contenedor que se muestra solo si showFilters está activo */}
          {showFilters && (
            <div className='mt-4'>
              <ProductFilters
                form={form}
                onSubmit={onSubmit}
                onSearchSubmit={onSearchSubmit}
                onClear={onClear}
                availableBrands={availableFilters.brands}
                availableCategories={availableFilters.categories}
                minPrice={availableFilters.minPrice}
                maxPrice={availableFilters.maxPrice}
              />
            </div>
          )}
        </div>

        {/* Layout general */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Filtros siempre visibles en desktop */}
          <div className='hidden lg:block'>
            <ProductFilters
              form={form}
              onSubmit={onSubmit}
              onSearchSubmit={onSearchSubmit}
              onClear={onClear}
              availableBrands={availableFilters.brands}
              availableCategories={availableFilters.categories}
              minPrice={availableFilters.minPrice}
              maxPrice={availableFilters.maxPrice}
            />
          </div>

          {/* Productos */}
          <div className='lg:col-span-3'>
            <div className='space-y-2'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold'>Productos</h1>
                <p className='text-muted-foreground'>
                  Encuentra los mejores productos al mejor precio
                </p>
              </div>

              <Pagination
                pagination={pagination}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {products.length === 0 ? (
                  <NoProducts onClearFilters={onClear} />
                ) : (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

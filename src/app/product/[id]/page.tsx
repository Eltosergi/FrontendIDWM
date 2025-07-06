'use client';

import { useParams } from 'next/navigation';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { useProductById } from '@/hooks/useProductById';

export default function ProductDetailPage() {
  const { id } = useParams(); // Next.js obtiene el ID de la URL

  const { product, isLoading, isError, error } = useProductById(id as string);

  if (isLoading) return <div className="p-6">Cargando producto...</div>;
  if (isError || !product) return <div className="p-6 text-red-500">Error al cargar el producto: {error?.message}</div>;

  return <ProductDetailView product={product} />;
}

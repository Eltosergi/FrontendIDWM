'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useGetAllOrders } from '@/hooks' 
import { OrderSummaryResponse } from '@/models' 
import { formatPrice } from '@/lib' 
import { Skeleton } from '@/components/ui/skeleton'

// Componente para renderizar una tarjeta de orden individual
const OrderCard: React.FC<{ order: OrderSummaryResponse }> = ({ order }) => {
  const router = useRouter()

  const handleNavigate = () => {
    router.push(`/orders/${order.id}`)
  }

  return (
    <div
      onClick={handleNavigate}
      className="bg-white border rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:border-green-500 cursor-pointer space-y-3"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Orden #{order.id}</h3>
        <p className="text-xl font-semibold text-green-600">{formatPrice(order.total)}</p>
      </div>
      <div className="text-sm text-gray-500">
        <p>Fecha: {new Date(order.createdAt).toLocaleDateString('es-CL')}</p>
      </div>
    </div>
  )
}

// Componente principal de la página
export default function OrdersPage() {
  const { orders, isLoadingOrders, isErrorOrders, errorOrders } = useGetAllOrders()

  // 1. Estado de Carga
  if (isLoadingOrders) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4">Mis Órdenes</h1>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  // 2. Estado de Error
  if (isErrorOrders) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Mis Órdenes</h1>
        <p>Ocurrió un error al cargar las órdenes.</p>
        <p className="text-sm">{errorOrders?.message}</p>
      </div>
    )
  }
  
  // 3. Estado de Éxito (con y sin órdenes)
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Mis Órdenes</h1>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 border-2 border-dashed rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700">No tienes órdenes todavía</h2>
          <p className="text-gray-500 mt-2">
            Todas tus compras aparecerán aquí.
          </p>
        </div>
      )}
    </div>
  )
}
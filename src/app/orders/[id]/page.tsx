'use client'

import { useOrder } from '@/hooks' 
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/lib' 
import { PDFDownloadLink } from '@react-pdf/renderer'
import { InvoicePDF } from '@/components/InvoicePDF' 
import { OrderResponse } from '@/models' 

export default function OrderDetailPage() {
  const { id } = useParams()
  const orderId = Number(id)
  const { order, isLoadingOrder, isError, error } = useOrder(orderId)

  if (isLoadingOrder) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-40 mb-4" />
        <Skeleton className="h-5 w-64 mb-2" />
        <Skeleton className="h-5 w-64 mb-2" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="p-6 text-red-600">
        Ocurrió un error al cargar la orden: {error?.message || 'Error desconocido'}
      </div>
    )
  }

  // Desestructuramos las propiedades de la orden
  const { address, items, total, createdAt } = order

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Orden #{order.id}</h1>
          <p className="text-sm text-gray-500">
            Fecha de creación: {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        
        {/* El componente PDFDownloadLink recibe la orden completa y la pasa a InvoicePDF */}
        <PDFDownloadLink
          document={<InvoicePDF order={order as OrderResponse} />}
          fileName={`factura-orden-${order.id}.pdf`}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors"
        >
          {({ loading }) => (loading ? 'Cargando factura...' : 'Descargar Factura')}
        </PDFDownloadLink>

      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Dirección de Envío</h2>
        <div className="text-gray-700">
          <p>{address.street} #{address.number}</p>
          <p>{address.commune}, {address.region}</p>
          <p>Código Postal: {address.postalCode}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Productos</h2>
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border rounded-xl p-4 bg-white shadow-sm"
            >
              <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Precio unitario: {formatPrice(item.price)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                <p className="font-medium">Total: {formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right text-lg font-bold">Total: {formatPrice(total)}</div>
    </div>
  )
}
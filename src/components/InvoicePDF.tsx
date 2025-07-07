import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatPrice } from '@/lib'; 
import { OrderResponse } from '@/models'; 


interface InvoicePDFProps {
  order: OrderResponse;
}


const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 11, padding: 30, color: '#333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, borderBottomWidth: 2, borderBottomColor: '#28a745', paddingBottom: 10 },
  companyName: { fontSize: 24, fontWeight: 'bold', color: '#28a745' },
  invoiceInfo: { textAlign: 'right' },
  invoiceTitle: { fontSize: 14, fontWeight: 'bold' },
  invoiceDate: { fontSize: 11, color: '#555' },
  addressSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', backgroundColor: '#f2f2f2', padding: 5, marginBottom: 10 },
  addressText: { fontSize: 11, marginBottom: 2 },
  table: { width: '100%', marginBottom: 30 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: '#f2f2f2', padding: 5 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 },
  colDescription: { width: '55%', fontWeight: 'bold' },
  colQty: { width: '15%', textAlign: 'center', fontWeight: 'bold' },
  colPrice: { width: '15%', textAlign: 'right', fontWeight: 'bold' },
  colTotal: { width: '15%', textAlign: 'right', fontWeight: 'bold' },
  cellDescription: { width: '55%' },
  cellQty: { width: '15%', textAlign: 'center' },
  cellPrice: { width: '15%', textAlign: 'right' },
  cellTotal: { width: '15%', textAlign: 'right' },
  grandTotalWrapper: { flexDirection: 'row', justifyContent: 'flex-end' },
  grandTotal: { width: '40%', padding: 10, backgroundColor: '#f2f2f2' },
  totalText: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 30, left: 30, right: 30, textAlign: 'center', fontSize: 10, color: '#888' },
});


// Tipamos las props del componente con la interfaz que creamos
export const InvoicePDF: React.FC<InvoicePDFProps> = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.companyName}>BlackCat.com</Text>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceTitle}>Factura #{order.id}</Text>
          <Text style={styles.invoiceDate}>
            Fecha: {new Date(order.createdAt).toLocaleDateString('es-CL')}
          </Text>
        </View>
      </View>

      {/* Shipping Address */}
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Dirección de Envío</Text>
        <Text style={styles.addressText}>{order.address.street} #{order.address.number}</Text>
        <Text style={styles.addressText}>{order.address.commune}, {order.address.region}</Text>
        <Text style={styles.addressText}>Código Postal: {order.address.postalCode}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colDescription}>Producto</Text>
          <Text style={styles.colQty}>Cant.</Text>
          <Text style={styles.colPrice}>P. Unitario</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>
        {order.items.map((item) => (
          <View key={item.productId} style={styles.tableRow}>
            <Text style={styles.cellDescription}>{item.name}</Text>
            <Text style={styles.cellQty}>{item.quantity}</Text>
            <Text style={styles.cellPrice}>{formatPrice(item.price)}</Text>
            <Text style={styles.cellTotal}>{formatPrice(item.price * item.quantity)}</Text>
          </View>
        ))}
      </View>

      {/* Grand Total */}
      <View style={styles.grandTotalWrapper}>
        <View style={styles.grandTotal}>
            <View style={styles.totalText}>
                <Text>TOTAL</Text>
                <Text>{formatPrice(order.total)}</Text>
            </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Gracias por su compra.</Text>
    </Page>
  </Document>
);
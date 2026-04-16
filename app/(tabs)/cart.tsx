import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="remove-shopping-cart" size={80} color="#333" />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptySubtitle}>Comienza a explorar Mercado Glow.</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
          <Text style={styles.goBackButtonText}>Volver a la Tienda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.product.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>${item.product.price.toLocaleString()}</Text>
              
              <View style={styles.quantityRow}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.qtyButton} 
                    onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <MaterialIcons name="remove" size={16} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.qtyButton} 
                    onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <MaterialIcons name="add" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => removeFromCart(item.product.id)}
                >
                  <MaterialIcons name="delete-outline" size={20} color="#ff4757" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
           <View style={{height: 120}}></View> // Space for fixed footer
        }
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total a Pagar:</Text>
          <Text style={styles.totalValue}>${totalPrice.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => console.log('Checkout Mercadopago')}>
          <MaterialIcons name="security" size={18} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.checkoutText}>Pagar con Mercado Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
  },
  emptySubtitle: {
    color: '#888',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  goBackButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  qtyButton: {
    padding: 8,
  },
  qtyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderColor: '#333',
    padding: 24,
    paddingBottom: 40, // safe area
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    color: '#aaa',
    fontSize: 16,
  },
  totalValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#10B981', // Emerald green
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

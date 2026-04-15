import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

const CATEGORIES = ['Todos', 'Esmaltes', 'Cabinas', 'Herramientas', 'Geles'];

const PRODUCTS_MOCK = [
  {
    id: '1',
    name: 'Esmalte Semipermanente',
    category: 'Esmaltes',
    price: '$6.000',
    vendor: 'Glow Supplies',
    image: 'https://images.unsplash.com/photo-1582245999557-41400bcfa434?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Cabina UV/LED 48W',
    category: 'Cabinas',
    price: '$45.000',
    vendor: 'TechNail',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop',
  },
];

export default function MarketScreen() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos' 
    ? PRODUCTS_MOCK 
    : PRODUCTS_MOCK.filter(p => p.category === activeCategory);

  const handleEscrowPayment = () => {
    // Placeholder para la lógica de Mercado Pago o Stripe con Escrow
    console.log('Iniciando pago protegido (Escrow)...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryBadge, activeCategory === cat && styles.categoryBadgeActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.vendor}>{item.vendor}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity style={styles.buyButton} onPress={handleEscrowPayment}>
              <Text style={styles.buyButtonText}>Comprar Protegido</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  categoriesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryBadge: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryBadgeActive: {
    backgroundColor: 'rgba(192, 132, 252, 0.2)',
    borderColor: '#C084FC',
  },
  categoryText: {
    color: '#aaa',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#C084FC',
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vendor: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  price: {
    color: '#C084FC',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#C084FC',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

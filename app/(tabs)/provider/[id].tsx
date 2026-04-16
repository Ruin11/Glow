import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../../../context/CartContext';
import { PRODUCTS_MOCK, PROVIDERS_MOCK } from '../../../data/ecommerce_mock';

export default function ProviderProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();

  const provider = PROVIDERS_MOCK.find(p => p.id === id);
  const providerProducts = PRODUCTS_MOCK.filter(p => p.vendorId === id);

  if (!provider) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Distribuidor no encontrado.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: typeof providerProducts[0] }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{item.type}</Text>
      </View>
      <Text style={styles.price}>${item.price.toLocaleString()}</Text>

      <TouchableOpacity style={styles.buyButton} onPress={() => addToCart(item, 1)}>
        <MaterialIcons name="add-shopping-cart" size={16} color="#fff" style={{marginRight: 4}}/>
        <Text style={styles.buyButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: provider.logo }} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-pin" size={16} color="#aaa" />
            <Text style={styles.locationText}>{provider.province}</Text>
          </View>
          {provider.isOfficial && (
            <View style={styles.officialBadge}>
              <MaterialIcons name="verified" size={16} color="#10B981" style={{marginRight: 4}}/>
              <Text style={styles.officialBadgeText}>Distribuidor Oficial</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.divider} />
      <Text style={styles.catalogTitle}>Catálogo de Productos</Text>

      <FlatList
        data={providerProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
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
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#333',
  },
  headerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  providerName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 4,
  },
  officialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  officialBadgeText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginHorizontal: 24,
  },
  catalogTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
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
  typeBadge: {
    backgroundColor: '#222',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  typeBadgeText: {
    color: '#888',
    fontSize: 10,
  },
  price: {
    color: '#10B981', // Emerald green
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buyButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981', // Emerald green
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

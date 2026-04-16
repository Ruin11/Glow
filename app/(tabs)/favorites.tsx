import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { CLIENT_DATA_MOCK } from './index';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteItems = CLIENT_DATA_MOCK.filter(item => favorites.includes(item.id));

  const renderItem = ({ item }: { item: typeof CLIENT_DATA_MOCK[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={() => toggleFavorite(item.id)}
      >
        <MaterialIcons name="favorite" size={24} color="#C084FC" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.technique}>{item.technique}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.price}>{item.price}</Text>
          {item.safeSpace && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Espacio Seguro</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="favorite-border" size={64} color="#333" />
          <Text style={styles.emptyText}>Aún no tienes trabajos favoritos</Text>
          <Text style={styles.emptySubtext}>Explora y guarda los trabajos que más te inspiren.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderColor: '#333',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  technique: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    color: '#C084FC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgeContainer: {
    backgroundColor: 'rgba(192, 132, 252, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#C084FC',
    fontSize: 12,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#C084FC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

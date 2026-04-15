import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const DATA_MOCK = [
  {
    id: '1',
    name: 'Sofia Martinez',
    technique: 'Esculpidas en Acrílico',
    price: '$15.000',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200&auto=format&fit=crop',
    safeSpace: true,
  },
  {
    id: '2',
    name: 'Valentina Gomez',
    technique: 'Kapping Gel',
    price: '$12.000',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=200&auto=format&fit=crop',
    safeSpace: true,
  },
];

export default function FeedScreen() {
  const renderItem = ({ item }: { item: typeof DATA_MOCK[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
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
      <FlatList
        data={DATA_MOCK}
        keyExtractor={(item) => item.id}
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PRODUCTS_MOCK, ProductType, PROVIDERS_MOCK } from '../../data/ecommerce_mock';
import { useCart } from '../../context/CartContext';

const CATEGORIES = ['Todos', 'Esmaltes', 'Cabinas', 'Maquinaría', 'Descartables'];
const PROVINCES = [
  'Todas', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 
  'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 
  'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 
  'Tierra del Fuego', 'Tucumán'
];

export default function MarketScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState<ProductType | 'Todos'>('Todos');
  const [provinceFilter, setProvinceFilter] = useState<string>('Todas');
  const [isProvinceModalVisible, setProvinceModalVisible] = useState(false);
  
  const { addToCart, cartCount } = useCart();

  const filteredProducts = PRODUCTS_MOCK.filter(p => {
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesType = typeFilter === 'Todos' || p.type === typeFilter;
    
    let matchesProvince = true;
    if (provinceFilter !== 'Todas') {
       const providerInfo = PROVIDERS_MOCK.find(prov => prov.id === p.vendorId);
       matchesProvince = providerInfo ? providerInfo.province === provinceFilter : false;
    }
    
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesProvince && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
         <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
         <TextInput
           style={styles.searchInput}
           placeholder="Buscar Insumos (Ej: Base Coat)..."
           placeholderTextColor="#888"
           value={searchQuery}
           onChangeText={setSearchQuery}
         />
      </View>

      <View style={styles.filtersWrapper}>
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
      <View style={[styles.filtersWrapper, { paddingBottom: 12 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.proFilterBadge, typeFilter === 'Mayorista' && styles.proFilterActive]}
            onPress={() => setTypeFilter(typeFilter === 'Mayorista' ? 'Todos' : 'Mayorista')}
          >
            <MaterialIcons name="local-shipping" size={16} color={typeFilter === 'Mayorista' ? "#10B981" : "#aaa"} style={{marginRight: 4}}/>
            <Text style={[styles.categoryText, typeFilter === 'Mayorista' && styles.proFilterTextActive]}>Mayorista</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.proFilterBadge, typeFilter === 'Minorista' && styles.proFilterActive]}
            onPress={() => setTypeFilter(typeFilter === 'Minorista' ? 'Todos' : 'Minorista')}
          >
            <MaterialIcons name="storefront" size={16} color={typeFilter === 'Minorista' ? "#10B981" : "#aaa"} style={{marginRight: 4}}/>
            <Text style={[styles.categoryText, typeFilter === 'Minorista' && styles.proFilterTextActive]}>Minorista</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.proFilterBadge, provinceFilter !== 'Todas' && styles.proFilterActive]}
            onPress={() => setProvinceModalVisible(true)}
          >
            <MaterialIcons name="location-on" size={16} color={provinceFilter !== 'Todas' ? "#10B981" : "#aaa"} style={{marginRight: 4}}/>
            <Text style={[styles.categoryText, provinceFilter !== 'Todas' && styles.proFilterTextActive]}>
              {provinceFilter === 'Todas' ? '📍 Todas las Provincias' : `📍 ${provinceFilter}`}
            </Text>
          </TouchableOpacity>
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
            <TouchableOpacity onPress={() => router.push(`/(tabs)/provider/${item.vendorId}`)}>
               <Text style={styles.vendorName}>Visitar Distribuidor ✓</Text>
            </TouchableOpacity>
            <Text style={styles.price}>${item.price.toLocaleString()}</Text>

            <TouchableOpacity style={styles.buyButton} onPress={() => addToCart(item, 1)}>
              <MaterialIcons name="add-shopping-cart" size={16} color="#fff" style={{marginRight: 4}}/>
              <Text style={styles.buyButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      
      {cartCount > 0 && (
         <TouchableOpacity style={styles.fab} onPress={() => router.push('/(tabs)/cart')}>
            <MaterialIcons name="shopping-cart" size={28} color="#fff" />
            <View style={styles.fabBadge}>
               <Text style={styles.fabBadgeText}>{cartCount}</Text>
            </View>
         </TouchableOpacity>
      )}
      
      <Modal visible={isProvinceModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por Provincia</Text>
            <ScrollView>
              {PROVINCES.map(prov => (
                <TouchableOpacity 
                   key={prov} 
                   style={styles.modalOption}
                   onPress={() => {
                     setProvinceFilter(prov);
                     setProvinceModalVisible(false);
                   }}
                >
                   <MaterialIcons name={provinceFilter === prov ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={provinceFilter === prov ? "#10B981" : "#888"} style={{marginRight: 12}} />
                   <Text style={[styles.modalOptionText, provinceFilter === prov && {color: '#10B981', fontWeight: 'bold'}]}>{prov}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
               style={styles.modalCloseBtn}
               onPress={() => setProvinceModalVisible(false)}
            >
               <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    height: 48,
    fontSize: 16,
  },
  filtersWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 8,
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
  proFilterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  proFilterActive: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  categoryText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#C084FC',
  },
  proFilterTextActive: {
    color: '#10B981',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Space for FAB
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
  vendorName: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
    textDecorationLine: 'underline',
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
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: '#10B981',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ff4757',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCloseBtn: {
    marginTop: 20,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

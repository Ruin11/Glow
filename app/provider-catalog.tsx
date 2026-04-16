import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCatalog } from '../context/CatalogContext';
import { ProductType } from '../data/ecommerce_mock';

export default function ProviderCatalogScreen() {
  const router = useRouter();
  const { products, addProduct, removeProduct } = useCatalog();
  
  // Asumimos que el "usuario logueado" es Glow Supplies (p1)
  const myProducts = products.filter(p => p.vendorId === 'p1');

  const [isModalVisible, setModalVisible] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Esmaltes');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<ProductType>('Minorista');
  const [images, setImages] = useState<string[]>([]);

  const CATEGORIES = ['Esmaltes', 'Cabinas', 'Maquinaría', 'Descartables'];

  const handleSaveProduct = () => {
    if (!name || !price) {
      return; 
    }
    // Si no cargó ninguna, ponemos una por defecto
    const finalImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1512496015851-a1fbcf69b6b7?q=80&w=200&auto=format&fit=crop'];

    addProduct({
      name,
      category,
      price: Number(price),
      type,
      vendorId: 'p1', 
      image: finalImages[0], 
      images: finalImages,
    });
    
    setModalVisible(false);
    // Reset Form
    setName('');
    setPrice('');
    setCategory('Esmaltes');
    setType('Minorista');
    setImages([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Catálogo (Glow Supplies)</Text>
        <View style={{width: 24}} /> 
      </View>

      <FlatList
        data={myProducts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
              <MaterialIcons name="inventory_2" size={48} color="#333" />
              <Text style={styles.emptyText}>No tienes productos listados.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.productCard}>
             <Image source={{ uri: item.image }} style={styles.productImage} />
             <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productCategory}>{item.category} • {item.type}</Text>
                <Text style={styles.productPrice}>${item.price.toLocaleString()}</Text>
             </View>
             <TouchableOpacity style={styles.deleteButton} onPress={() => removeProduct(item.id)}>
                <MaterialIcons name="delete-outline" size={24} color="#ff4757" />
             </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={28} color="#000" />
      </TouchableOpacity>

      {/* Modal Nuevo Insumo */}
      <Modal visible={isModalVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalBg}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nuevo Insumo</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Imágenes del Producto (hasta 3)</Text>
            <View style={styles.imagePickersRow}>
              {[0, 1, 2].map(index => {
                const imgUri = images[index];
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.imagePickerBox}
                    onPress={() => {
                        const mockPhotos = [
                          'https://images.unsplash.com/photo-1512496015851-a1fbcf69b6b7?q=80&w=200&auto=format&fit=crop', // Esmaltes
                          'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop', // Torno
                          'https://images.unsplash.com/photo-1632009249622-c3fbe6520ae6?q=80&w=200&auto=format&fit=crop'  // Limas
                        ];
                        if (!imgUri && images.length === index) {
                           setImages([...images, mockPhotos[index]]);
                        }
                    }}
                  >
                    {imgUri ? (
                       <Image source={{ uri: imgUri }} style={styles.pickedImage} />
                    ) : (
                       <MaterialIcons name="add-photo-alternate" size={28} color={images.length === index ? "#10B981" : "#333"} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Nombre del Producto</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ej: Lima Magic 100/180" placeholderTextColor="#555" />

            <Text style={styles.label}>Precio (AR$)</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="15000" placeholderTextColor="#555" />

            <Text style={styles.label}>Categoría</Text>
            <View style={styles.chipsRow}>
              {CATEGORIES.map(cat => (
                 <TouchableOpacity 
                   key={cat} 
                   style={[styles.chip, category === cat && styles.chipActive]} 
                   onPress={() => setCategory(cat)}
                 >
                   <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
                 </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Modelo de Venta</Text>
            <View style={styles.chipsRow}>
                 <TouchableOpacity 
                   style={[styles.chip, type === 'Minorista' && styles.chipActive]} 
                   onPress={() => setType('Minorista')}
                 >
                   <Text style={[styles.chipText, type === 'Minorista' && styles.chipTextActive]}>Minorista</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                   style={[styles.chip, type === 'Mayorista' && styles.chipActive]} 
                   onPress={() => setType('Mayorista')}
                 >
                   <Text style={[styles.chipText, type === 'Mayorista' && styles.chipTextActive]}>Mayorista</Text>
                 </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={[styles.saveButton, (!name || !price) && {opacity: 0.5}]} onPress={handleSaveProduct} disabled={!name || !price}>
            <Text style={styles.saveButtonText}>Agregar al Catálogo</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // espacio para el FAB
  },
  emptyBox: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#555',
    marginTop: 16,
    fontSize: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  productPrice: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    borderRadius: 8,
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
  },
  modalBg: {
    flex: 1,
    backgroundColor: '#050505',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  modalTitle: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  chipText: {
    color: '#aaa',
  },
  chipTextActive: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  imagePickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  imagePickerBox: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pickedImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    backgroundColor: '#10B981',
    margin: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

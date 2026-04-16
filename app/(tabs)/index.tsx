import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { useRole } from '../../context/RoleContext';

export const CLIENT_DATA_MOCK = [
  { id: '1', name: 'Sofia Martinez', technique: 'Esculpidas en Acrílico', price: '$15.000', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200&auto=format&fit=crop', safeSpace: true },
  { id: '2', name: 'Valentina Gomez', technique: 'Kapping Gel', price: '$12.000', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=200&auto=format&fit=crop', safeSpace: true },
];

const ClientFeed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites, toggleFavorite } = useFavorites();

  const renderItem = ({ item }: { item: typeof CLIENT_DATA_MOCK[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        <MaterialIcons name={favorites.includes(item.id) ? "favorite" : "favorite-border"} size={24} color={favorites.includes(item.id) ? "#C084FC" : "#fff"} />
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
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar profesionales, técnicas..." placeholderTextColor="#888" value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <FlatList
        data={CLIENT_DATA_MOCK} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.adBannerOuter}>
            <View style={styles.adBanner}>
              <Text style={styles.adText}>Espacio Publicitario</Text>
              <Text style={styles.adSubtext}>Promociona tu salón de belleza aquí e incrementa tus reservas.</Text>
              <View style={styles.adBadge}><Text style={styles.adBadgeText}>AD</Text></View>
            </View>
          </View>
        }
      />
    </View>
  );
};

const ProfessionalFeed = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerDashboard}>
        <Text style={styles.dashGreeting}>Hola, Sofía 💅</Text>
        <Text style={styles.dashSub}>Tu resumen de hoy</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { borderColor: '#ff4757' }]}>
          <Text style={styles.statBoxTitle}>Turnos Hoy</Text>
          <Text style={[styles.statBoxNumber, { color: '#ff4757' }]}>4</Text>
        </View>
        <View style={[styles.statBox, { borderColor: '#C084FC' }]}>
          <Text style={styles.statBoxTitle}>Ingresos Hoy</Text>
          <Text style={[styles.statBoxNumber, { color: '#C084FC' }]}>$56K</Text>
        </View>
      </View>

      <View style={styles.sectionPro}>
        <Text style={styles.sectionTitle}>Próximos Turnos</Text>
        <View style={styles.apptCard}>
          <Text style={styles.apptTime}>14:00</Text>
          <View>
            <Text style={styles.apptClient}>Camila (Esmaltado Semipermanente)</Text>
            <Text style={styles.apptDetails}>Confirmado ✓</Text>
          </View>
        </View>
        <View style={styles.apptCard}>
          <Text style={styles.apptTime}>16:30</Text>
          <View>
            <Text style={styles.apptClient}>Laura (Kapping)</Text>
            <Text style={styles.apptDetails}>Esperando Llegada...</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionPro}>
        <Text style={styles.sectionTitle}>Tendencias & Capacitación</Text>
        <View style={styles.courseCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=300&auto=format&fit=crop' }} style={styles.courseImage}/>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Masterclass: Acrílico Avanzado</Text>
            <Text style={styles.courseSubtitle}>Por: Glow Academy - 2hrs</Text>
            <TouchableOpacity style={styles.courseBtn}><Text style={styles.courseBtnText}>Ver Curso Gratis</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const ProviderFeed = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerDashboard}>
        <Text style={styles.dashGreeting}>Panel Mayorista 📦</Text>
        <Text style={styles.dashSub}>Distribuidora Oficial Glow</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { borderColor: '#10B981', flex: 1 }]}>
          <Text style={styles.statBoxTitle}>Ventas Semanales</Text>
          <Text style={[styles.statBoxNumber, { color: '#10B981' }]}>$485.000</Text>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { borderColor: '#888' }]}>
          <Text style={styles.statBoxTitle}>Pedidos Pendientes</Text>
          <Text style={[styles.statBoxNumber, { color: '#fff' }]}>12</Text>
        </View>
        <View style={[styles.statBox, { borderColor: '#888' }]}>
          <Text style={styles.statBoxTitle}>Stock Crítico</Text>
          <Text style={[styles.statBoxNumber, { color: '#ff4757' }]}>3 Items</Text>
        </View>
      </View>

      <View style={styles.sectionPro}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        
        <TouchableOpacity style={styles.actionBlock}>
            <MaterialIcons name="local-shipping" size={24} color="#10B981" />
            <Text style={styles.actionBlockText}>Gestionar Envíos y Entregas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionBlock}>
            <MaterialIcons name="inventory" size={24} color="#10B981" />
            <Text style={styles.actionBlockText}>Actualizar Catálogo (Mercado Glow)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionBlock}>
            <MaterialIcons name="campaign" size={24} color="#10B981" />
            <Text style={styles.actionBlockText}>Crear Promoción a Profesionales</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default function FeedScreen() {
  const { role } = useRole();

  if (role === 'Profesional') return <ProfessionalFeed />;
  if (role === 'Proveedor') return <ProviderFeed />;
  
  return <ClientFeed />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', marginHorizontal: 16, marginTop: 16, marginBottom: 8, borderRadius: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#333' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', height: 48, fontSize: 16 },
  listContainer: { padding: 16 },
  adBannerOuter: { marginBottom: 20 },
  adBanner: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#333', borderStyle: 'dashed', position: 'relative', overflow: 'hidden' },
  adText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  adSubtext: { color: '#aaa', fontSize: 14, marginRight: 24 },
  adBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#333', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  adBadgeText: { color: '#888', fontSize: 10, fontWeight: 'bold' },
  card: { backgroundColor: '#111', borderRadius: 12, marginBottom: 20, overflow: 'hidden', borderColor: '#333', borderWidth: 1 },
  image: { width: '100%', height: 200 },
  favoriteButton: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8, zIndex: 10 },
  infoContainer: { padding: 16 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  technique: { color: '#aaa', fontSize: 14, marginBottom: 12 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  price: { color: '#C084FC', fontSize: 18, fontWeight: 'bold' },
  badgeContainer: { backgroundColor: 'rgba(192, 132, 252, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#C084FC', fontSize: 12, fontWeight: '600' },
  bookButton: { backgroundColor: '#C084FC', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  /* Professional & Provider Styles */
  headerDashboard: { padding: 24, paddingBottom: 16, borderBottomWidth: 1, borderColor: '#222' },
  dashGreeting: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  dashSub: { color: '#888', fontSize: 14 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  statBox: { flex: 1, backgroundColor: '#111', borderWidth: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
  statBoxTitle: { color: '#888', fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  statBoxNumber: { fontSize: 28, fontWeight: 'bold' },
  sectionPro: { padding: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  apptCard: { backgroundColor: '#151515', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  apptTime: { color: '#ff4757', fontWeight: 'bold', fontSize: 16, marginRight: 16, width: 50 },
  apptClient: { color: '#fff', fontWeight: '600', fontSize: 14, marginBottom: 4 },
  apptDetails: { color: '#888', fontSize: 12 },
  courseCard: { backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
  courseImage: { width: '100%', height: 140 },
  courseInfo: { padding: 16 },
  courseTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  courseSubtitle: { color: '#aaa', fontSize: 12, marginBottom: 16 },
  courseBtn: { backgroundColor: '#ff4757', padding: 10, borderRadius: 8, alignItems: 'center' },
  courseBtnText: { color: '#fff', fontWeight: 'bold' },
  actionBlock: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  actionBlockText: { color: '#fff', fontSize: 14, fontWeight: '600', marginLeft: 16 },
});

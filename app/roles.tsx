import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRole, Role } from '../context/RoleContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { setRole } = useRole();

  const handleRoleSelection = (role: Role) => {
    setRole(role);
    console.log(`Ingresando como: ${role}`);
    
    if (role === 'Proveedor') {
        router.push('/(tabs)/market');
    } else {
        router.push('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Glow</Text>
        <Text style={styles.subtitle}>Conecta. Belleza. Simple.</Text>
        <Text style={styles.welcomeText}>¿Cómo te gustaría usar Glow hoy?</Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* Cliente */}
        <TouchableOpacity style={styles.roleCard} onPress={() => handleRoleSelection('Cliente')}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(192, 132, 252, 0.2)' }]}>
            <MaterialIcons name="search" size={32} color="#C084FC" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Soy Cliente</Text>
            <Text style={styles.cardSubtitle}>Busca profesionales, inspírate y reserva turnos.</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

        {/* Profesional */}
        <TouchableOpacity style={styles.roleCard} onPress={() => handleRoleSelection('Profesional')}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 71, 87, 0.2)' }]}>
            <MaterialIcons name="brush" size={32} color="#ff4757" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Soy Profesional</Text>
            <Text style={styles.cardSubtitle}>Gestiona tus turnos y compra insumos al mejor precio.</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

        {/* Proveedor Mayorista */}
        <TouchableOpacity style={[styles.roleCard, styles.specialCard]} onPress={() => handleRoleSelection('Proveedor')}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <MaterialIcons name="storefront" size={32} color="#10B981" />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#10B981' }]}>Distribuidor Oficial</Text>
            <Text style={styles.cardSubtitle}>Publica y vende masivamente a miles de profesionales.</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C084FC',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    fontWeight: '500',
  },
  cardsContainer: {
    gap: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  specialCard: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: '#151515',
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
});

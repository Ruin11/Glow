import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const openQRScanner = () => {
    // Lógica para abrir el escáner QR de validación y liberar pago escrow
    console.log('Abriendo escáner QR para validación de turno...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <MaterialIcons name="person" size={40} color="#000" />
        </View>
        <Text style={styles.userName}>María Cliente</Text>
        <Text style={styles.userEmail}>maria@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1.250</Text>
          <Text style={styles.statLabel}>Glow Points</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Turnos</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.qrButton} onPress={openQRScanner}>
        <MaterialIcons name="qr-code-scanner" size={24} color="#fff" style={styles.qrIcon} />
        <Text style={styles.qrButtonText}>Escáner QR (Validar Turno)</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diario de Uñas</Text>
        
        <View style={styles.historyCard}>
          <View style={styles.historyDateBox}>
            <Text style={styles.historyDateMonth}>ABR</Text>
            <Text style={styles.historyDateDay}>12</Text>
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyTitle}>Sofia Martinez</Text>
            <Text style={styles.historySubtitle}>Esculpidas en Acrílico</Text>
          </View>
          <Text style={styles.historyStatus}>Completado</Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyDateBox}>
            <Text style={styles.historyDateMonth}>MAR</Text>
            <Text style={styles.historyDateDay}>25</Text>
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyTitle}>Valentina Gomez</Text>
            <Text style={styles.historySubtitle}>Esculpidas</Text>
          </View>
          <Text style={styles.historyStatus}>Completado</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#C084FC',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#888',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#C084FC',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  qrButton: {
    backgroundColor: '#C084FC',
    flexDirection: 'row',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: {
    marginRight: 12,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: '#111',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  historyDateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    width: 50,
    height: 50,
    marginRight: 16,
  },
  historyDateMonth: {
    color: '#C084FC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyDateDay: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  historySubtitle: {
    color: '#888',
    fontSize: 14,
  },
  historyStatus: {
    color: '#C084FC',
    fontSize: 12,
    fontWeight: '600',
  },
});

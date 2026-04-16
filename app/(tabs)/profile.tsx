import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { useRole } from '../../context/RoleContext';

const ConsumerProfile = () => {
  const router = useRouter();
  const { role } = useRole();

  const openQRScanner = () => {
    // Lógica para abrir el escáner QR de validación y liberar pago escrow
    console.log('Abriendo escáner QR para validación de turno...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={40} color="#000" />
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/edit-profile')}>
            <MaterialIcons name="edit" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{role === 'Profesional' ? 'Sofía Martinez' : 'María Cliente'}</Text>
        <Text style={styles.userEmail}>{role === 'Profesional' ? 'sofia@glow.com' : 'maria@example.com'}</Text>
        
        <TouchableOpacity style={styles.switchRoleButton} onPress={() => router.push('/roles')}>
          <MaterialIcons name="swap-horiz" size={16} color="#C084FC" style={{marginRight: 6}} />
          <Text style={styles.switchRoleText}>Cambiar de Rol</Text>
        </TouchableOpacity>
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

      {role === 'Profesional' ? (
        <TouchableOpacity style={styles.qrButton} onPress={openQRScanner}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" style={styles.qrIcon} />
          <Text style={styles.qrButtonText}>Escáner QR (Validar Turno)</Text>
        </TouchableOpacity>
      ) : role === 'Cliente' ? (
        <View style={styles.qrCodeContainer}>
           <Text style={styles.qrCodeText}>Tu Código de Turno</Text>
           <View style={styles.qrCodeBox}>
             <QRCode value="glow-escrow-receipt-12345" size={120} color="#000" backgroundColor="#fff" />
           </View>
           <Text style={styles.qrCodeSub}>Muéstraselo al profesional para liberar el pago.</Text>
        </View>
      ) : null}

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
};

const ProviderProfile = () => {
    const router = useRouter();
  
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.header, { borderBottomColor: '#111' }]}>
          <View style={styles.avatarRow}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: '#10B981', borderRadius: 16 }]}>
              <MaterialIcons name="storefront" size={40} color="#000" />
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push('/edit-profile')}>
              <MaterialIcons name="edit" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Glow Supplies Oficial</Text>
          <Text style={[styles.userEmail, { color: '#10B981', fontWeight: 'bold' }]}>Vendedor Verificado ✓</Text>
          
          <TouchableOpacity style={[styles.switchRoleButton, { borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }]} onPress={() => router.push('/roles')}>
            <MaterialIcons name="swap-horiz" size={16} color="#10B981" style={{marginRight: 6}} />
            <Text style={[styles.switchRoleText, { color: '#10B981' }]}>Cambiar de Rol</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.balanceContainer}>
           <Text style={styles.balanceTitle}>Balance Disponible</Text>
           <Text style={styles.balanceAmount}>$ 1.450.300</Text>
           <TouchableOpacity style={styles.withdrawButton}>
              <MaterialIcons name="account-balance" size={20} color="#000" style={{marginRight: 8}}/>
              <Text style={styles.withdrawText}>Retirar a cuenta bancaria</Text>
           </TouchableOpacity>
        </View>
  
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Gestión Operativa</Text>
           
           <TouchableOpacity style={styles.providerActionRow}>
               <View style={styles.providerActionIconBox}>
                  <MaterialIcons name="inventory" size={24} color="#10B981" />
               </View>
               <View style={styles.providerActionTextContainer}>
                  <Text style={styles.providerActionTitle}>Catálogo Mercado Glow</Text>
                  <Text style={styles.providerActionSub}>Agrega o renueva productos</Text>
               </View>
               <MaterialIcons name="chevron-right" size={24} color="#888" />
           </TouchableOpacity>
  
           <TouchableOpacity style={styles.providerActionRow}>
               <View style={styles.providerActionIconBox}>
                  <MaterialIcons name="local-shipping" size={24} color="#10B981" />
               </View>
               <View style={styles.providerActionTextContainer}>
                  <Text style={styles.providerActionTitle}>Políticas de Envío</Text>
                  <Text style={styles.providerActionSub}>Tarifas, zonas y correos</Text>
               </View>
               <MaterialIcons name="chevron-right" size={24} color="#888" />
           </TouchableOpacity>
  
           <TouchableOpacity style={styles.providerActionRow}>
               <View style={styles.providerActionIconBox}>
                  <MaterialIcons name="analytics" size={24} color="#10B981" />
               </View>
               <View style={styles.providerActionTextContainer}>
                  <Text style={styles.providerActionTitle}>Mis Métricas</Text>
                  <Text style={styles.providerActionSub}>Conversión y carritos abandonados</Text>
               </View>
               <MaterialIcons name="chevron-right" size={24} color="#888" />
           </TouchableOpacity>
        </View>
  
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Últimos Pedidos Despachados</Text>
           
           <View style={styles.historyCard}>
            <View style={[styles.historyDateBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <MaterialIcons name="check-circle" size={28} color="#10B981" />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Pedido #9401</Text>
              <Text style={styles.historySubtitle}>Destino: Córdoba - 3 Insumos</Text>
            </View>
            <Text style={[styles.historyStatus, { color: '#10B981' }]}>Entregado</Text>
          </View>
  
           <View style={styles.historyCard}>
            <View style={[styles.historyDateBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <MaterialIcons name="check-circle" size={28} color="#10B981" />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Pedido #9398</Text>
              <Text style={styles.historySubtitle}>Destino: CABA - Lote x24 Base Coat</Text>
            </View>
            <Text style={[styles.historyStatus, { color: '#10B981' }]}>Entregado</Text>
          </View>
        </View>
      </ScrollView>
    );
};

export default function ProfileScreen() {
    const { role } = useRole();
  
    if (role === 'Proveedor') {
      return <ProviderProfile />;
    }
  
    return <ConsumerProfile />;
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
  avatarRow: {
    position: 'relative',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 16,
    right: -10,
    backgroundColor: '#333',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
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
  switchRoleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#111',
  },
  switchRoleText: {
    color: '#C084FC',
    fontSize: 14,
    fontWeight: '600',
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
  qrCodeContainer: {
    alignItems: 'center',
    backgroundColor: '#111',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  qrCodeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  qrCodeBox: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },
  qrCodeSub: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
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
  // Provider Specific Styles
  balanceContainer: {
    backgroundColor: '#111',
    margin: 20,
    marginBottom: 0,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  balanceTitle: {
    color: '#888',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#10B981',
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  withdrawButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  withdrawText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  providerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 12,
  },
  providerActionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  providerActionTextContainer: {
    flex: 1,
  },
  providerActionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  providerActionSub: {
    color: '#888',
    fontSize: 12,
  },
});

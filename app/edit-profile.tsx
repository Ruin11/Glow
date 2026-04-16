import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRole } from '../context/RoleContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { role } = useRole();

  // Estados Simulados
  const [name, setName] = useState(role === 'Profesional' ? 'Sofía Martinez' : role === 'Proveedor' ? 'Glow Supplies Oficial' : 'María Cliente');
  const [phone, setPhone] = useState('+54 9 11 1234 5678');
  
  // Específicos Cliente
  const [preferences, setPreferences] = useState('Nail Art minimalista');
  
  // Específicos Profesional
  const [salonAddress, setSalonAddress] = useState('Av. Corrientes 1234, CABA');
  const [specialties, setSpecialties] = useState('Kapping, Esculpidas, Semipermanente');
  const [instagram, setInstagram] = useState('@sofianails');

  // Específicos Proveedor
  const [cuit, setCuit] = useState('30-71234567-8');
  const [minOrder, setMinOrder] = useState('$50.000');
  const [operatingProvinces, setOperatingProvinces] = useState('Todo el país');

  const primaryColor = role === 'Proveedor' ? '#10B981' : '#C084FC';

  const handleSave = () => {
    // Almacenar lógica futura acá. Por ahora cerramos el modal.
    router.back();
  };

  const renderClientFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre Completo / Apodo</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Número de Celular</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Preferencias de Diseño</Text>
        <TextInput style={[styles.input, { height: 80 }]} value={preferences} onChangeText={setPreferences} multiline placeholder="Ej: Francesitas, colores pastel..." placeholderTextColor="#555" />
      </View>
    </>
  );

  const renderProfessionalFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre Artístico o Salón</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Dirección de Trabajo</Text>
        <TextInput style={styles.input} value={salonAddress} onChangeText={setSalonAddress} placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Técnicas de Especialidad</Text>
        <TextInput style={[styles.input, { height: 80 }]} value={specialties} onChangeText={setSpecialties} multiline placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Instagram (Portafolio)</Text>
        <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} placeholderTextColor="#555" autoCapitalize="none" />
      </View>
    </>
  );

  const renderProviderFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Razón Social / Distribuidora</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>CUIT / CUIL</Text>
        <TextInput style={styles.input} value={cuit} onChangeText={setCuit} keyboardType="numeric" placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>WhatsApp Business</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Monto de Compra Mínima</Text>
        <TextInput style={styles.input} value={minOrder} onChangeText={setMinOrder} keyboardType="numeric" placeholderTextColor="#555" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Zonas de Cobertura</Text>
        <TextInput style={styles.input} value={operatingProvinces} onChangeText={setOperatingProvinces} placeholderTextColor="#555" />
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={handleSave}>
          <MaterialIcons name="check" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        {role === 'Cliente' && renderClientFields()}
        {role === 'Profesional' && renderProfessionalFields()}
        {role === 'Proveedor' && renderProviderFields()}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: primaryColor }]} onPress={handleSave}>
          <Text style={[styles.saveButtonText, { color: role === 'Proveedor' ? '#000' : '#fff' }]}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#222',
    backgroundColor: '#111',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    padding: 4,
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  spacer: {
    height: 100,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderColor: '#222',
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

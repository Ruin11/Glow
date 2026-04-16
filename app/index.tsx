import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = (provider: string) => {
    setLoading(provider);
    
    // Simulating Firebase/OAuth API call
    setTimeout(() => {
      setLoading(null);
      router.push('/roles');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.title}>Glow</Text>
        <Text style={styles.tagline}>Red conectando la belleza.</Text>
      </View>

      <View style={styles.authContainer}>
        <Text style={styles.welcomeText}>Iniciar sesión o registro rápido</Text>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#fff' }]} 
          onPress={() => handleLogin('Google')}
          disabled={loading !== null}
        >
           {loading === 'Google' ? (
             <ActivityIndicator color="#000" />
           ) : (
             <>
               {/* Usamos un icono general ya que google no está siempre en expo vector icons */}
               <Text style={[styles.socialIcon, { color: '#000', fontWeight: 'bold' }]}>G</Text>
               <Text style={[styles.socialButtonText, { color: '#000' }]}>Continuar con Google</Text>
             </>
           )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#1877F2', borderColor: '#1877F2' }]} 
          onPress={() => handleLogin('Meta')}
          disabled={loading !== null}
        >
           {loading === 'Meta' ? (
             <ActivityIndicator color="#fff" />
           ) : (
             <>
               <MaterialIcons name="facebook" size={24} color="#fff" style={styles.socialIconMeta} />
               <Text style={styles.socialButtonText}>Continuar con Facebook</Text>
             </>
           )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#000', borderColor: '#333' }]} 
          onPress={() => handleLogin('Apple')}
          disabled={loading !== null}
        >
           {loading === 'Apple' ? (
             <ActivityIndicator color="#fff" />
           ) : (
             <>
               <MaterialIcons name="apple" size={24} color="#fff" style={styles.socialIconMeta} />
               <Text style={styles.socialButtonText}>Continuar con Apple</Text>
             </>
           )}
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        Al continuar en Glow, aceptas nuestros <Text style={styles.linkText}>Términos</Text> y <Text style={styles.linkText}>Privacidad</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'space-between',
  },
  brandContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 64,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#C084FC',
    fontWeight: '600',
    letterSpacing: 1,
  },
  authContainer: {
    width: '100%',
    paddingTop: 40,
  },
  welcomeText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
  },
  socialIcon: {
    position: 'absolute',
    left: 24,
    fontSize: 22,
  },
  socialIconMeta: {
    position: 'absolute',
    left: 24,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  termsText: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  linkText: {
    color: '#C084FC',
    textDecorationLine: 'underline',
  },
});

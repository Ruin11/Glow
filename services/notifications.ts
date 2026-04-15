import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Asegúrate de que esta ruta sea correcta

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('glow-notifications', {
      name: 'Notificaciones de Glow',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#E6F4FE', // Color lila como background principal
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Permisos de notificación no concedidos');
      return;
    }
    
    // Conseguir el Project ID para expo-notifications de acuerdo a Expo SDK 50+
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    
    if (!projectId) {
      console.warn('Project ID no encontrado. Por favor, corre `npx eas init` para generar un ID vinculado a tu cuenta para obtener un token real.');
    }

    try {
      if (projectId) {
        token = await Notifications.getExpoPushTokenAsync({
          projectId: projectId
        });
        console.log('Expo Push Token (tu device token):', token.data);
      } else {
        console.log('Bypass Push Token: Modo desarrollo sin EAS Project ID.');
        token = { type: 'expo', data: 'ExponentPushToken[dummy-token-para-pruebas]' };
      }
    } catch (e: any) {
      console.error(`Error consiguiendo el push token: ${e}`);
    }
  } else {
    // Si estás en emulador
    console.log('Debes usar un dispositivo físico para recibir notificaciones push en tiempo real');
  }

  return token?.data;
};

// Función para guardar el token en la colección de usuarios de Firestore
export const savePushTokenToFirestore = async (userId: string, targetToken: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    // Usamos merge: true para no borrar otros datos del usuario
    await setDoc(userDocRef, { pushToken: targetToken }, { merge: true });
    console.log('Push token guardado en Firestore para el usuario:', userId);
  } catch (error) {
    console.error('Error guardando el push token en Firestore:', error);
  }
};

/*
 EJEMPLOS DE PAYLOAD (LOGICA DE NEGOCIO PARA EL BACKEND)
 
 Para enviar notificaciones con la estética de Glow y su lógica, el servidor (Nodejs, Python, etc) 
 debe hacer un POST request a "https://exp.host/--/api/v2/push/send" y usar el pushToken.
 
 1. Para Manicuristas:
 {
   "to": "ExponentPushToken[..xxx..]",
   "title": "¡Nuevo turno de uñas!",
   "body": "María ha reservado un servicio de Esmaltado Semipermanente para mañana a las 15:00.",
   "sound": "default",
   "data": { "route": "/turnos/detalle/123", "type": "booking" }
 }

 2. Para Clientes:
 {
   "to": "ExponentPushToken[..xxx..]",
   "title": "💅 ¡Tus uñas te extrañan!",
   "body": "Hace 3 semanas de tu último servicio. Agendá ahora y sumá Glow Points.",
   "sound": "default",
   "data": { "route": "/manicuristas", "type": "retention" }
 }

 3. Para Proveedores:
 {
     "to": "ExponentPushToken[..xxx..]",
     "title": "🛒 ¡Venta realizada!",
     "body": "Tenés un nuevo pedido de Acrílicos Xtreme para preparar.",
     "sound": "default",
     "data": { "route": "/ventas/pedido/456", "type": "sale" }
 }
*/

import { Stack } from 'expo-router';
import { RoleProvider } from '../context/RoleContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <RoleProvider>
      <FavoritesProvider>
        <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="roles" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
        </Stack>
      </CartProvider>
    </FavoritesProvider>
    </RoleProvider>
  );
}

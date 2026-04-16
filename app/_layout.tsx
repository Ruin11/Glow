import { Stack } from 'expo-router';
import { RoleProvider } from '../context/RoleContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CartProvider } from '../context/CartContext';
import { CatalogProvider } from '../context/CatalogContext';

export default function RootLayout() {
  return (
    <RoleProvider>
      <FavoritesProvider>
        <CartProvider>
          <CatalogProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="roles" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
              <Stack.Screen name="provider-catalog" />
            </Stack>
          </CatalogProvider>
        </CartProvider>
      </FavoritesProvider>
    </RoleProvider>
  );
}

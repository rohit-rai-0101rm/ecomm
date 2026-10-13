import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartScreen } from '../screens/Cart';
import { LoginScreen } from '../screens/Login';
import { ProductDetailsScreen } from '../screens/ProductDetails';
import { ProductListScreen } from '../screens/ProductList';
import { SplashScreen } from '../screens/Splash';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
